document.addEventListener('DOMContentLoaded', function() {
    // Find the hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create the cursor gradient element
        const cursorGradient = document.createElement('div');
        cursorGradient.className = 'cursor-gradient';
        // Only transition opacity, not transform
        cursorGradient.style.transition = 'opacity 0.5s ease-in';
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

        // Track current position for smooth movement
        let currentX = centerX;
        let currentY = centerY;
        const maxSpeed = 30; // Maximum pixels per movement

        // Desktop mouse movement (only used if orientation events aren't firing)
        document.addEventListener('mousemove', (e) => {
            if (!/Mobi|Android|iPad|iPhone/.test(navigator.userAgent)) {
                const rect = heroSection.getBoundingClientRect();
                // Calculate target position
                const targetX = e.clientX - rect.left - (cursorGradient.offsetWidth / 2);
                const targetY = e.clientY - rect.top - (cursorGradient.offsetHeight / 2);
                
                // Calculate distance to move
                const dx = targetX - currentX;
                const dy = targetY - currentY;
                
                // Limit the maximum movement per frame
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > maxSpeed) {
                    const ratio = maxSpeed / distance;
                    currentX += dx * ratio;
                    currentY += dy * ratio;
                } else {
                    currentX = targetX;
                    currentY = targetY;
                }
                
                // Apply movement without transition
                cursorGradient.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        });
    }
});