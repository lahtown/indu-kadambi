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
    // Dismiss button
    closePopupBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      floatingPopup.style.opacity = '0';
      floatingPopup.style.transform = 'translateY(20px) scale(0.95)';
      setTimeout(() => {
        floatingPopup.style.display = 'none';
      }, 300);
    });

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
    setInterval(() => {
      if (floatingPopup.style.display === 'none') return;
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
});
