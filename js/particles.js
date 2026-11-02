/* ============================================================
   particles.js  —  Subtle green/purple particle network
   ============================================================ */
(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CFG = {
    count:   55,
    minR:    .6,
    maxR:    2.2,
    speed:   .28,
    linkDist: 130,
    colors: [
      'rgba(16,185,129,',   // emerald
      'rgba(52,211,153,',   // lighter emerald
      'rgba(167,139,250,',  // soft purple
    ],
  };

  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function mkParticle() {
    return {
      x: rand(0, W), y: rand(0, H),
      vx: rand(-CFG.speed, CFG.speed),
      vy: rand(-CFG.speed, CFG.speed),
      r:  rand(CFG.minR, CFG.maxR),
      color: CFG.colors[Math.floor(Math.random() * CFG.colors.length)],
      op: rand(.3, .7),
    };
  }

  function init() {
    particles = Array.from({ length: CFG.count }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.op + ')';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CFG.linkDist) {
          const alpha = (1 - dist / CFG.linkDist) * .28;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color + alpha + ')';
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    });
    animId = requestAnimationFrame(draw);
  }

  new ResizeObserver(() => { resize(); init(); }).observe(canvas);
  resize(); init(); draw();
})();
