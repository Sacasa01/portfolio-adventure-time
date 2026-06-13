export function initFireflies(canvas: HTMLCanvasElement | null): void {
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const DPR = Math.min(devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let raf = 0;
  let visible = true;

  const resize = (): void => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  };
  resize();
  addEventListener('resize', resize, { passive: true });

  const count = innerWidth < 768 ? 16 : 36;
  const flies = Array.from({ length: count }, () => ({
    x: Math.random(),
    y: 0.2 + Math.random() * 0.75,
    r: 1 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2,
    flicker: 1 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.012,
    vy: (Math.random() - 0.5) * 0.008,
  }));

  const draw = (t: number): void => {
    ctx.clearRect(0, 0, w, h);
    for (const f of flies) {
      f.x += f.vx * 0.016 + Math.sin(t / 4000 + f.phase) * 0.0003;
      f.y += f.vy * 0.016 + Math.cos(t / 5000 + f.phase) * 0.0002;
      if (f.x < -0.05) f.x = 1.05;
      if (f.x > 1.05) f.x = -0.05;
      if (f.y < 0.1) f.y = 0.95;
      if (f.y > 1) f.y = 0.15;
      const alpha = 0.25 + 0.75 * Math.abs(Math.sin((t / 1000) * f.flicker + f.phase));
      const px = f.x * w;
      const py = f.y * h;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, f.r * 6);
      grad.addColorStop(0, `rgba(255, 200, 100, ${alpha})`);
      grad.addColorStop(1, 'rgba(255, 180, 60, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, f.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !visible) {
      visible = true;
      raf = requestAnimationFrame(draw);
    } else if (!entry.isIntersecting && visible) {
      visible = false;
      cancelAnimationFrame(raf);
    }
  }).observe(canvas);

  raf = requestAnimationFrame(draw);
}
