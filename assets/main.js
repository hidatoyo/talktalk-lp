document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
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
  }

  const teacherCarousel = document.getElementById('teacher-carousel');
  if (teacherCarousel) {
    const prevButton = document.querySelector('.teacher-nav-prev');
    const nextButton = document.querySelector('.teacher-nav-next');
    const firstCard = teacherCarousel.querySelector('.teacher-card');
    const scrollAmount = () => {
      if (!firstCard) {
        return teacherCarousel.clientWidth * 0.85;
      }

      const gap = parseFloat(window.getComputedStyle(teacherCarousel.querySelector('.teacher-track')).gap) || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        teacherCarousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        teacherCarousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }
  }

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
