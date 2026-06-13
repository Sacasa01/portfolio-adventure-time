interface GraphNode { id: string; label: string; x: number; y: number; g: string }
interface Graph { nodes: GraphNode[]; edges: [string, string][] }

export function initConstellation(canvas: HTMLCanvasElement | null, graph: Graph): void {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let raf = 0;
  let hover: GraphNode | null = null;
  const mouse = { x: -1, y: -1 };

  const resize = (): void => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  };
  resize();
  addEventListener('resize', resize, { passive: true });

  const cssVar = (name: string): string =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const pos = (n: GraphNode, t: number): { x: number; y: number } => ({
    x: n.x * w + (reduced ? 0 : Math.sin(t / 2200 + n.x * 9) * 5),
    y: n.y * h + (reduced ? 0 : Math.cos(t / 2600 + n.y * 9) * 5),
  });
  const linked = (n: GraphNode): Set<string> =>
    new Set(graph.edges.flatMap(([a, b]) => (a === n.id ? [b] : b === n.id ? [a] : [])));

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('pointerleave', () => {
    mouse.x = -1;
    hover = null;
  });

  const draw = (t: number): void => {
    ctx.clearRect(0, 0, w, h);
    const points = new Map(graph.nodes.map((n) => [n.id, pos(n, t)]));

    hover = null;
    for (const n of graph.nodes) {
      const p = points.get(n.id)!;
      if (Math.hypot(p.x - mouse.x, p.y - mouse.y) < 28) {
        hover = n;
        break;
      }
    }
    canvas.style.cursor = hover ? 'pointer' : 'default';
    const related = hover ? linked(hover) : null;
    const accent = cssVar('--accent');
    const dim = cssVar('--txt-3');

    for (const [a, b] of graph.edges) {
      const pa = points.get(a)!;
      const pb = points.get(b)!;
      const lit = hover !== null && (a === hover.id || b === hover.id);
      ctx.strokeStyle = lit ? accent : dim;
      ctx.globalAlpha = lit ? 0.9 : 0.18;
      ctx.lineWidth = lit ? 1.6 : 1;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    for (const n of graph.nodes) {
      const p = points.get(n.id)!;
      const active = hover === n || related?.has(n.id);
      ctx.fillStyle = active ? accent : dim;
      ctx.beginPath();
      ctx.arc(p.x, p.y, active ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
      if (active) {
        ctx.shadowColor = accent;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.font = `${active ? 700 : 500} 12px "Space Grotesk Variable", sans-serif`;
      ctx.fillStyle = active ? accent : cssVar('--txt-2');
      ctx.textAlign = 'center';
      ctx.fillText(n.label, p.x, p.y - 12);
    }
    raf = requestAnimationFrame(draw);
  };

  new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(raf);
    if (entry.isIntersecting) raf = requestAnimationFrame(draw);
  }).observe(canvas);
}
