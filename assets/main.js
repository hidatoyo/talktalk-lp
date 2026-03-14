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
    const cards = Array.from(teacherCarousel.querySelectorAll('.teacher-card'));
    const preferredReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const autoRotateDelay = 5000;
    let activeIndex = Math.max(cards.findIndex(card => card.hasAttribute('data-initial-teacher')), 0);
    let autoRotateTimer = null;
    let scrollSyncTimer = null;

    const normalizeIndex = (index) => {
      if (cards.length === 0) {
        return 0;
      }

      return (index + cards.length) % cards.length;
    };

    const updateActiveCard = () => {
      cards.forEach((card, index) => {
        card.classList.toggle('is-active', index === activeIndex);
      });
    };

    const getScrollLeftForCard = (card) => {
      if (!card) {
        return 0;
      }

      const cardOffset = card.offsetLeft - teacherCarousel.offsetLeft;
      const centeredOffset = (teacherCarousel.clientWidth - card.offsetWidth) / 2;
      return Math.max(0, cardOffset - centeredOffset);
    };

    const scrollToCard = (index, behavior = 'smooth') => {
      const normalizedIndex = normalizeIndex(index);
      const targetCard = cards[normalizedIndex];
      if (!targetCard) {
        return;
      }

      activeIndex = normalizedIndex;
      updateActiveCard();
      teacherCarousel.scrollTo({
        left: getScrollLeftForCard(targetCard),
        behavior
      });
    };

    const syncActiveCardFromScroll = () => {
      if (cards.length === 0) {
        return;
      }

      const carouselCenter = teacherCarousel.scrollLeft + teacherCarousel.clientWidth / 2;
      let nearestIndex = activeIndex;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft - teacherCarousel.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - carouselCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      if (nearestIndex !== activeIndex) {
        activeIndex = nearestIndex;
        updateActiveCard();
      }
    };

    const stopAutoRotate = () => {
      if (autoRotateTimer) {
        window.clearInterval(autoRotateTimer);
        autoRotateTimer = null;
      }
    };

    const startAutoRotate = () => {
      stopAutoRotate();
      if (preferredReducedMotion || cards.length <= 1) {
        return;
      }

      autoRotateTimer = window.setInterval(() => {
        scrollToCard(activeIndex + 1);
      }, autoRotateDelay);
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        scrollToCard(activeIndex - 1);
        startAutoRotate();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        scrollToCard(activeIndex + 1);
        startAutoRotate();
      });
    }

    teacherCarousel.addEventListener('scroll', () => {
      if (scrollSyncTimer) {
        window.clearTimeout(scrollSyncTimer);
      }

      scrollSyncTimer = window.setTimeout(() => {
        syncActiveCardFromScroll();
      }, 120);
    });

    teacherCarousel.addEventListener('mouseenter', stopAutoRotate);
    teacherCarousel.addEventListener('mouseleave', startAutoRotate);
    teacherCarousel.addEventListener('focusin', stopAutoRotate);
    teacherCarousel.addEventListener('focusout', startAutoRotate);
    teacherCarousel.addEventListener('touchstart', stopAutoRotate, { passive: true });
    teacherCarousel.addEventListener('touchend', startAutoRotate);

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => {
        scrollToCard(activeIndex, 'auto');
      });
    });

    updateActiveCard();
    window.requestAnimationFrame(() => {
      scrollToCard(activeIndex, preferredReducedMotion ? 'auto' : 'smooth');
      startAutoRotate();
    });
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
