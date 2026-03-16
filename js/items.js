// Display approved items on the browse page
document.addEventListener('DOMContentLoaded', function() {
    loadApprovedItems();
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => filterItems());
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') filterItems();
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => filterItems());
    }
});

function loadApprovedItems(filter = 'all', searchTerm = '') {
    const approvedItems = JSON.parse(localStorage.getItem('approvedItems') || '[]');
    const container = document.getElementById('items-container');
    
    if (!container) return;
    
    let items = approvedItems;
    
    // Apply filters
    if (filter !== 'all') {
        items = items.filter(item => item.type === filter);
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        items = items.filter(item => 
            item.itemName.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.location.toLowerCase().includes(term)
        );
    }
    
    if (items.length === 0) {
        container.innerHTML = '<div class="no-items">No approved items found</div>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-type-badge ${item.type}">${item.type.toUpperCase()}</div>
            <div class="item-details">
                <h3>${item.itemName}</h3>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><small>Posted: ${new Date(item.submittedAt).toLocaleDateString()}</small></p>
                <button class="btn btn-primary contact-btn" onclick="showContact('${item.contact}')">Contact Owner</button>
            </div>
        </div>
    `).join('');
}

function filterItems() {
    const filter = document.getElementById('category-filter')?.value || 'all';
    const searchTerm = document.getElementById('search-input')?.value || '';
    loadApprovedItems(filter, searchTerm);
}

function showContact(contact) {
    alert(`Contact information: ${contact}`);
}
