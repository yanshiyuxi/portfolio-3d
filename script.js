/* ═══════════════════════════════════════════════════════════
   YAN SHIYU PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── SCROLL REVEAL ─── */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* ─── NAVBAR: scrolled state ─── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastY = 0;

  const handleScroll = () => {
    const y = window.scrollY;
    if (y > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastY = y;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load
})();

/* ─── MOBILE NAV HAMBURGER ─── */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  const navbar = document.getElementById('navbar');
})();

/* ─── ACTIVE NAV LINK (scroll spy) ─── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ─── ACCORDION ─── */
(function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    const targetId = trigger.dataset.target;
    const content = document.getElementById(targetId);
    if (!content) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.classList.toggle('open');
      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });
})();

/* ─── WECHAT COPY ─── */
(function initCopy() {
  document.querySelectorAll('.contact-link-copy').forEach((el) => {
    el.addEventListener('click', () => {
      const text = el.dataset.copy;
      if (!text) return;

      const hint = el.querySelector('.contact-copy-hint');

      navigator.clipboard.writeText(text).then(() => {
        if (hint) {
          hint.textContent = '已复制 ✓';
          hint.style.color = 'var(--gold)';
          setTimeout(() => {
            hint.textContent = '点击复制';
            hint.style.color = '';
          }, 2000);
        }
      }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (hint) {
          hint.textContent = '已复制 ✓';
          hint.style.color = 'var(--gold)';
          setTimeout(() => {
            hint.textContent = '点击复制';
            hint.style.color = '';
          }, 2000);
        }
      });
    });
  });
})();

/* ─── RESUME DOWNLOAD PLACEHOLDER ─── */
(function initResume() {
  const btn = document.getElementById('downloadResume');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    // Replace '#' with actual resume PDF path when available
    // e.g. btn.href = './resume-yanshiyu.pdf'; and remove preventDefault
    if (btn.getAttribute('href') === '#') {
      e.preventDefault();
      alert('简历PDF文件即将上线，请通过邮件/微信联系获取～');
    }
  });
})();

/* ─── SMOOTH SECTION ENTRANCE: stagger children on scroll ─── */
(function initStaggerChildren() {
  const rows = document.querySelectorAll('.work-projects, .exp-grid, .contact-links');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 80}ms`;
          child.classList.add('visible');
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  rows.forEach((row) => {
    Array.from(row.children).forEach((child) => {
      child.classList.add('reveal');
    });
    observer.observe(row);
  });
})();

/* ─── HERO NAME: letter-by-letter entrance ─── */
(function initHeroType() {
  const cnEl = document.querySelector('.hero-name-cn');
  if (!cnEl) return;

  // Add a subtle shimmer class after page loads
  setTimeout(() => {
    cnEl.style.transition = 'opacity 1200ms ease, transform 1200ms ease';
  }, 100);
})();

/* ─── CURSOR GLOW (subtle gold dot on desktop) ─── */
(function initCursorGlow() {
  // Only on desktop
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: opacity 300ms;
  `;
  document.body.appendChild(dot);

  let mx = 0, my = 0;
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!visible) {
      dot.style.opacity = '0.7';
      visible = true;
    }
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    visible = false;
  });

  // Grow on links / buttons
  document.querySelectorAll('a, button, .contact-link').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(3)';
      dot.style.opacity = '0.4';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.opacity = '0.7';
    });
  });
})();
