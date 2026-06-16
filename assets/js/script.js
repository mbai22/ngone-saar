(function nav() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

(function navbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));
})();

(function activeNav() {
  const links = document.querySelectorAll('#navMenu a');
  const page = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === page) a.classList.add('active');
  });
})();

(function fadeObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

(function galleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const close = document.getElementById('lightboxClose');
  const prev = document.getElementById('lightboxPrev');
  const next = document.getElementById('lightboxNext');
  if (!lightbox) return;
  const items = document.querySelectorAll('.gallery-item.lightbox-trigger');
  if (!items.length) return;
  let ci = 0;
  function open(i) {
    ci = i;
    lightboxImg.src = items[i].dataset.src;
    counter.textContent = (i + 1) + ' / ' + items.length;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function navLb(d) {
    ci = (ci + d + items.length) % items.length;
    open(ci);
  }
  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  if (close) close.addEventListener('click', closeLb);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
  if (prev) prev.addEventListener('click', () => navLb(-1));
  if (next) next.addEventListener('click', () => navLb(1));
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') navLb(-1);
    if (e.key === 'ArrowRight') navLb(1);
  });
})();

(function galleryCarouselDots() {
  const c = document.querySelector('.gallery-grid');
  const d = document.getElementById('galleryDots');
  if (!d || !c) return;
  const items = c.children;
  let interval;
  Array.from(items).forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { c.scrollTo({ left: items[i].offsetLeft - c.offsetLeft, behavior: 'smooth' }); stopAuto(); startAuto(); });
    d.appendChild(dot);
  });
  c.addEventListener('scroll', () => {
    const sl = c.scrollLeft + c.offsetWidth / 2;
    let ai = 0;
    Array.from(items).forEach((item, i) => { if (sl >= item.offsetLeft) ai = i; });
    d.querySelectorAll('span').forEach((dot, i) => dot.classList.toggle('active', i === ai));
  });
  function isMobile() { return window.innerWidth <= 768; }
  function scrollNext() {
    if (!isMobile()) return;
    const maxScroll = c.scrollWidth - c.offsetWidth;
    if (c.scrollLeft >= maxScroll - 10) {
      c.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      c.scrollBy({ left: c.offsetWidth, behavior: 'smooth' });
    }
  }
  function startAuto() { stopAuto(); if (isMobile()) interval = setInterval(scrollNext, 4000); }
  function stopAuto() { clearInterval(interval); }
  if (isMobile()) startAuto();
  c.addEventListener('touchstart', stopAuto);
  c.addEventListener('touchend', startAuto);
})();

(function backToTop() {
  const btn = document.getElementById('btnBackTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

(function countdown() {
  const target = new Date();
  target.setDate(target.getDate() + 30);
  target.setHours(0, 0, 0, 0);
  const daysEl = document.getElementById('cd-days');
  if (!daysEl) return;
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
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

(function agendaCarousel() {
  const grid = document.querySelector('.agenda-grid');
  if (!grid) return;
  let interval;
  function isMobile() { return window.innerWidth <= 768; }
  function scrollNext() {
    if (!isMobile()) return;
    grid.scrollBy({ left: grid.offsetWidth, behavior: 'smooth' });
    if (grid.scrollLeft + grid.offsetWidth >= grid.scrollWidth - 10) {
      grid.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }
  function startAuto() { stopAuto(); if (isMobile()) interval = setInterval(scrollNext, 4000); }
  function stopAuto() { clearInterval(interval); }
  if (isMobile()) startAuto();
  grid.addEventListener('touchstart', stopAuto);
  grid.addEventListener('touchend', startAuto);
  grid.addEventListener('mouseenter', stopAuto);
  grid.addEventListener('mouseleave', startAuto);
  window.addEventListener('resize', () => { stopAuto(); if (isMobile()) startAuto(); });
})();

(function shopCarousel() {
  const grid = document.getElementById('shopGrid');
  const prevBtn = document.getElementById('shopPrev');
  const nextBtn = document.getElementById('shopNext');
  const dots = document.getElementById('shopDots');
  if (!grid) return;
  const cards = grid.children;
  if (!cards.length) return;
  let interval;
  function getCardWidth() { return cards[0].offsetWidth + (parseInt(getComputedStyle(grid).gap) || 20); }
  function goTo(index) {
    const max = cards.length - 1;
    const i = Math.max(0, Math.min(index, max));
    const target = i * getCardWidth();
    grid.scrollTo({ left: target, behavior: 'smooth' });
  }
  function updateDots() {
    if (!dots) return;
    const spans = dots.querySelectorAll('span');
    const cw = getCardWidth();
    const active = cw > 0 ? Math.round(grid.scrollLeft / cw) : 0;
    spans.forEach((s, i) => s.classList.toggle('active', i === Math.min(active, spans.length - 1)));
  }
  function next() {
    const cw = getCardWidth();
    const maxScroll = cards.length * cw - grid.offsetWidth;
    if (grid.scrollLeft >= maxScroll - 5) {
      grid.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      grid.scrollBy({ left: cw, behavior: 'smooth' });
    }
  }
  function prev() { grid.scrollBy({ left: -getCardWidth(), behavior: 'smooth' }); }
  function startAuto() { stopAuto(); interval = setInterval(next, 4000); }
  function stopAuto() { clearInterval(interval); }
  if (dots) {
    for (let i = 0; i < cards.length; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goTo(i); stopAuto(); startAuto(); });
      dots.appendChild(dot);
    }
  }
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
  grid.addEventListener('scroll', updateDots);
  grid.addEventListener('touchstart', stopAuto);
  grid.addEventListener('touchend', startAuto);
  grid.addEventListener('mouseenter', stopAuto);
  grid.addEventListener('mouseleave', startAuto);
  startAuto();
})();

(function blogCarousel() {
  const grid = document.querySelector('.blog-preview');
  if (!grid) return;
  const cards = grid.children;
  if (!cards.length) return;
  let interval;
  function isMobile() { return window.innerWidth <= 768; }
  function getCardWidth() { return cards[0].offsetWidth + (parseInt(getComputedStyle(grid).gap) || 16); }
  function scrollNext() {
    if (!isMobile()) return;
    const cw = getCardWidth();
    const maxScroll = cards.length * cw - grid.offsetWidth;
    if (grid.scrollLeft >= maxScroll - 5) {
      grid.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      grid.scrollBy({ left: cw, behavior: 'smooth' });
    }
  }
  function startAuto() { stopAuto(); if (isMobile()) interval = setInterval(scrollNext, 4000); }
  function stopAuto() { clearInterval(interval); }
  if (isMobile()) startAuto();
  grid.addEventListener('touchstart', stopAuto);
  grid.addEventListener('touchend', startAuto);
  grid.addEventListener('mouseenter', stopAuto);
  grid.addEventListener('mouseleave', startAuto);
  window.addEventListener('resize', () => { stopAuto(); if (isMobile()) startAuto(); });
})();
