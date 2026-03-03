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
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-mobile-open');
        });
    }

    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', () => {
            document.body.classList.remove('sidebar-mobile-open');
        });
    }


    // Topic Group Collapsible Logic
    const topicHeaders = document.querySelectorAll('.topic-header');
    topicHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const group = header.closest('.topic-group');
            const isOpen = group.classList.contains('open');
            
            // Toggle class
            group.classList.toggle('open');
            
            // Update ARIA attribute
            header.setAttribute('aria-expanded', !isOpen);
            
            // Rotate caret icon
            const icon = header.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('ph-caret-down');
                    icon.classList.add('ph-caret-right');
                } else {
                    icon.classList.remove('ph-caret-right');
                    icon.classList.add('ph-caret-down');
                }
            }
        });
    });

    // Auto-resize textarea based on content
    textarea.addEventListener('input', function() {
        requestAnimationFrame(() => {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            
            // No body scrolling needed since prompt is fixed and chat scrolls
        });
    });

    const sendBtn = document.querySelector('.send-btn');
    const chatContainer = document.querySelector('.chat-container');
    const welcomeMessage = document.querySelector('.welcome-message');

    function appendMessage(text, isUser) {
        if (welcomeMessage && welcomeMessage.style.display !== 'none') {
            welcomeMessage.style.display = 'none';
        }
        
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${isUser ? 'message-user' : 'message-bot'}`;
        // Preserve line breaks
        bubble.style.whiteSpace = 'pre-wrap';
        bubble.textContent = text;
        
        chatContainer.appendChild(bubble);
        
        // Scroll to bottom
        requestAnimationFrame(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
    }

    function handleSend() {
        const message = textarea.value.trim();
        if (!message) return;
        
        // Add user message
        appendMessage(message, true);
        
        // Clear textarea
        requestAnimationFrame(() => {
            textarea.value = '';
            textarea.style.height = 'auto';
        });
        
        // Simulate bot echo after a short delay
        setTimeout(() => {
            appendMessage(message, false);
        }, 400);
    }

    // Handle enter key to send (Shift+Enter for new line)
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Handle send button click
    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }
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

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn?.querySelector('i');

    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.className = 'ph ph-moon';
            localStorage.setItem('theme', 'light');
        } else if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'ph ph-sun';
            localStorage.setItem('theme', 'dark');
        }
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Check system preference
        const isSystemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (themeIcon) themeIcon.className = isSystemLight ? 'ph ph-moon' : 'ph ph-sun';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isSystemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            let currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (!currentTheme) {
                currentTheme = isSystemLight ? 'light' : 'dark';
            }
            
            if (currentTheme === 'light') {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }

    // Listen for system theme changes if no user preference
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme') && themeIcon) {
            themeIcon.className = e.matches ? 'ph ph-moon' : 'ph ph-sun';
        }
    });
});