// Partículas sencillas para #particlesCanvas (sin librerías)
(function () {
  const cvs = document.getElementById("particlesCanvas");
  if (!cvs) return;
  const ctx = cvs.getContext("2d");
  let w, h, particles;
  function resize() {
    w = cvs.width = window.innerWidth;
    h = cvs.height =
      document.querySelector(".hero").offsetHeight || window.innerHeight;
  }
  function rnd(n) {
    return Math.random() * n;
  }
  function init() {
    particles = Array.from(
      { length: Math.min(120, Math.floor(w / 16)) },
      () => ({
        x: rnd(w),
        y: rnd(h),
        r: rnd(1.8) + 0.4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      })
    );
  }
  function step() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(184,115,51,.9)";
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    // líneas sutiles
    ctx.strokeStyle = "rgba(6,182,212,.08)";
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i],
          b = particles[j];
        const dx = a.x - b.x,
          dy = a.y - b.y,
          d = Math.hypot(dx, dy);
        if (d < 110) {
          ctx.globalAlpha = ((110 - d) / 110) * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    requestAnimationFrame(step);
  }
  window.addEventListener("resize", () => {
    resize();
    init();
  });
  resize();
  init();
  step();
})();
