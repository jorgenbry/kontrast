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

        // Check if device has orientation support
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                // Convert gyro data to position
                const rect = heroSection.getBoundingClientRect();
                
                // Map beta (-180 to 180) to Y position
                const maxY = rect.height - (cursorGradient.offsetHeight * 0.3);
                const y = Math.min(maxY, (e.beta + 90) * (rect.height / 180));
                
                // Map gamma (-90 to 90) to X position
                const x = ((e.gamma + 90) * (rect.width / 180)) - (cursorGradient.offsetWidth / 2);
                
                cursorGradient.style.transform = `translate(${x}px, ${y}px)`;
            });
        }

        // Desktop mouse movement
        document.addEventListener('mousemove', (e) => {
            // Only use mouse movement if not on mobile/tablet
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