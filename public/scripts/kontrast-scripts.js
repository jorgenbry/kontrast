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
        
        // Start with 0 opacity and fade in
        cursorGradient.style.opacity = '0';
        setTimeout(() => {
            cursorGradient.style.opacity = '0.75';
        }, 100); // Small delay to ensure the transition works

        // Add a flag to track if mouse has moved
        let hasMouseMoved = false;

        // Track mouse movement only after first move
        document.addEventListener('mousemove', (e) => {
            if (!hasMouseMoved) {
                // Wait for fade-in before starting to track mouse
                setTimeout(() => {
                    hasMouseMoved = true;
                }, 2000); // Match this with your CSS transition time
                return;
            }

            const rect = heroSection.getBoundingClientRect();
            
            // Calculate position relative to the hero section
            const x = e.pageX - rect.left - window.scrollX - (cursorGradient.offsetWidth / 2);
            
            // For Y position, clamp it to keep the gradient partially visible
            const maxY = rect.height - (cursorGradient.offsetHeight * 0.3); // Keep 30% visible
            const rawY = e.pageY - rect.top - window.scrollY - (cursorGradient.offsetHeight / 2);
            const y = Math.min(maxY, rawY);
            
            cursorGradient.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Remove mouseleave/mouseenter handlers since we want it always visible
    }
});