/* ========== Countdown ========== */
(function initCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 30);
  target.setHours(0, 0, 0, 0);
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  if (!daysEl) return;
  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      daysEl.textContent = '00'; hoursEl.textContent = '00'; minsEl.textContent = '00'; secsEl.textContent = '00';
      return;
    }
    daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    hoursEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    minsEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    secsEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

/* ========== Nav toggle ========== */
(function nav() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

/* ========== Navbar scroll ========== */
(function navbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));
})();

/* ========== Fade-in observer ========== */
(function fadeObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

/* ========== Lightbox ========== */
(function lightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  if (!lightbox) return;
  const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');
  let ci = 0;
  function openLightbox(i) {
    ci = i;
    lightboxImg.src = galleryItems[i].dataset.src;
    lightboxCounter.textContent = (i + 1) + ' / ' + galleryItems.length;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function navLightbox(d) {
    ci = (ci + d + galleryItems.length) % galleryItems.length;
    openLightbox(ci);
  }
  galleryItems.forEach((item, i) => { item.addEventListener('click', () => openLightbox(i)); });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lightboxPrev.addEventListener('click', () => navLightbox(-1));
  lightboxNext.addEventListener('click', () => navLightbox(1));
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });
})();

/* ========== Gallery dots ========== */
(function galleryDots() {
  const c = document.getElementById('galleryGrid');
  const d = document.getElementById('galleryDots');
  if (!d || !c) return;
  const items = c.children;
  Array.from(items).forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { c.scrollTo({ left: items[i].offsetLeft - c.offsetLeft, behavior: 'smooth' }); });
    d.appendChild(dot);
  });
  c.addEventListener('scroll', () => {
    const sl = c.scrollLeft + c.offsetWidth / 2;
    let ai = 0;
    Array.from(items).forEach((item, i) => { if (sl >= item.offsetLeft) ai = i; });
    d.querySelectorAll('span').forEach((dot, i) => dot.classList.toggle('active', i === ai));
  });
})();

/* ========== Back to top ========== */
(function backToTop() {
  const btnTop = document.getElementById('btnBackTop');
  if (!btnTop) return;
  window.addEventListener('scroll', () => { btnTop.classList.toggle('visible', window.scrollY > 500); });
  btnTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
