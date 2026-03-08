document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  let isMenuOpen = false;

  menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileNav.classList.add('open');
      menuBtn.innerHTML = '<span class="material-icons">close</span>';
    } else {
      mobileNav.classList.remove('open');
      menuBtn.innerHTML = '<span class="material-icons">menu</span>';
    }
  });

  // Close menu when a link is clicked
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.innerHTML = '<span class="material-icons">menu</span>';
      isMenuOpen = false;
    });
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Observers fire only once per element
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in-up');
  animatedElements.forEach(el => observer.observe(el));
});
