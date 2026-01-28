# Deploying Daystar SDG Backend to Render

This guide will walk you through deploying your Django backend to Render using the configuration files we've created.

## 1. Prerequisites

- You have a [Render account](https://render.com/).
- Your code is pushed to a GitHub repository.

## 2. Configuration Files

We have added the following files to your project:

- **`render.yaml`**: This is a Blueprint that tells Render how to build and run your app. It defines:
  - A **Web Service** for your Django app.
  - A **PostgreSQL Database** (Recommended over SQLite).
- **`build.sh`**: A script that runs during deployment to install dependencies, collect static files, and migrate the database.
- **`requirements.txt`**: Updated to include `gunicorn`, the production web server.

## 3. Deployment Steps

1.  **Dashboard**: Go to your [Render Dashboard](https://dashboard.render.com/).
2.  **New Blueprint**: Click **New +** and select **Blueprint**.
3.  **Connect Repo**: Connect the GitHub repository containing your backend code.
4.  **Service Name**: Give your blueprint a name (e.g., `daystar-sdg`).
5.  **Apply**: Click **Apply**. Render will automatically detect the `render.yaml` file.
6.  **Review**: You will see the resources being created (Web Service & Database). Click **Create New Resources**.

## 4. SQLite vs. PostgreSQL

> [!WARNING]
> **Why not SQLite?**
> Render web services run on ephemeral instances. This means every time you deploy or the service restarts, the filesystem is wiped clean. If you use SQLite, **you will lose all your data** (users, potential impact data, etc.) on every restart.

We have configured `render.yaml` to provision a **PostgreSQL** database for you. This is a persistent database service that will keep your data safe even when the web service restarts.

## 5. Environment Variables

The `render.yaml` automatically sets up:
- `DATABASE_URL`: Links your app to the new Postgres DB.
- `SECRET_KEY`: Generates a secure key.
- `DEBUG`: Sets to `False` for production.

## 6. Verifying Deployment

Once the deployment is marked as **Live** in the Render dashboard:
1.  Copy the URL of your new web service (e.g., `https://daystar-sdg-backend.onrender.com`).
2.  Test the API endpoints (e.g., `/api/`).

## Troubleshooting

- **Build Failed**: Check the Logs tab for errors. Common issues are missing dependencies in `requirements.txt`.
- **Database Connection Error**: Ensure the `DATABASE_URL` is correctly being read in `settings.py` (we verified this code exists).
