// Admin Panel Logic

document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
    
    // Form Submit Handler
    document.getElementById('jobForm').addEventListener('submit', handleJobSubmit);
});

// Fetch all jobs from API
async function fetchJobs() {
    const tbody = document.getElementById('adminJobsList');
    tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">Loading...</td></tr>';

    try {
        const response = await fetch('/api/jobs');
        const jobs = await response.json();
        
        document.getElementById('totalJobsCount').textContent = jobs.length;
        renderJobsTable(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-red-500">Error loading jobs. Please try again.</td></tr>';
    }
}

// Render Table Rows
function renderJobsTable(jobs) {
    const tbody = document.getElementById('adminJobsList');
    tbody.innerHTML = '';

    if (jobs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">No jobs found. Add one to get started!</td></tr>';
        return;
    }

    jobs.forEach(job => {
        // Handle JSON fields safely
        const title = (typeof job.title === 'string' ? JSON.parse(job.title) : job.title) || {};
        const displayTitle = title.en || title.tr || 'Untitled';
        const date = new Date(job.date).toLocaleDateString();

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50 transition-colors border-b border-gray-100';
        tr.innerHTML = `
            <td class="px-6 py-4 font-mono text-sm text-gray-500">#${job.id}</td>
            <td class="px-6 py-4 font-medium text-gray-900">${displayTitle}</td>
            <td class="px-6 py-4 text-gray-600">${job.company}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ${job.sector}
                </span>
            </td>
            <td class="px-6 py-4 text-gray-600 capitalize">${job.city}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">${date}</td>
            <td class="px-6 py-4 text-right space-x-2">
                <button onclick='openEditModal(${JSON.stringify(job).replace(/'/g, "&#39;")})' class="text-indigo-600 hover:text-indigo-900 font-medium text-sm">Edit</button>
                <button onclick="deleteJob(${job.id})" class="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Open Modal for Create
function openJobModal() {
    document.getElementById('modalTitle').textContent = 'Add New Job';
    document.getElementById('jobForm').reset();
    document.getElementById('jobId').value = '';
    document.getElementById('jobModal').classList.remove('hidden');
    document.getElementById('jobModal').classList.add('flex');
}

// Open Modal for Edit
function openEditModal(job) {
    document.getElementById('modalTitle').textContent = 'Edit Job';
    document.getElementById('jobId').value = job.id;

    // Parse JSON fields
    const title = typeof job.title === 'string' ? JSON.parse(job.title) : job.title;
    const desc = typeof job.description === 'string' ? JSON.parse(job.description) : job.description;
    const reqs = typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements;

    // Fill Form
    document.getElementById('titleEn').value = title.en || '';
    document.getElementById('titleTr').value = title.tr || '';
    document.getElementById('company').value = job.company;
    document.getElementById('sector').value = job.sector;
    document.getElementById('city').value = job.city;
    document.getElementById('descEn').value = desc.en || '';
    document.getElementById('descTr').value = desc.tr || '';
    document.getElementById('featured').checked = !!job.featured;
    
    // Join requirements array to comma string
    const reqArray = reqs.en || reqs.tr || [];
    document.getElementById('requirements').value = Array.isArray(reqArray) ? reqArray.join(', ') : '';

    document.getElementById('jobModal').classList.remove('hidden');
    document.getElementById('jobModal').classList.add('flex');
}

// Close Modal
function closeJobModal() {
    document.getElementById('jobModal').classList.add('hidden');
    document.getElementById('jobModal').classList.remove('flex');
}

// Handle Submit (Create or Update)
async function handleJobSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('jobId').value;
    const isEdit = !!id;
    
    // Construct Data Object matching DB Schema
    const jobData = {
        title: {
            en: document.getElementById('titleEn').value,
            tr: document.getElementById('titleTr').value
        },
        company: document.getElementById('company').value,
        sector: document.getElementById('sector').value,
        city: document.getElementById('city').value,
        description: {
            en: document.getElementById('descEn').value,
            tr: document.getElementById('descTr').value
        },
        requirements: {
            en: document.getElementById('requirements').value.split(',').map(s => s.trim()).filter(s => s)
        },
        featured: document.getElementById('featured').checked
    };

    const url = isEdit ? `/api/jobs/${id}` : '/api/jobs';
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });

        if (response.ok) {
            closeJobModal();
            fetchJobs(); // Refresh table
            alert(isEdit ? 'Job updated successfully!' : 'Job created successfully!');
        } else {
            const err = await response.json();
            alert('Error: ' + (err.error || 'Failed to save job'));
        }
    } catch (error) {
        console.error('Error saving job:', error);
        alert('Network error occurred.');
    }
}

// Handle Delete
async function deleteJob(id) {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) return;

    try {
        const response = await fetch(`/api/jobs/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchJobs();
            alert('Job deleted successfully.');
        } else {
            alert('Failed to delete job.');
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        alert('Network error occurred.');
    }
}
