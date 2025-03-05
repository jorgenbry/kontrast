document.addEventListener('DOMContentLoaded', function() {
    // Find the hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create the cursor gradient element
        const cursorGradient = document.createElement('div');
        cursorGradient.className = 'cursor-gradient';
        heroSection.appendChild(cursorGradient);

        // Set initial center position
        const rect = heroSection.getBoundingClientRect();
        const centerX = (rect.width - cursorGradient.offsetWidth) / 2;
        const centerY = (rect.height - cursorGradient.offsetHeight) / 2;
        cursorGradient.style.transform = `translate(${centerX}px, ${centerY}px)`;
        
        // Start completely invisible
        cursorGradient.style.opacity = '0';
        
        // Fade in slowly after a small delay
        setTimeout(() => {
            cursorGradient.style.opacity = '0.75';
        }, 500);

        // Track mouse movement immediately
        document.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.pageX - rect.left - window.scrollX - (cursorGradient.offsetWidth / 2);
            
            const maxY = rect.height - (cursorGradient.offsetHeight * 0.3);
            const rawY = e.pageY - rect.top - window.scrollY - (cursorGradient.offsetHeight / 2);
            const y = Math.min(maxY, rawY);
            
            cursorGradient.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});