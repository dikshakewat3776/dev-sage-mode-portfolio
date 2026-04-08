/**
 * Spiraling particle shell — reads color/intensity/speed from animation_config.
 */

function hexToRgb(hex) {
  if (typeof hex !== "string" || !hex.startsWith("#")) return { r: 56, g: 189, b: 248 };
  const h = hex.slice(1);
  if (h.length !== 6) return { r: 56, g: 189, b: 248 };
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export default {
  init(container, config = {}) {
    const color = hexToRgb(config.color);
    const intensity = typeof config.intensity === "number" ? config.intensity : 0.9;
    const speed = typeof config.speed === "number" ? config.speed : 1;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "1";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const particles = Array.from({ length: 420 }, (_, i) => ({
      a: (i / 420) * Math.PI * 2,
      r: 40 + (i % 7) * 14 + Math.random() * 30,
      w: 0.4 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let running = false;
    let t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const draw = (t) => {
      if (!running) return;
      const elapsed = (t - t0) * 0.001 * speed;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const spin = elapsed * 2.4;

      particles.forEach((p) => {
        const rr = p.r * (0.92 + 0.08 * Math.sin(elapsed * 2 + p.phase));
        const x = cx + Math.cos(p.a + spin * p.w) * rr;
        const y = cy + Math.sin(p.a + spin * p.w) * rr * 0.92;
        const alpha = 0.35 + intensity * 0.55 * (0.55 + 0.45 * Math.sin(elapsed * 3 + p.phase));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
        ctx.arc(x, y, 1.6 + intensity * 2.4, 0, Math.PI * 2);
        ctx.fill();
      });

      const coreR = 36 + Math.sin(elapsed * 4) * 6;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3);
      g.addColorStop(0, `rgba(255,255,255,${0.35 + intensity * 0.35})`);
      g.addColorStop(0.35, `rgba(${color.r},${color.g},${color.b},${0.45 + intensity * 0.4})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    const state = {
      canvas,
      ctx,
      ro,
      particles,
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
      _draw: draw,
      color,
      intensity,
      speed,
    };
    return state;
  },

  play(state) {
    if (!state || state.running) return;
    state.running = true;
    state.t0 = performance.now();
    state.raf = requestAnimationFrame(state._draw);
  },

  destroy(state) {
    if (!state) return;
    state.running = false;
    cancelAnimationFrame(state.raf);
    state.ro.disconnect();
    state.canvas.remove();
  },
};
