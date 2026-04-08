/**
 * Kurama-style chakra cloak: warm aura + flame tongues + embers.
 * Contract: init(container, config) -> state, play(state), destroy(state)
 */

function parseColor(hex, fallback) {
  if (typeof hex !== "string" || !hex.startsWith("#")) return fallback;
  const h = hex.slice(1);
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if ([r, g, b].some(Number.isNaN)) return fallback;
    return { r, g, b };
  }
  return fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default {
  init(container, config = {}) {
    const intensity = typeof config.intensity === "number" ? clamp(config.intensity, 0.2, 1.4) : 0.8;
    const speed = typeof config.speed === "number" ? config.speed : 1;
    const { r, g, b } = parseColor(config.color, { r: 251, g: 191, b: 36 });

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = String(0.62 + intensity * 0.28);
    canvas.style.mixBlendMode = "screen";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let raf = 0;
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

    const flames = Array.from({ length: 22 }, (_, i) => ({
      angle: (i / 22) * Math.PI * 2,
      spread: 0.14 + Math.random() * 0.26,
      height: 0.13 + Math.random() * 0.22,
      width: 0.02 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
      jitter: 0.45 + Math.random() * 0.8,
    }));

    const embers = Array.from({ length: 52 }, () => ({
      x: Math.random(),
      y: 0.35 + Math.random() * 0.65,
      vy: 18 + Math.random() * 52,
      drift: -24 + Math.random() * 48,
      size: 0.6 + Math.random() * 2.4,
      phase: Math.random() * Math.PI * 2,
      life: Math.random(),
    }));

    const state = {
      canvas,
      ctx,
      raf,
      running: false,
      r,
      g,
      b,
      speed,
      intensity,
      resize,
      ro,
      flames,
      embers,
      t0,
    };

    const draw = (t) => {
      if (!state.running) return;
      const elapsed = (t - state.t0) * 0.001 * state.speed;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.56;
      const base = Math.min(w, h) * (0.3 + state.intensity * 0.14);

      // Deep warm bloom behind the subject.
      const bg = ctx.createRadialGradient(cx, cy, base * 0.1, cx, cy, base * 2.2);
      bg.addColorStop(0, `rgba(${state.r},${state.g},${state.b},${0.22 + state.intensity * 0.18})`);
      bg.addColorStop(0.35, `rgba(245,158,11,${0.12 + state.intensity * 0.16})`);
      bg.addColorStop(0.72, "rgba(251,146,60,0.08)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Pulsing chakra rings.
      for (let i = 0; i < 5; i += 1) {
        const phase = elapsed * 1.6 + i * 0.92;
        const radius = base * (0.62 + 0.14 * i + 0.05 * Math.sin(phase));
        const alpha = (0.16 + state.intensity * 0.17) * (0.66 + 0.34 * Math.sin(phase));
        const ring = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
        ring.addColorStop(0, `rgba(${state.r},${state.g},${state.b},${alpha})`);
        ring.addColorStop(0.55, `rgba(251,146,60,${alpha * 0.75})`);
        ring.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = ring;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Flame tongues around the cloak edge.
      state.flames.forEach((f, i) => {
        const p = elapsed * (1.8 + f.jitter);
        const ringR = base * (0.95 + f.spread + Math.sin(p + f.phase) * 0.05);
        const flameH = base * f.height * (0.78 + 0.35 * Math.sin(p * 1.8));
        const flameW = base * f.width * (0.85 + 0.4 * Math.cos(p * 1.4 + i));
        const a = f.angle + Math.sin(p * 0.8 + f.phase) * 0.18;
        const x = cx + Math.cos(a) * ringR;
        const y = cy + Math.sin(a) * ringR;
        const tipX = cx + Math.cos(a) * (ringR + flameH);
        const tipY = cy + Math.sin(a) * (ringR + flameH);

        const grad = ctx.createLinearGradient(x, y, tipX, tipY);
        grad.addColorStop(0, `rgba(255,220,120,${0.5 + state.intensity * 0.26})`);
        grad.addColorStop(0.5, `rgba(${state.r},${state.g},${state.b},${0.3 + state.intensity * 0.3})`);
        grad.addColorStop(1, "rgba(245,158,11,0)");
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a + Math.PI * 0.5) * flameW, y + Math.sin(a + Math.PI * 0.5) * flameW);
        ctx.quadraticCurveTo(
          x + Math.cos(a + Math.PI * 0.9) * flameW * 1.8,
          y + Math.sin(a + Math.PI * 0.9) * flameW * 1.8,
          tipX,
          tipY,
        );
        ctx.quadraticCurveTo(
          x + Math.cos(a - Math.PI * 0.9) * flameW * 1.8,
          y + Math.sin(a - Math.PI * 0.9) * flameW * 1.8,
          x + Math.cos(a - Math.PI * 0.5) * flameW,
          y + Math.sin(a - Math.PI * 0.5) * flameW,
        );
        ctx.closePath();
        ctx.fill();
      });

      // Floating ember particles.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      state.embers.forEach((e) => {
        e.life += 0.012 * state.speed;
        if (e.life >= 1) {
          e.life -= 1;
          e.x = Math.random();
          e.y = 0.58 + Math.random() * 0.42;
        }
        const x = e.x * w + Math.sin(elapsed * 2 + e.phase) * e.drift * 0.12;
        const y = (e.y * h - e.life * e.vy * 1.8 + h) % h;
        const pulse = 0.6 + 0.4 * Math.sin(elapsed * 6 + e.phase);
        const alpha = (1 - e.life) * (0.25 + state.intensity * 0.35) * pulse;
        ctx.fillStyle = `rgba(255,191,80,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, e.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      state.raf = requestAnimationFrame(draw);
    };

    state._draw = draw;
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
