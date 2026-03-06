// ================================================
//  NextFable — main.js
//  Dark/light toggle · mobile menu · smooth scroll
//  WhatsApp form · scroll reveal animations
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────
  // 1. THEME — dark is default
  // ──────────────────────────────────────────────
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    if (theme === 'light') {
      html.classList.remove('dark');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    } else {
      html.classList.add('dark');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    }
    localStorage.setItem('nf_theme', theme);
  }

  const saved = localStorage.getItem('nf_theme');
  applyTheme(saved === 'light' ? 'light' : 'dark');

  window.toggleTheme = function () {
    applyTheme(html.classList.contains('dark') ? 'light' : 'dark');
  };

  // ──────────────────────────────────────────────
  // 2. MOBILE MENU
  // ──────────────────────────────────────────────
  window.toggleMobileMenu = function () {
    const menu      = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    if (!menu || !hamburger) return;
    menu.classList.toggle('hidden');
    const isOpen = !menu.classList.contains('hidden');
    hamburger.classList.toggle('fa-bars',  !isOpen);
    hamburger.classList.toggle('fa-xmark',  isOpen);
  };

  // ──────────────────────────────────────────────
  // 3. SMOOTH SCROLL
  // ──────────────────────────────────────────────
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = document.querySelector('nav')?.offsetHeight || 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  window.smoothScrollTo = scrollTo;

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      e.preventDefault();
      scrollTo(id);
    });
  });

  // ──────────────────────────────────────────────
  // 4. ORDER FORM → WHATSAPP
  // ──────────────────────────────────────────────
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      const g = id => (document.getElementById(id)?.value || '').trim();
      const lines = [
        '🚀 *New Website Order – NextFable*', '',
        '*Name:* ' + g('name'),
        '*Business:* ' + g('business'),
        '*Email:* ' + g('email'),
        '*Phone:* ' + g('phone'),
        '*Type:* ' + g('type'),
        '*Pages:* ' + g('pages'),
        '*Budget:* ' + g('budget'),
        '*Features:* ' + (g('features') || '—'), '',
        '*Description:*', g('description') || '—',
      ];
      const text = lines.join('%0A');
      window.open('https://wa.me/917280861089?text=' + text, '_blank');
      alert("Order sent! WhatsApp will open with your details. We'll reply shortly.");
      orderForm.reset();
    });
  }

  window.openWhatsAppChat = function () {
    const msg = encodeURIComponent('Hi NextFable! I would like to discuss a website project.');
    window.open('https://wa.me/917280861089?text=' + msg, '_blank');
  };

  // ──────────────────────────────────────────────
  // 5. NAVBAR — shadow + gentle shrink on scroll
  // ──────────────────────────────────────────────
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.35)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // ──────────────────────────────────────────────
  // 6. SCROLL REVEAL ANIMATIONS
  //    Auto-assigns animation to every section element.
  //    Animates IN on scroll down, OUT on scroll up.
  // ──────────────────────────────────────────────

  function autoTag() {
    // Headings → slide up
    document.querySelectorAll('h2, h3, h4').forEach(function(el, i) {
      if (el.closest('.hero-bg, .order-hero-bg, nav')) return;
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-up');
        el.style.transitionDelay = (i % 4 * 50) + 'ms';
      }
    });

    // Cards (service, project, pricing, more) → scale + fade, staggered
    document.querySelectorAll('.service-card, .project-card, .pricing-card, .more-card').forEach(function(el, i) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-scale');
        el.style.transitionDelay = (i % 3 * 110) + 'ms';
      }
    });

    // Order form card
    document.querySelectorAll('.order-card').forEach(function(el) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-up');
      }
    });

    // Steps (How it works rows) → alternate left/right
    document.querySelectorAll('.step-box').forEach(function(el, i) {
      var row = el.parentElement;
      if (!row.classList.contains('reveal')) {
        row.classList.add('reveal', i % 2 === 0 ? 'reveal-left' : 'reveal-right');
        row.style.transitionDelay = (i * 80) + 'ms';
      }
    });

    // Feature tiles → up stagger
    document.querySelectorAll('.feature-tile').forEach(function(el, i) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-up');
        el.style.transitionDelay = (i * 55) + 'ms';
      }
    });

    // Form rows inside order form → up
    document.querySelectorAll('#orderForm .grid, #orderForm > div').forEach(function(el, i) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-up');
        el.style.transitionDelay = (i * 60) + 'ms';
      }
    });

    // Contact info rows → left/right
    document.querySelectorAll('#contact .flex.gap-6').forEach(function(el, i) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', i % 2 === 0 ? 'reveal-left' : 'reveal-right');
        el.style.transitionDelay = (i * 100) + 'ms';
      }
    });

    // Inline-flex CTA buttons in sections → up
    document.querySelectorAll('section .inline-flex, section .flex-col.sm\\:flex-row, section .flex.flex-col').forEach(function(el) {
      if (el.closest('.hero-bg, .order-hero-bg, nav')) return;
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-up');
      }
    });

    // Portfolio section header + "view all" link → up
    document.querySelectorAll('#portfolio .flex.justify-between, #services .text-center, #pricing .text-center').forEach(function(el) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-up');
      }
    });

    // Section badge pills / spans → scale
    document.querySelectorAll('section span.rounded-full, section span.rounded-3xl').forEach(function(el) {
      if (el.closest('.hero-bg, .order-hero-bg, nav')) return;
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-scale');
      }
    });

    // Footer columns → up stagger
    document.querySelectorAll('footer > div > div > div').forEach(function(el, i) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', 'reveal-up');
        el.style.transitionDelay = (i * 90) + 'ms';
      }
    });
  }

  autoTag();

  // Observer — fires both ways (scroll down = in, scroll up = out)
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      } else {
        entry.target.classList.remove('reveal-active');
      }
    });
  }, {
    threshold: 0.10,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObs.observe(el);
  });

  // ──────────────────────────────────────────────
  // 7. HERO PARALLAX — content floats up on scroll
  // ──────────────────────────────────────────────
  var heroContent = document.querySelector('.hero-bg .relative.z-10, .order-hero-bg .relative.z-10');
  if (heroContent) {
    window.addEventListener('scroll', function() {
      var s = window.scrollY;
      if (s < window.innerHeight) {
        heroContent.style.transform = 'translateY(' + (s * 0.20) + 'px)';
        heroContent.style.opacity   = '' + Math.max(0, 1 - s / (window.innerHeight * 0.80));
      }
    }, { passive: true });
  }

  // ──────────────────────────────────────────────
  // 8. NUMBER COUNTER — add data-counter to any number
  // ──────────────────────────────────────────────
  function animateCounter(el) {
    var text     = el.textContent.trim();
    var numMatch = text.match(/[\d,]+/);
    if (!numMatch) return;
    var target   = parseInt(numMatch[0].replace(/,/g, ''));
    var prefix   = text.slice(0, text.indexOf(numMatch[0]));
    var suffix   = text.slice(text.indexOf(numMatch[0]) + numMatch[0].length);
    var start    = null;
    var duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = prefix + Math.floor(e * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(function(el) {
    counterObs.observe(el);
  });

  // ──────────────────────────────────────────────
  // 9. KEYBOARD SHORTCUT  Ctrl/Cmd + D = toggle theme
  // ──────────────────────────────────────────────
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      window.toggleTheme();
    }
  });

  console.log('NextFable scripts loaded ✓');
});