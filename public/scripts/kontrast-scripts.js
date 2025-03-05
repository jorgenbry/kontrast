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

        // Try to use device orientation if available
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta !== null && e.gamma !== null) {  // Check if we actually have orientation data
                const rect = heroSection.getBoundingClientRect();
                
                // Use more subtle movement range
                const maxY = rect.height - (cursorGradient.offsetHeight * 0.3);
                const y = Math.min(maxY, rect.height/2 + (e.beta * rect.height / 360));
                const x = rect.width/2 + (e.gamma * rect.width / 180);
                
                cursorGradient.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        // Desktop mouse movement (only used if orientation events aren't firing)
        document.addEventListener('mousemove', (e) => {
            if (!/Mobi|Android|iPad|iPhone/.test(navigator.userAgent)) {
                const rect = heroSection.getBoundingClientRect();
                const x = e.pageX - rect.left - window.scrollX - (cursorGradient.offsetWidth / 2);
                
                const maxY = rect.height - (cursorGradient.offsetHeight * 0.3);
                const rawY = e.pageY - rect.top - window.scrollY - (cursorGradient.offsetHeight / 2);
                const y = Math.min(maxY, rawY);
                
                cursorGradient.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
});