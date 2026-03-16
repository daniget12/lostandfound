// Report Form Handling with Telegram Integration
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Set default date to today
    const dateFields = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateFields.forEach(field => field.value = today);

    // Form submission
    const lostForm = document.getElementById('lost-form');
    const foundForm = document.getElementById('found-form');
    const successModal = document.getElementById('success-modal');

    if (lostForm) {
        lostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(lostForm, 'lost');
        });
    }

    if (foundForm) {
        foundForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(foundForm, 'found');
        });
    }

    function handleFormSubmission(form, type) {
        const formData = new FormData(form);
        
        // Create item object
        const item = {
            id: Date.now(),
            type: type,
            itemName: formData.get('itemName'),
            category: formData.get('category'),
            date: formData.get('date'),
            location: formData.get('location'),
            description: formData.get('description'),
            contact: formData.get('contact'),
            status: 'pending', // pending, approved, rejected
            submittedAt: new Date().toISOString()
        };

        // Save to localStorage
        const pendingItems = JSON.parse(localStorage.getItem('pendingItems') || '[]');
        pendingItems.push(item);
        localStorage.setItem('pendingItems', JSON.stringify(pendingItems));

        // Show success message
        successModal.style.display = 'block';
        form.reset();
        
        // Set date again after reset
        dateFields.forEach(field => field.value = today);
    }

    // Modal close functionality
    const closeButtons = document.querySelectorAll('.close-modal, .close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
});
