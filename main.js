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
    // Custom Dropdown Logic
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    
    dropdownContainers.forEach(container => {
        const btn = container.querySelector('.icon-text-btn');
        const menu = container.querySelector('.dropdown-menu');
        const items = menu.querySelectorAll('.dropdown-item');
        const label = btn.querySelector('span');
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other open menus
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                if (openMenu !== menu) openMenu.classList.remove('show');
            });
            menu.classList.toggle('show');
            btn.setAttribute('aria-expanded', menu.classList.contains('show'));
        });

        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                // Update active state
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                // Update label
                if (label) label.textContent = item.textContent;
                // Close menu
                menu.classList.remove('show');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
            const btn = menu.previousElementSibling;
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    });
