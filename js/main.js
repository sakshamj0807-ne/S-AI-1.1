/* ============================================================
   main.js  —  Portfolio v2 core interactions
   ============================================================ */

/* ── 1. LOADER ───────────────────────────────────────────── */
document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2600);
});

/* ── 2. NAVBAR ───────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 55);

    // Active link
    const mid = window.scrollY + window.innerHeight * .5;
    document.querySelectorAll('section[id]').forEach(sec => {
      const t = sec.offsetTop, b = t + sec.offsetHeight;
      const a = nav.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (a) a.classList.toggle('active', mid >= t && mid < b);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── 3. MOBILE HAMBURGER ─────────────────────────────────── */
(function () {
  const btn = document.querySelector('.hamburger');
  const mob = document.querySelector('.nav-mobile');
  if (!btn || !mob) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mob.classList.toggle('open');
    btn.setAttribute('aria-expanded', btn.classList.contains('open'));
  });

  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    mob.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

/* ── 4. SMOOTH SCROLL ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── 5. REVEAL ON SCROLL ─────────────────────────────────── */
(function () {
  const revObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
    }),
    { threshold: .1 }
  );

  const stagObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); stagObs.unobserve(e.target); }
    }),
    { threshold: .06 }
  );

  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
  document.querySelectorAll('.stagger').forEach(el => stagObs.observe(el));
})();

/* ── 6. TYPEWRITER ───────────────────────────────────────── */
(function () {
  const el = document.getElementById('type-target');
  if (!el) return;

  const words = [
    'Computer Science Student',
    'Aspiring AI Developer',
    'Cybersecurity Enthusiast',
    'Hackathon Competitor',
    'Python Programmer',
    'CTF Player',
  ];

  let wi = 0, ci = 0, del = false;
  const TS = 90, DS = 45, P = 2000;

  function tick() {
    const w = words[wi];
    if (!del) {
      el.textContent = w.slice(0, ci + 1);
      ci++;
      if (ci === w.length) { setTimeout(() => { del = true; tick(); }, P); return; }
    } else {
      el.textContent = w.slice(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, del ? DS : TS);
  }

  setTimeout(tick, 1400);
})();

/* ── 7. HERO ORB PARALLAX ────────────────────────────────── */
(function () {
  const orbs = document.querySelectorAll('.h-orb');
  if (!orbs.length) return;
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    orbs.forEach((o, i) => {
      const f = (i + 1) * 14;
      o.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
    });
  }, { passive: true });
})();

/* ── 8. HERO SCROLL CTA ──────────────────────────────────── */
const scrollBtn = document.querySelector('.hero-scroll');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ── 9. BACK TO TOP ──────────────────────────────────────── */
(function () {
  const btt = document.getElementById('btt');
  if (!btt) return;
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── 10. FOOTER YEAR ─────────────────────────────────────── */
const yr = document.getElementById('footer-year');
if (yr) yr.textContent = new Date().getFullYear();

/* ── 11. CARD 3D TILT ────────────────────────────────────── */
(function () {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      const rx = (-y / r.height) * 7;
      const ry = (x / r.width)  * 7;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── 12. CONTACT FORM (client-side) ─────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  const msg  = document.getElementById('form-msg');
  if (!form || !msg) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;

    // Simulate send (replace with real form service like Formspree / EmailJS)
    setTimeout(() => {
      msg.textContent = '✓ Message sent! I\'ll get back to you soon.';
      msg.className = 'success';
      form.reset();
      btn.innerHTML = origText;
      btn.disabled = false;

      setTimeout(() => { msg.className = ''; msg.textContent = ''; }, 5000);
    }, 1600);
  });
})();
