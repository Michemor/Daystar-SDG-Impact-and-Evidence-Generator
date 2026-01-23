// ============================================
// CENTRALIZED MOCK DATA FILE
// All mock data for the SDG Impact Dashboard
// Used as fallback when API endpoints return no data
// ============================================

// ============================================
// SDG GOALS DATA
// ============================================
export const sdgsData = [
    { id: 1, code: 'SDG 1', title: 'No Poverty', color: '#E5243B', description: 'End poverty in all its forms everywhere' },
    { id: 2, code: 'SDG 2', title: 'Zero Hunger', color: '#DDA63A', description: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture' },
    { id: 3, code: 'SDG 3', title: 'Good Health and Well-being', color: '#4C9F38', description: 'Ensure healthy lives and promote well-being for all at all ages' },
    { id: 4, code: 'SDG 4', title: 'Quality Education', color: '#C5192D', description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all' },
    { id: 5, code: 'SDG 5', title: 'Gender Equality', color: '#FF3A21', description: 'Achieve gender equality and empower all women and girls' },
    { id: 6, code: 'SDG 6', title: 'Clean Water and Sanitation', color: '#26BDE2', description: 'Ensure availability and sustainable management of water and sanitation for all' },
    { id: 7, code: 'SDG 7', title: 'Affordable and Clean Energy', color: '#FCC30B', description: 'Ensure access to affordable, reliable, sustainable and modern energy for all' },
    { id: 8, code: 'SDG 8', title: 'Decent Work and Economic Growth', color: '#A21942', description: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all' },
    { id: 9, code: 'SDG 9', title: 'Industry, Innovation and Infrastructure', color: '#FD6925', description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation' },
    { id: 10, code: 'SDG 10', title: 'Reduced Inequalities', color: '#DD1367', description: 'Reduce inequality within and among countries' },
    { id: 11, code: 'SDG 11', title: 'Sustainable Cities and Communities', color: '#FD9D24', description: 'Make cities and human settlements inclusive, safe, resilient and sustainable' },
    { id: 12, code: 'SDG 12', title: 'Responsible Consumption and Production', color: '#BF8B2E', description: 'Ensure sustainable consumption and production patterns' },
    { id: 13, code: 'SDG 13', title: 'Climate Action', color: '#3F7E44', description: 'Take urgent action to combat climate change and its impacts' },
    { id: 14, code: 'SDG 14', title: 'Life Below Water', color: '#0A97D9', description: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development' },
    { id: 15, code: 'SDG 15', title: 'Life on Land', color: '#56C02B', description: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification' },
    { id: 16, code: 'SDG 16', title: 'Peace, Justice and Strong Institutions', color: '#00689D', description: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all' },
    { id: 17, code: 'SDG 17', title: 'Partnerships for the Goals', color: '#19486A', description: 'Strengthen the means of implementation and revitalize the global partnership for sustainable development' },
]

// ============================================
// DEPARTMENTS DATA
// ============================================
export const departmentsData = [
    { id: 'dept-1', name: 'School of Business and Economics' },
    { id: 'dept-2', name: 'School of Applied Human Sciences' },
    { id: 'dept-3', name: 'School of Science, Engineering and Health' },
    { id: 'dept-4', name: 'School of Communication, Language and Performing Arts' },
    { id: 'dept-5', name: 'Education' },
    { id: 'dept-6', name: 'Public Health' },
    { id: 'dept-7', name: 'Engineering' },
    { id: 'dept-8', name: 'Civic Engagement' },
    { id: 'dept-9', name: 'External Relations' },
    { id: 'dept-10', name: 'Sustainability' },
    { id: 'dept-11', name: 'IT & Innovation' },
    { id: 'dept-12', name: 'Urban Development' },
    { id: 'dept-13', name: 'Agriculture' },
]

// ============================================
// RESEARCHERS DATA
// ============================================
export const researchersData = [
    { id: 'res-1', name: 'Dr. Amina Owino', departmentId: 'dept-1' },
    { id: 'res-2', name: 'Prof. Daniel Mwangi', departmentId: 'dept-3' },
    { id: 'res-3', name: 'Dr. Faith Wambui', departmentId: 'dept-2' },
    { id: 'res-4', name: 'Dr. John Muriuki', departmentId: 'dept-3' },
    { id: 'res-5', name: 'Prof. Sheila Njeri', departmentId: 'dept-4' },
    { id: 'res-6', name: 'Dr. Grace Kimani', departmentId: 'dept-6' },
    { id: 'res-7', name: 'Prof. James Ochieng', departmentId: 'dept-7' },
    { id: 'res-8', name: 'Dr. Mary Wanjiku', departmentId: 'dept-5' },
]

// ============================================
// PROJECTS DATA
// ============================================
export const projectsData = [
    {
        id: 'P-001',
        project: 'Community Literacy Program',
        title: 'Community Literacy Program',
        type: 'Community',
        activity_type: 'project',
        status: 'Active',
        sdgs: [4, 10],
        date: '2025-09-12',
        department: 'Education',
        departmentId: 'dept-5',
        impact: 68,
        description: 'A community-based literacy program targeting underserved populations.',
        researcherIds: ['res-8'],
    },
    {
        id: 'P-002',
        project: 'Maternal Health Outreach',
        title: 'Maternal Health Outreach',
        type: 'Health',
        activity_type: 'project',
        status: 'Active',
        sdgs: [3, 5],
        date: '2025-07-01',
        department: 'Public Health',
        departmentId: 'dept-6',
        impact: 54,
        description: 'Outreach program improving maternal health outcomes in rural areas.',
        researcherIds: ['res-6'],
    },
    {
        id: 'P-003',
        project: 'Green Tech Incubator',
        title: 'Green Tech Incubator',
        type: 'Innovation',
        activity_type: 'project',
        status: 'Planned',
        sdgs: [7, 9, 12],
        date: '2026-02-15',
        department: 'Engineering',
        departmentId: 'dept-7',
        impact: 12,
        description: 'Incubator for green technology startups focusing on sustainable solutions.',
        researcherIds: ['res-7', 'res-2'],
    },
    {
        id: 'P-004',
        project: 'Justice Awareness Campaign',
        title: 'Justice Awareness Campaign',
        type: 'Advocacy',
        activity_type: 'project',
        status: 'Completed',
        sdgs: [16],
        date: '2025-03-10',
        department: 'Civic Engagement',
        departmentId: 'dept-8',
        impact: 100,
        description: 'Campaign raising awareness about justice and legal rights.',
        researcherIds: ['res-3'],
    },
    {
        id: 'P-005',
        project: 'Partnership Network Expansion',
        title: 'Partnership Network Expansion',
        type: 'Partnership',
        activity_type: 'project',
        status: 'Active',
        sdgs: [17, 8],
        date: '2025-11-05',
        department: 'External Relations',
        departmentId: 'dept-9',
        impact: 35,
        description: 'Expanding partnerships with international organizations for SDG collaboration.',
        researcherIds: ['res-1'],
    },
    {
        id: 'P-006',
        project: 'Rural Water Access',
        title: 'Rural Water Access',
        type: 'Infrastructure',
        activity_type: 'project',
        status: 'Active',
        sdgs: [6, 11],
        date: '2025-04-22',
        department: 'Sustainability',
        departmentId: 'dept-10',
        impact: 72,
        description: 'Project providing clean water access to rural communities.',
        researcherIds: ['res-4'],
    },
    {
        id: 'P-007',
        project: 'Youth Skills Bootcamp',
        title: 'Youth Skills Bootcamp',
        type: 'Training',
        activity_type: 'project',
        status: 'Active',
        sdgs: [4, 8],
        date: '2025-05-14',
        department: 'Education',
        departmentId: 'dept-5',
        impact: 59,
        description: 'Skills training bootcamp for youth employment readiness.',
        researcherIds: ['res-8', 'res-5'],
    },
    {
        id: 'P-008',
        project: 'Waste-to-Energy Pilot',
        title: 'Waste-to-Energy Pilot',
        type: 'Pilot',
        activity_type: 'project',
        status: 'Planned',
        sdgs: [7, 12, 13],
        date: '2026-01-30',
        department: 'Engineering',
        departmentId: 'dept-7',
        impact: 20,
        description: 'Pilot program converting waste to renewable energy.',
        researcherIds: ['res-7'],
    },
    {
        id: 'P-009',
        project: 'Affordable Housing Initiative',
        title: 'Affordable Housing Initiative',
        type: 'Infrastructure',
        activity_type: 'project',
        status: 'Active',
        sdgs: [1, 11],
        date: '2025-08-18',
        department: 'Urban Development',
        departmentId: 'dept-12',
        impact: 47,
        description: 'Initiative providing affordable housing solutions.',
        researcherIds: ['res-2'],
    },
    {
        id: 'P-010',
        project: 'Climate Resilience Program',
        title: 'Climate Resilience Program',
        type: 'Environment',
        activity_type: 'project',
        status: 'Active',
        sdgs: [13, 15],
        date: '2025-06-09',
        department: 'Sustainability',
        departmentId: 'dept-10',
        impact: 63,
        description: 'Program building climate resilience in vulnerable communities.',
        researcherIds: ['res-4', 'res-6'],
    },
    {
        id: 'P-011',
        project: 'Digital Inclusion Labs',
        title: 'Digital Inclusion Labs',
        type: 'Innovation',
        activity_type: 'project',
        status: 'Active',
        sdgs: [9, 10],
        date: '2025-10-21',
        department: 'IT & Innovation',
        departmentId: 'dept-11',
        impact: 41,
        description: 'Labs promoting digital inclusion and tech literacy.',
        researcherIds: ['res-5'],
    },
    {
        id: 'P-012',
        project: 'Food Security Gardens',
        title: 'Food Security Gardens',
        type: 'Agriculture',
        activity_type: 'project',
        status: 'Completed',
        sdgs: [2, 12],
        date: '2025-01-28',
        department: 'Agriculture',
        departmentId: 'dept-13',
        impact: 95,
        description: 'Community gardens improving food security.',
        researcherIds: ['res-3', 'res-1'],
    },
]

// ============================================
// PUBLICATIONS DATA
// ============================================
export const publicationsData = [
    {
        id: 'PUB-001',
        project: 'Assessing Literacy Interventions',
        title: 'Assessing Literacy Interventions',
        type: 'Journal Article',
        activity_type: 'publication',
        status: 'Published',
        sdgs: [4],
        date: '2025-05-01',
        department: 'Education',
        departmentId: 'dept-5',
        impact: 78,
        description: 'Research article assessing the effectiveness of literacy interventions.',
        researcherIds: ['res-8'],
    },
    {
        id: 'PUB-002',
        project: 'Maternal Health Outcomes 2025',
        title: 'Maternal Health Outcomes 2025',
        type: 'Report',
        activity_type: 'publication',
        status: 'Published',
        sdgs: [3, 5],
        date: '2025-09-20',
        department: 'Public Health',
        departmentId: 'dept-6',
        impact: 66,
        description: 'Comprehensive report on maternal health outcomes.',
        researcherIds: ['res-6'],
    },
    {
        id: 'PUB-003',
        project: 'Green Incubation Models',
        title: 'Green Incubation Models',
        type: 'Conference Paper',
        activity_type: 'publication',
        status: 'In Review',
        sdgs: [7, 9, 12],
        date: '2026-01-10',
        department: 'Engineering',
        departmentId: 'dept-7',
        impact: 45,
        description: 'Paper on green incubation models for sustainable startups.',
        researcherIds: ['res-7', 'res-2'],
    },
    {
        id: 'PUB-004',
        project: 'Justice Systems and SDG 16',
        title: 'Justice Systems and SDG 16',
        type: 'Journal Article',
        activity_type: 'publication',
        status: 'Published',
        sdgs: [16],
        date: '2025-03-29',
        department: 'Civic Engagement',
        departmentId: 'dept-8',
        impact: 84,
        description: 'Analysis of justice systems in relation to SDG 16.',
        researcherIds: ['res-3'],
    },
    {
        id: 'PUB-005',
        project: 'Public-Private Partnerships for SDGs',
        title: 'Public-Private Partnerships for SDGs',
        type: 'Whitepaper',
        activity_type: 'publication',
        status: 'Draft',
        sdgs: [17],
        date: '2026-02-01',
        department: 'External Relations',
        departmentId: 'dept-9',
        impact: 20,
        description: 'Whitepaper on public-private partnerships for SDG implementation.',
        researcherIds: ['res-1'],
    },
    {
        id: 'PUB-006',
        project: 'Water Access and Health',
        title: 'Water Access and Health',
        type: 'Journal Article',
        activity_type: 'publication',
        status: 'Published',
        sdgs: [3, 6],
        date: '2025-11-11',
        department: 'Sustainability',
        departmentId: 'dept-10',
        impact: 71,
        description: 'Study on the relationship between water access and health outcomes.',
        researcherIds: ['res-4', 'res-6'],
    },
    {
        id: 'PUB-007',
        project: 'Skills Programs Impact',
        title: 'Skills Programs Impact',
        type: 'Report',
        activity_type: 'publication',
        status: 'Published',
        sdgs: [4, 8],
        date: '2025-08-03',
        department: 'Education',
        departmentId: 'dept-5',
        impact: 58,
        description: 'Impact assessment of skills development programs.',
        researcherIds: ['res-8', 'res-5'],
    },
    {
        id: 'PUB-008',
        project: 'Urban Housing Affordability',
        title: 'Urban Housing Affordability',
        type: 'Book Chapter',
        activity_type: 'publication',
        status: 'In Review',
        sdgs: [1, 11],
        date: '2026-01-05',
        department: 'Urban Development',
        departmentId: 'dept-12',
        impact: 36,
        description: 'Book chapter on urban housing affordability challenges.',
        researcherIds: ['res-2'],
    },
]

// ============================================
// DASHBOARD STATISTICS
// ============================================
export const getDashboardStats = () => ({
    totalProjects: projectsData.length,
    totalPublications: publicationsData.length,
    activeProjects: projectsData.filter(p => p.status === 'Active').length,
    completedProjects: projectsData.filter(p => p.status === 'Completed').length,
    plannedProjects: projectsData.filter(p => p.status === 'Planned').length,
    impactScore: 85,
    communityReach: 1575,
    sdgsCovered: new Set([...projectsData, ...publicationsData].flatMap(item => item.sdgs)).size,
    departmentsCount: new Set([...projectsData, ...publicationsData].map(item => item.department)).size,
})

// ============================================
// PROJECT GROWTH DATA (for charts)
// ============================================
export const projectGrowthData = [
    { year: '2015', projects: 30 },
    { year: '2016', projects: 45 },
    { year: '2017', projects: 28 },
    { year: '2018', projects: 60 },
    { year: '2019', projects: 75 },
    { year: '2020', projects: 50 },
    { year: '2021', projects: 90 },
    { year: '2022', projects: 100 },
    { year: '2023', projects: 120 },
    { year: '2024', projects: 140 },
    { year: '2025', projects: 160 },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

const clone = (value) => JSON.parse(JSON.stringify(value))

// Get SDG by ID
export const getSDGById = (id) => {
    return sdgsData.find(sdg => sdg.id === Number(id)) || null
}

// Calculate SDG distribution from all activities
export const getSDGDistribution = () => {
    const counts = Array(17).fill(0)
    const allActivities = [...projectsData, ...publicationsData]

    allActivities.forEach(activity => {
        activity.sdgs.forEach(sdgId => {
            if (sdgId >= 1 && sdgId <= 17) {
                counts[sdgId - 1]++
            }
        })
    })

    return sdgsData.map((sdg, index) => ({
        ...sdg,
        count: counts[index],
        projectCount: projectsData.filter(p => p.sdgs.includes(sdg.id)).length,
        publicationCount: publicationsData.filter(p => p.sdgs.includes(sdg.id)).length,
    }))
}

// Get metadata for forms
export const getMockMetadata = () => ({
    sdgs: clone(sdgsData),
    departments: clone(departmentsData),
    researchers: clone(researchersData),
})

// Get dashboard summary
export const getMockSummary = () => {
    const sdgSummaries = sdgsData.map((sdg) => {
        const linkedProjects = projectsData.filter(p => p.sdgs.includes(sdg.id))
        const linkedPublications = publicationsData.filter(p => p.sdgs.includes(sdg.id))
        const departmentsSet = new Set([...linkedProjects, ...linkedPublications].map(item => item.departmentId))
        const researchersSet = new Set([...linkedProjects, ...linkedPublications].flatMap(item => item.researcherIds || []))

        return {
            id: sdg.id,
            code: sdg.code,
            title: sdg.title,
            color: sdg.color,
            projectCount: linkedProjects.length,
            publicationCount: linkedPublications.length,
            departmentCount: departmentsSet.size,
            researcherCount: researchersSet.size,
        }
    })

    return {
        generatedAt: new Date().toISOString(),
        sdgs: sdgSummaries.filter(s => s.projectCount + s.publicationCount > 0),
        totals: getDashboardStats(),
    }
}

// Get SDG detail with linked projects and publications
export const getMockSdgDetail = (sdgId) => {
    const numericId = Number(sdgId)
    const sdg = sdgsData.find(s => s.id === numericId)
    if (!sdg) return null

    const linkedProjects = projectsData.filter(p => p.sdgs.includes(numericId))
    const linkedPublications = publicationsData.filter(p => p.sdgs.includes(numericId))
    const departmentsSet = new Map()
    const researchersSet = new Map()

        ;[...linkedProjects, ...linkedPublications].forEach(item => {
            const dept = departmentsData.find(d => d.id === item.departmentId)
            if (dept) departmentsSet.set(dept.id, dept)

                ; (item.researcherIds || []).forEach(resId => {
                    const researcher = researchersData.find(r => r.id === resId)
                    if (researcher) researchersSet.set(researcher.id, researcher)
                })
        })

    return {
        sdg: clone(sdg),
        stats: {
            projects: linkedProjects.length,
            publications: linkedPublications.length,
            departments: departmentsSet.size,
            researchers: researchersSet.size,
        },
        projects: clone(linkedProjects),
        publications: clone(linkedPublications),
        departments: Array.from(departmentsSet.values()),
        researchers: Array.from(researchersSet.values()),
    }
}

// Get record detail by ID
export const getMockRecordDetail = (recordId) => {
    const allRecords = [...projectsData, ...publicationsData]
    const record = allRecords.find(item => item.id === recordId)
    if (!record) return null

    const department = departmentsData.find(d => d.id === record.departmentId)
    const researchers = (record.researcherIds || [])
        .map(id => researchersData.find(r => r.id === id))
        .filter(Boolean)
    const sdgs = record.sdgs.map(id => sdgsData.find(s => s.id === id)).filter(Boolean)

    return {
        ...clone(record),
        department: department ? clone(department) : null,
        researchers: clone(researchers),
        sdgsDetails: clone(sdgs),
    }
}

// Add a new record (for forms)
let tempRecords = []
export const addMockRecord = (payload) => {
    const newRecord = {
        ...payload,
        id: `mock-${Date.now()}`,
        sdgs: payload.sdgIds ? payload.sdgIds.map(Number) : payload.sdgs || [],
        date: new Date().toISOString().split('T')[0],
        impact: Math.floor(Math.random() * 50) + 30,
    }
    tempRecords.push(newRecord)
    return getMockRecordDetail(newRecord.id) || newRecord
}

// Get all activities (projects + publications)
export const getAllActivities = () => {
    return [...projectsData, ...publicationsData]
}

// Get recent projects
export const getRecentProjects = (limit = 5) => {
    return [...projectsData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit)
}

// Get recent publications
export const getRecentPublications = (limit = 5) => {
    return [...publicationsData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit)
}
