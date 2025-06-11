// Add no-js class by default, will be removed if JavaScript is available
document.documentElement.classList.add('no-js');

// Remove no-js class when JavaScript is available
document.documentElement.classList.remove('no-js');

// Handle page load
function handlePageLoad() {
    document.body.classList.add('loaded');
}

// If the page is already loaded
if (document.readyState === 'complete') {
    handlePageLoad();
} else {
    // Wait for the page to load
    window.addEventListener('load', handlePageLoad);
}

document.addEventListener('DOMContentLoaded', function() {
    // Find the hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create the cursor gradient element
        const cursorGradient = document.createElement('div');
        cursorGradient.className = 'cursor-gradient';
        cursorGradient.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 2s cubic-bezier(0.1, 0, 0.3, 1)';
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
                // Calculate target position
                const targetX = e.clientX - rect.left - (cursorGradient.offsetWidth / 2);
                const targetY = e.clientY - rect.top - (cursorGradient.offsetHeight / 2);
                
                // Apply smooth movement with easing
                cursorGradient.style.transform = `translate(${targetX}px, ${targetY}px)`;
            }
        });
    }

    // Page transition handling
    const containers = document.querySelectorAll('section.section .container');
    if (containers.length > 0) {
        // Handle internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith(window.location.origin) && !link.target) {
                e.preventDefault();
                const href = link.href;
                
                // Add fade-out class to all containers
                containers.forEach(container => {
                    container.classList.add('fade-out');
                });
                
                // Wait for fade-out to complete before navigating
                setTimeout(() => {
                    window.location.href = href;
                }, 300); // Match this with the CSS transition duration
            }
        });
    }
});