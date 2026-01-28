import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import jsPDF from 'jspdf'

export default function ExportButtons({ summary, disabled }) {
  const exportCSV = () => {
    if (!summary?.sdgs?.length) return
    
    const headers = ['SDG ID', 'Code', 'Title', 'Projects', 'Publications', 'Impact Score']
    const rows = summary.sdgs.map(sdg => [
      sdg.id,
      sdg.code,
      sdg.title,
      sdg.projectCount || 0,
      sdg.publicationCount || 0,
      sdg.impactScore || 'N/A'
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'sdg_report.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportPDF = () => {
    if (!summary?.sdgs?.length) return;
    const doc = new jsPDF();
    let y = 20;

    // 1. Overview
    doc.setFontSize(18);
    doc.text('SDG Impact Report', 14, y);
    y += 10;
    doc.setFontSize(12);
    doc.text('Daystar University', 14, y);
    y += 8;
    doc.setFontSize(10);
    doc.text('This report provides a clear summary of Daystar University’s impact on the United Nations Sustainable Development Goals (SDGs).', 14, y);
    y += 6;
    doc.text('It covers SDG-related projects and publications, highlighting areas of strength and opportunities for growth.', 14, y);
    y += 8;
    doc.setFont(undefined, 'bold');
    doc.text('What SDG Impact Means:', 14, y);
    doc.setFont(undefined, 'normal');
    y += 6;
    doc.text('SDG impact refers to the measurable contributions made by the university’s research, projects, and publications', 14, y);
    y += 5;
    doc.text('toward advancing the 17 SDGs.', 14, y);
    y += 10;

    // 2. Project & Publication Overview
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Project & Publication Overview', 14, y);
    doc.setFont(undefined, 'normal');
    y += 7;
    // Table
    const totalProjects = summary.totals?.projects || 0;
    const totalPublications = summary.totals?.publications || 0;
    doc.autoTable({
      startY: y,
      head: [['Metric', 'Count']],
      body: [
        ['SDG-related Projects', totalProjects],
        ['SDG-related Publications', totalPublications],
      ],
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 4;
    doc.setFontSize(10);
    doc.text('- These figures represent the university’s engagement with the SDGs.', 14, y);
    y += 5;
    doc.text('- Higher numbers indicate strong institutional commitment and research output.', 14, y);
    y += 8;

    // 3. SDG Coverage Analysis
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('SDG Coverage Analysis', 14, y);
    doc.setFont(undefined, 'normal');
    y += 7;
    // Find highest/lowest
    const maxProjects = Math.max(...summary.sdgs.map(sdg => sdg.projectCount || 0));
    const minProjects = Math.min(...summary.sdgs.map(sdg => sdg.projectCount || 0));
    const maxPubs = Math.max(...summary.sdgs.map(sdg => sdg.publicationCount || 0));
    const minPubs = Math.min(...summary.sdgs.map(sdg => sdg.publicationCount || 0));
    const topProjectSDGs = summary.sdgs.filter(sdg => (sdg.projectCount || 0) === maxProjects);
    const lowProjectSDGs = summary.sdgs.filter(sdg => (sdg.projectCount || 0) === minProjects);
    const topPubSDGs = summary.sdgs.filter(sdg => (sdg.publicationCount || 0) === maxPubs);
    const lowPubSDGs = summary.sdgs.filter(sdg => (sdg.publicationCount || 0) === minPubs);
    doc.setFontSize(10);
    doc.text(`- SDGs with the Highest Projects: ${topProjectSDGs.map(sdg => sdg.title + ' (' + (sdg.projectCount || 0) + ')').join(', ')}`, 14, y);
    y += 5;
    doc.text(`- SDGs with the Highest Publications: ${topPubSDGs.map(sdg => sdg.title + ' (' + (sdg.publicationCount || 0) + ')').join(', ')}`, 14, y);
    y += 5;
    doc.text(`- SDGs with the Lowest Projects: ${lowProjectSDGs.map(sdg => sdg.title + ' (' + (sdg.projectCount || 0) + ')').join(', ')}`, 14, y);
    y += 5;
    doc.text(`- SDGs with the Lowest Publications: ${lowPubSDGs.map(sdg => sdg.title + ' (' + (sdg.publicationCount || 0) + ')').join(', ')}`, 14, y);
    y += 8;
    doc.text('Possible reasons for these patterns may include institutional priorities, available expertise, or resource allocation.', 14, y);
    y += 10;

    // 4. SDG Performance Distribution
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('SDG Performance Distribution', 14, y);
    doc.setFont(undefined, 'normal');
    y += 7;
    // Table of all SDGs
    doc.autoTable({
      startY: y,
      head: [['SDG', 'Projects', 'Publications']],
      body: summary.sdgs.map(sdg => [sdg.title, sdg.projectCount || 0, sdg.publicationCount || 0]),
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 4;

    // Highlight strong/moderate/underrepresented
    // Sort SDGs by project+publication count
    const sorted = [...summary.sdgs].sort((a, b) => ((b.projectCount || 0) + (b.publicationCount || 0)) - ((a.projectCount || 0) + (a.publicationCount || 0)));
    const strong = sorted.slice(0, 3).map(sdg => sdg.title);
    const moderate = sorted.slice(3, 10).map(sdg => sdg.title);
    const under = sorted.slice(-3).map(sdg => sdg.title);
    doc.setFontSize(10);
    doc.text(`- Strongly performing SDGs: ${strong.join(', ')}`, 14, y);
    y += 5;
    doc.text(`- Moderately performing SDGs: ${moderate.join(', ')}`, 14, y);
    y += 5;
    doc.text(`- Underrepresented SDGs: ${under.join(', ')}`, 14, y);
    y += 8;
    doc.text('These patterns can inform future planning and resource allocation.', 14, y);

    doc.save('sdg_impact_report.pdf');
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={exportCSV}
        disabled={disabled}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FileSpreadsheet className="w-4 h-4" />
        Export CSV
      </button>
      <button
        onClick={exportPDF}
        disabled={disabled}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FileText className="w-4 h-4" />
        Export PDF
      </button>
    </div>
  )
}
