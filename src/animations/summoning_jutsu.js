/**
 * Summoning Jutsu: scripts grow from center outward in circular/radial pattern.
 * config: { intensity, speed }
 */

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function createRuneGlyph(cx, cy, angle, radius, size) {
  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius;
  const tangent = angle + Math.PI * 0.5;
  const normal = angle;
  return {
    stroke1: [
      { x: x - Math.cos(tangent) * size * 0.5, y: y - Math.sin(tangent) * size * 0.5 },
      { x: x + Math.cos(tangent) * size * 0.5, y: y + Math.sin(tangent) * size * 0.5 },
    ],
    stroke2: [
      { x: x - Math.cos(normal) * size * 0.3, y: y - Math.sin(normal) * size * 0.3 },
      { x: x + Math.cos(normal) * size * 0.3, y: y + Math.sin(normal) * size * 0.3 },
    ],
  };
}

export default {
  init(container, config = {}) {
    const intensity = typeof config.intensity === "number" ? clamp(config.intensity, 0.2, 1.4) : 0.9;
    const speed = typeof config.speed === "number" ? clamp(config.speed, 0.3, 2.4) : 1;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let running = false;
    let t0 = 0;
    let ringSpecs = [];
    let spokes = [];
    let runes = [];

    const regenerate = (w, h) => {
      const cx = w * 0.5;
      const cy = h * 0.54;
      const base = Math.min(w, h) * 0.12;

      ringSpecs = [
        { r: base * 1.2, width: 1.8 + intensity * 1.2, phase: rand(0, Math.PI * 2), delay: 0.16 },
        { r: base * 2.1, width: 2.2 + intensity * 1.4, phase: rand(0, Math.PI * 2), delay: 0.32 },
        { r: base * 3.1, width: 2.5 + intensity * 1.6, phase: rand(0, Math.PI * 2), delay: 0.52 },
      ];

      const spokesCount = 12;
      spokes = Array.from({ length: spokesCount }, (_, i) => {
        const angle = (i / spokesCount) * Math.PI * 2 + rand(-0.06, 0.06);
        return {
          angle,
          r0: base * 0.4,
          r1: base * 3.35,
          width: 1.6 + Math.random() * 1.8 + intensity * 0.6,
          delay: 0.08 + i * 0.04,
        };
      });

      runes = [];
      ringSpecs.forEach((ring, ringIdx) => {
        const count = 14 + ringIdx * 6;
        for (let i = 0; i < count; i += 1) {
          const a = (i / count) * Math.PI * 2 + rand(-0.08, 0.08);
          const glyph = createRuneGlyph(cx, cy, a, ring.r, 8 + ringIdx * 2 + Math.random() * 3);
          runes.push({
            ...glyph,
            delay: ring.delay + i * 0.012,
            phase: rand(0, Math.PI * 2),
          });
        }
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      regenerate(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const drawSegment = (a, b, progress) => {
      const x = a.x + (b.x - a.x) * progress;
      const y = a.y + (b.y - a.y) * progress;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const tick = (t) => {
      if (!running) return;

      const elapsed = ((t - t0) / 1000) * speed;
      const scale = window.devicePixelRatio || 1;
      const w = canvas.width / scale;
      const h = canvas.height / scale;
      const cx = w * 0.5;
      const cy = h * 0.54;
      const base = Math.min(w, h) * 0.12;

      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createRadialGradient(cx, cy, base * 0.2, cx, cy, base * 4.4);
      bg.addColorStop(0, "rgba(255,255,255,0.08)");
      bg.addColorStop(0.35, "rgba(220,220,220,0.06)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const centerPulse = 0.78 + 0.22 * Math.sin(elapsed * 2.3);
      ctx.fillStyle = `rgba(10,10,10,${0.75 + intensity * 0.15 * centerPulse})`;
      ctx.beginPath();
      ctx.arc(cx, cy, base * (0.11 + 0.03 * centerPulse), 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(14,14,14,${0.72 + intensity * 0.22})`;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      spokes.forEach((s) => {
        const p = clamp((elapsed - s.delay) * 1.2, 0, 1);
        if (p <= 0) return;
        const ease = 1 - (1 - p) ** 2;
        const sx = cx + Math.cos(s.angle) * s.r0;
        const sy = cy + Math.sin(s.angle) * s.r0;
        const ex = cx + Math.cos(s.angle) * (s.r0 + (s.r1 - s.r0) * ease);
        const ey = cy + Math.sin(s.angle) * (s.r0 + (s.r1 - s.r0) * ease);
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      });

      ringSpecs.forEach((ring, idx) => {
        const p = clamp((elapsed - ring.delay) * (1 + idx * 0.22), 0, 1);
        if (p <= 0) return;
        const sweep = Math.PI * 2 * (1 - (1 - p) ** 2);
        const start = -Math.PI / 2 + ring.phase;
        ctx.lineWidth = ring.width;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, start, start + sweep);
        ctx.stroke();
      });

      runes.forEach((g) => {
        const p = clamp((elapsed - g.delay) * 2.1, 0, 1);
        if (p <= 0) return;
        const alphaPulse = 0.78 + 0.22 * Math.sin(elapsed * 5.2 + g.phase);
        ctx.strokeStyle = `rgba(12,12,12,${(0.62 + intensity * 0.28) * alphaPulse})`;
        ctx.lineWidth = 1.2 + intensity * 0.9;
        const ease = 1 - (1 - p) ** 2;
        drawSegment(g.stroke1[0], g.stroke1[1], ease);
        if (p > 0.35) {
          drawSegment(g.stroke2[0], g.stroke2[1], clamp((p - 0.35) / 0.65, 0, 1));
        }
      });

      const vignette = ctx.createRadialGradient(cx, cy, base * 2.1, cx, cy, base * 5);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.28)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(tick);
    };

    return {
      canvas,
      ro,
      get raf() {
        return raf;
      },
      set raf(v) {
        raf = v;
      },
      get running() {
        return running;
      },
      set running(v) {
        running = v;
      },
      t0,
      _tick: tick,
      _resize: resize,
    };
  },

  play(state) {
    if (!state || state.running) return;
    state.running = true;
    state.t0 = performance.now();
    state._resize();
    state.raf = requestAnimationFrame(state._tick);
  },

  destroy(state) {
    if (!state) return;
    state.running = false;
    cancelAnimationFrame(state.raf);
    state.ro.disconnect();
    state.canvas.remove();
  },
};
