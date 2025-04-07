console.log('Debug version loaded');

// Password toggle functionality
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleText = document.querySelector('.toggle-password');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleText.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    toggleText.textContent = 'Show';
  }
}

// Check if loadScript is defined and avoid redundancy
const loadScript = (src) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => resolve();
  script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
  document.head.appendChild(script);
});

// Load GSAP and ScrollTrigger
Promise.all([
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js'),
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js')
]).then(() => {
  console.log('GSAP loaded successfully');
  
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Page load animations
    gsap.from('.div', {
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: "power2.out"
    });

    // Element animations
    gsap.from('.anumated', {
      duration: 1,
      opacity: 0,
      x: -50,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });

    // Scroll animations for all sections
    gsap.utils.toArray('.overlap, .overlap-group, .overlap-2, .overlap-3, .overlap-4, .overlap-5').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          markers: true
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: this.getAttribute('href'),
          ease: "power2.inOut"
        });
      });
    });
  } else {
    console.error('GSAP or ScrollTrigger not defined');
  }
}).catch(err => {
  console.error('Error loading GSAP:', err);
});
