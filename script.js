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

  // Contact Form Setup (FormSubmit Backend)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Dynamically set action to avoid simple HTML scraping
    contactForm.setAttribute('action', `https://formsubmit.co/${emailTarget}`);
  }

  // Floating Endorsement Pop-up Rotator & Dismissal
  const floatingPopup = document.getElementById('floating-endorsement');
  const closePopupBtn = document.getElementById('close-endorsement-popup');
  const popupQuoteText = document.getElementById('popup-quote-text');
  const popupAuthorName = document.getElementById('popup-author-name');
  const popupAuthorTitle = document.getElementById('popup-author-title');

  if (floatingPopup && closePopupBtn && popupQuoteText && popupAuthorName && popupAuthorTitle) {
    let rotatorInterval = null;

    // Dismiss popup
    const dismissPopup = (e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      if (rotatorInterval) {
        clearInterval(rotatorInterval);
      }
      floatingPopup.classList.add('is-hidden');
      floatingPopup.style.setProperty('display', 'none', 'important');
      floatingPopup.style.opacity = '0';
      floatingPopup.style.visibility = 'hidden';
      floatingPopup.style.pointerEvents = 'none';
    };

    closePopupBtn.addEventListener('click', dismissPopup);
    closePopupBtn.addEventListener('touchend', dismissPopup);

    // Curated quotes rotation
    const featuredEndorsements = [
      {
        quote: "“There is no question that Indu will be a Council person who will work for us residents, without any other agenda but to do the right thing for the Town.”",
        name: "Roger Spreen",
        title: "Former Council Member & Mayor"
      },
      {
        quote: "“You've had enough experience in activities to know just how challenging this job is! ...who care deeply and are willing to dedicate lots of time to finding appropriate solutions.”",
        name: "Ginger Summit",
        title: "Former Mayor of Los Altos Hills"
      },
      {
        quote: "“In this environment, Indu has already proven her skills, having served on the Fire Commission as well as on the Board of the civic group Hills 2000...”",
        name: "Jitze Couperus",
        title: "Former Planning & Fire Commissioner"
      },
      {
        quote: "“She understands the importance of responsible fiscal management, thoughtful planning, preserving the character of Los Altos Hills, and ensuring residents have a voice.”",
        name: "Dorothy Duffy Price",
        title: "Served 16 Years on Fire Commission"
      }
    ];

    let currentIdx = 0;
    rotatorInterval = setInterval(() => {
      if (floatingPopup.classList.contains('is-hidden') || floatingPopup.style.display === 'none') {
        if (rotatorInterval) clearInterval(rotatorInterval);
        return;
      }
      currentIdx = (currentIdx + 1) % featuredEndorsements.length;
      
      popupQuoteText.style.opacity = '0';
      setTimeout(() => {
        popupQuoteText.textContent = featuredEndorsements[currentIdx].quote;
        popupAuthorName.textContent = featuredEndorsements[currentIdx].name;
        popupAuthorTitle.textContent = featuredEndorsements[currentIdx].title;
        popupQuoteText.style.opacity = '1';
      }, 350);
    }, 6500);
  }

  // Lightbox modal for Our Town article zoom
  const openNewsletterBtn = document.getElementById('open-newsletter-btn');
  const newsletterModal = document.getElementById('newsletter-modal');
  const closeNewsletterModal = document.getElementById('close-newsletter-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (openNewsletterBtn && newsletterModal) {
    const openModal = () => {
      newsletterModal.classList.add('open');
      newsletterModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      newsletterModal.classList.remove('open');
      newsletterModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    openNewsletterBtn.addEventListener('click', openModal);
    openNewsletterBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });

    if (closeNewsletterModal) {
      closeNewsletterModal.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && newsletterModal.classList.contains('open')) {
        closeModal();
      }
    });
  }
});
