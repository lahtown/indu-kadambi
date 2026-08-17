document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Fade Up Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // Simple Parallax for Hero
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
    }
  });
  // Accordion interactivity
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      
      // Close all other items (optional, keeps UI clean)
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 30 + "px"; // Adding extra space for padding
      }
    });
  });
  
  // Bot-safe email construction (prevents simple scraping)
  const user = 'elect.indu';
  const domain = 'gmail.com';
  const emailTarget = user + '@' + domain;

  // Footer Contact Link
  const footerLink = document.getElementById('footer-contact-link');
  if (footerLink) {
    footerLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `mailto:${emailTarget}`;
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Bot honeypot check
      const honeypot = document.getElementById('contact-website');
      if (honeypot && honeypot.value !== "") {
        // Silent failure for bots
        return;
      }
      
      const name = document.getElementById('contact-name').value;
      const message = document.getElementById('contact-message').value;
      
      const subject = encodeURIComponent(`Message from ${name} via Campaign Website`);
      const body = encodeURIComponent(message);
      
      window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`;
    });
  }
});
