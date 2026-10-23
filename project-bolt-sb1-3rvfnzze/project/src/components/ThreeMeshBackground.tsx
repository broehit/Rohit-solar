import { useEffect, useRef } from 'react';

export default function ThreeMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const rows = 16;
    const cols = 24;
    let time = 0;

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.7 - 0.2,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '245, 158, 11' : '16, 185, 129',
    }));

    const render = () => {
      time += 0.016;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#042217');
      bgGrad.addColorStop(0.5, '#0a3325');
      bgGrad.addColorStop(1, '#051812');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const points: { x: number; y: number; z: number; glow: number }[][] = [];
      const cellW = width / (cols - 1);
      const cellH = (height * 1.1) / (rows - 1);

      const mouseNormX = (mouse.x / width - 0.5) * 2;
      const mouseNormY = (mouse.y / height - 0.5) * 2;

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * cellW;
          const baseY = r * cellH;

          const distanceToMouse = Math.hypot(baseX - mouse.x, baseY - mouse.y);
          const mouseEffect = Math.max(0, 1 - distanceToMouse / 260) * 40;

          const wave1 = Math.sin(c * 0.35 + r * 0.25 + time) * 16;
          const wave2 = Math.cos(c * 0.2 - r * 0.3 + time * 1.2) * 10;
          const z = wave1 + wave2 + mouseEffect;

          const perspective = 1 + (r / rows) * 0.35;
          const x = (baseX - width / 2) * perspective + width / 2 + mouseNormX * 12;
          const y = (baseY - height * 0.05) * perspective + mouseNormY * 8 - z * 0.35;

          const glow = Math.min(1, Math.max(0, (z + 18) / 55));
          points[r][c] = { x, y, z, glow };
        }
      }

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];

          if (c < cols - 1) {
            const nextPt = points[r][c + 1];
            const avgGlow = (pt.glow + nextPt.glow) / 2;
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 + avgGlow * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }

          if (r < rows - 1) {
            const downPt = points[r + 1][c];
            const avgGlow = (pt.glow + downPt.glow) / 2;
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.08 + avgGlow * 0.2})`;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(downPt.x, downPt.y);
            ctx.stroke();
          }

          if ((r + c) % 3 === 0) {
            const nodeSize = 1.5 + pt.glow * 2.2;
            ctx.fillStyle = pt.glow > 0.6 ? '#f59e0b' : '#10b981';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, nodeSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
