document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (!menuBtn || !mobileNav) {
    return;
  }

  let isMenuOpen = false;

  const syncMenuState = () => {
    mobileNav.classList.toggle('open', isMenuOpen);
    menuBtn.setAttribute('aria-expanded', String(isMenuOpen));
    menuBtn.innerHTML = isMenuOpen
      ? '<span class="material-icons">close</span>'
      : '<span class="material-icons">menu</span>';
  };

  menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    syncMenuState();
  });

  // Close menu when a link is clicked
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      syncMenuState();
    });
  });

  syncMenuState();

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
