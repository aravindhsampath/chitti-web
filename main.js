"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('prompt-input');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');

    // Toggle sidebar
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }

    // Auto-resize textarea based on content
    textarea.addEventListener('input', function() {
        requestAnimationFrame(() => {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            
            // Prevent scrolling page when textarea grows
            window.scrollTo(0, document.body.scrollHeight);
        });
    });

    // Handle enter key to send (Shift+Enter for new line)
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = this.value.trim();
            if (!message) return;
            
            // TODO: Implement send logic
            console.log('Send message:', message);
            
            requestAnimationFrame(() => {
                this.value = '';
                this.style.height = 'auto';
            });
        }
    });
});
