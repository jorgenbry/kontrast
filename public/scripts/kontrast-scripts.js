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
            const x = e.clientX - rect.left - (cursorGradient.offsetWidth / 2);
            const y = e.clientY - rect.top - (cursorGradient.offsetHeight / 2);
            
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