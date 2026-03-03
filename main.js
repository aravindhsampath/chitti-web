document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('prompt-input');

    // Auto-resize textarea based on content
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Prevent scrolling page when textarea grows
        window.scrollTo(0, document.body.scrollHeight);
    });

    // Handle enter key to send (Shift+Enter for new line)
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // TODO: Implement send logic
            console.log('Send message:', this.value);
            this.value = '';
            this.style.height = 'auto';
        }
    });
});
