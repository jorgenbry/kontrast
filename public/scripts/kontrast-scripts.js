document.addEventListener('DOMContentLoaded', function() {
    const gradient = document.createElement('div');
    gradient.className = 'cursor-gradient';
    document.body.appendChild(gradient);
  
    document.addEventListener('mousemove', function(e) {
      const x = e.clientX - (window.innerWidth * 0.32);
      const y = e.clientY - (window.innerWidth * 0.32);
      gradient.style.transform = `translate(${x}px, ${y}px)`;
    });
  });