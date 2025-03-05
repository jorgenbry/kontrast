document.addEventListener('DOMContentLoaded', function() {
    // Find the hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create the cursor gradient element
        const cursorGradient = document.createElement('div');
        cursorGradient.className = 'cursor-gradient';
        heroSection.appendChild(cursorGradient);

        // Track mouse movement
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            
            // Calculate position relative to the hero section
            // Account for scroll position
            const x = e.pageX - rect.left - window.scrollX - (cursorGradient.offsetWidth / 2);
            const y = e.pageY - rect.top - window.scrollY - (cursorGradient.offsetHeight / 2);
            
            cursorGradient.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Handle mouse enter/leave
        heroSection.addEventListener('mouseleave', () => {
            cursorGradient.style.opacity = '0';
        });

        heroSection.addEventListener('mouseenter', () => {
            cursorGradient.style.opacity = '0.75';
        });
    }
});