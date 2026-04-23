// Scroll fade-in animation
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Staggered entrance delay for experience cards and stat items
document.querySelectorAll('.exp-card, .stat-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

// Nav shadow on scroll
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 60);
});
