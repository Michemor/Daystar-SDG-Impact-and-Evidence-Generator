import os
import requests
from oaiharvester.harvester import OAIHarvester
from oaiharvester.record import OAIRecord
from datetime import datetime
from django.conf import settings
from django.db import transaction
from impact_tracker.models import Activity, User  # Assuming User model is available
import logging

logger = logging.getLogger(__name__)

class DaystarOAIHarvester:
    """
    Harvester for Daystar University Research Repository using OAI-PMH.
    """
    BASE_URL = "https://repository.daystar.ac.ke/oai/request"
    METADATA_PREFIX = "oai_dc"

    def __init__(self):
        self.harvester = OAIHarvester(self.BASE_URL, self.METADATA_PREFIX)
        # Assuming a default user for scraped activities if lead_author is required
        # You might want to create a dedicated 'scraper' user in Django admin
        # Or handle this in a more robust way, e.g., allow null for lead_author on scraped items
        try:
            self.default_lead_author = User.objects.get(username=os.getenv("DEFAULT_SCRAPER_USERNAME", "admin"))
        except User.DoesNotExist:
            logger.warning("Default scraper user not found. Scraped activities will have lead_author set to None.")
            self.default_lead_author = None
        except Exception as e:
            logger.error(f"Error getting default scraper user: {e}")
            self.default_lead_author = None

    def _extract_dc_field(self, record: OAIRecord, field_name: str, default=None):
        """Helper to extract a Dublin Core field, handling multiple values."""
        # Dublin Core fields are often lists, even if single valued
        values = record.metadata.get("oai_dc:dc", {}).get(field_name, [])
        if values:
            if isinstance(values, list):
                return values[0] if len(values) == 1 else "; ".join(values)
            return values
        return default

    def _parse_record_to_activity_data(self, record: OAIRecord) -> dict:
        """
        Parses an OAI record and converts it into a dictionary suitable for
        creating an Activity instance.
        """
        data = {}
        # Extract title
        data['title'] = self._extract_dc_field(record, "dc:title", "No Title Provided")

        # Extract description/abstract
        data['description'] = self._extract_dc_field(record, "dc:description", "No Description Provided")

        # Extract authors
        creators = self._extract_dc_field(record, "dc:creator")
        if creators and isinstance(creators, list):
            data['authors'] = "; ".join(creators)
        elif creators:
            data['authors'] = creators
        else:
            data['authors'] = "Anonymous"

        # Extract original publication date
        date_str = self._extract_dc_field(record, "dc:date")
        if date_str:
            try:
                # Try parsing common date formats. OAI-PMH often uses YYYY-MM-DD or YYYY
                if len(date_str) == 4: # Only year
                    data['original_publication_date'] = datetime.strptime(date_str, "%Y").date()
                else:
                    data['original_publication_date'] = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                logger.warning(f"Could not parse date '{date_str}' for record {record.identifier}")
                data['original_publication_date'] = None
        else:
            data['original_publication_date'] = None

        # Extract external URL (from dc:identifier, usually contains handle or URL)
        identifiers = self._extract_dc_field(record, "dc:identifier")
        if identifiers:
            # Look for a URL among identifiers
            if isinstance(identifiers, list):
                for ident in identifiers:
                    if ident.startswith("http"):
                        data['external_url'] = ident
                        break
                else: # No URL found, take the first identifier
                    data['external_url'] = identifiers[0]
            elif identifiers.startswith("http"):
                data['external_url'] = identifiers
            else:
                data['external_url'] = identifiers # Could be a handle like "123456789/123"
        else:
            data['external_url'] = None

        # Determine activity type
        types = self._extract_dc_field(record, "dc:type")
        if types and isinstance(types, list):
            # Prioritize 'publication' or 'research', default to 'publication' if unknown
            type_str = types[0].lower() # Take first type
            if "thesis" in type_str or "dissertation" in type_str:
                data['activity_type'] = 'research' # Or 'publication'
            elif "article" in type_str or "journal" in type_str or "publication" in type_str:
                data['activity_type'] = 'publication'
            elif "report" in type_str:
                data['activity_type'] = 'publication' # or research/project
            else:
                data['activity_type'] = 'publication' # Default to publication for scraped
        else:
            data['activity_type'] = 'publication' # Default if no type specified

        data['is_scraped'] = True
        data['lead_author'] = self.default_lead_author
        data['ai_classified'] = False # Will be classified by our system later

        return data

    def harvest_records(self, start_date: datetime = None, end_date: datetime = None):
        """
        Harvests records from the OAI-PMH repository.
        :param start_date: Harvest records from this date (inclusive).
        :param end_date: Harvest records up to this date (inclusive).
        """
        logger.info(f"Starting OAI harvest from {self.BASE_URL} for metadata prefix {self.METADATA_PREFIX}")
        logger.info(f"Date range: {start_date.isoformat() if start_date else 'earliest'} to {end_date.isoformat() if end_date else 'latest'}")

        count = 0
        new_records_count = 0
        updated_records_count = 0
        try:
            records_iterator = self.harvester.list_records(
                from_=start_date.isoformat() if start_date else None,
                until=end_date.isoformat() if end_date else None
            )

            for record in records_iterator:
                count += 1
                try:
                    # Use the OAI identifier to check for existing records
                    oai_id = record.identifier
                    activity_data = self._parse_record_to_activity_data(record)

                    # Check if an activity with this external_url (OAI ID could be used as a unique external ID)
                    # or title/date already exists to prevent duplicates.
                    # For DSpace, the handle or item URL is a better unique identifier.
                    # Assuming dc:identifier often contains the item URL/handle
                    external_identifier = activity_data.get('external_url') or oai_id

                    with transaction.atomic():
                        activity, created = Activity.objects.update_or_create(
                            external_url=external_identifier, # Use external_url for uniqueness check
                            defaults=activity_data
                        )
                        if created:
                            new_records_count += 1
                            logger.info(f"Created new activity: {activity.title}")
                        else:
                            updated_records_count += 1
                            logger.info(f"Updated existing activity: {activity.title}")

                except Exception as e:
                    logger.error(f"Error processing record {record.identifier}: {e}")
                    # Optionally log the full record for debugging
                    # logger.debug(f"Failed record content: {record.metadata}")

        except requests.exceptions.RequestException as e:
            logger.error(f"Network error during OAI harvest: {e}")
            raise
        except Exception as e:
            logger.error(f"An unexpected error occurred during OAI harvest: {e}")
            raise

        logger.info(f"OAI harvest completed. Total records processed: {count}, New: {new_records_count}, Updated: {updated_records_count}")
        return {
            "total_processed": count,
            "new_activities": new_records_count,
            "updated_activities": updated_records_count
        }

if __name__ == "__main__":
    # This block is for testing the harvester independently.
    # It requires Django settings to be configured.
    # For actual use, this will be called from a management command or API view.
    import django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "daystar_sdg.settings")
    django.setup()
    harvester = DaystarOAIHarvester()
    # Example: Harvest all records (can be very large!)
    # harvester.harvest_records()

    # Example: Harvest records from a specific date
    # from datetime import date
    # harvest_start_date = datetime(2023, 1, 1)
    # harvester.harvest_records(start_date=harvest_start_date)
    print("OAI Harvester module initialized. Run `harvest_records` method to start harvesting.")