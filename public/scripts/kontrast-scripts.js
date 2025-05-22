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

        // Track positions and movement
        let currentX = centerX;
        let currentY = centerY;
        let targetX = centerX;
        let targetY = centerY;
        const maxSpeed = 2; // Maximum speed in pixels per frame
        let animationFrameId = null;

        // Smooth movement function
        function updatePosition() {
            // Calculate distance to target
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0.1) { // Only move if we're not very close to target
                // Calculate movement for this frame
                const moveX = (dx / distance) * maxSpeed;
                const moveY = (dy / distance) * maxSpeed;
                
                // Update current position
                currentX += moveX;
                currentY += moveY;
                
                // Apply the movement
                cursorGradient.style.transform = `translate(${currentX}px, ${currentY}px)`;
                
                // Continue animation
                animationFrameId = requestAnimationFrame(updatePosition);
            }
        }

        // Desktop mouse movement
        document.addEventListener('mousemove', (e) => {
            if (!/Mobi|Android|iPad|iPhone/.test(navigator.userAgent)) {
                const rect = heroSection.getBoundingClientRect();
                // Update target position
                targetX = e.clientX - rect.left - (cursorGradient.offsetWidth / 2);
                targetY = e.clientY - rect.top - (cursorGradient.offsetHeight / 2);
                
                // Start animation if not already running
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(updatePosition);
                }
            }
        });
    }
});