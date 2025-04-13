// Calculate years of experience
function calculateExperience() {
  const experienceYears = '5+';
  document.getElementById('experienceYears').textContent = experienceYears;
}

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

// Enhanced scroll-based animations
let lastScrollTop = 0;
const header = document.querySelector('header');

function handleScroll() {
  const sections = document.querySelectorAll('section');
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  // Header show/hide based on scroll direction with smooth transition
  if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollTop = currentScrollTop;

  // Enhanced section animations with Intersection Observer
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight * 0.75;

    if (isVisible && !section.classList.contains('animated')) {
      section.classList.add('animated');

      // Trigger animations for child elements
      const animatedElements = section.querySelectorAll(
        '.about-text, .about-image, .stats, .project, .contact-content'
      );
      animatedElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }
  });

  // Active navigation state
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (currentScrollTop >= sectionTop && currentScrollTop < sectionBottom) {
      document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
    } else {
      document
        .querySelector(`a[href="#${sectionId}"]`)
        .classList.remove('active');
    }
  });
}

// Enhanced parallax effect
function handleParallax() {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    if (section.classList.contains('hero')) {
      section.style.backgroundPosition = `center ${rate}px`;
    }
  });
}

// Scroll indicator with enhanced animation
const scrollIndicator = document.querySelector('.scroll-indicator');
let animationPaused = false;

scrollIndicator.addEventListener('mouseenter', () => {
  animationPaused = true;
  scrollIndicator.style.animation = 'none';
});

scrollIndicator.addEventListener('mouseleave', () => {
  animationPaused = false;
  scrollIndicator.style.animation = 'scrollIndicator 2s infinite';
});

// Smooth scroll to about section
scrollIndicator.addEventListener('click', () => {
  document.querySelector('#about').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// Initialize with enhanced animations
document.addEventListener('DOMContentLoaded', () => {
  calculateExperience();

  // Initial section animations
  document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });

  // Enhanced hero title effect
  const heroTitle = document.querySelector('.hero h1');
  heroTitle.setAttribute('data-text', heroTitle.textContent);

  // Initial scroll position
  handleScroll();
});

// Optimized scroll event listener
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      handleScroll();
      handleParallax();
      scrollTimeout = null;
    }, 16); // ~60fps
  }
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener(
  'scroll',
  debounce(() => {
    handleScroll();
    handleParallax();
  }, 250)
);
