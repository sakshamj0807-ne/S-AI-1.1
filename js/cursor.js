/* ============================================================
   cursor.js  —  Magnetic custom cursor
   ============================================================ */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  const sel = 'a,button,[role="button"],input,textarea,label,.proj-card,.ach-card,.skill-card,.passion-row,.tl-card';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(sel)) ring.classList.add('hovered');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(sel)) ring.classList.remove('hovered');
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('clicked');
    ring.classList.add('clicked');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('clicked');
    ring.classList.remove('clicked');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();
