// 滚动出现动画
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});

// 导航阴影
window.addEventListener("scroll", () => {
  const nav = document.getElementById("main-nav");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    nav.style.boxShadow = "none";
  }
});
