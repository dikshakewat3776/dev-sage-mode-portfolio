/**
 * Chidori: recursive lightning branches around a glowing core.
 * config: { color, intensity, speed }
 */

function hexToRgb(hex) {
  if (typeof hex !== "string" || !hex.startsWith("#")) return { r: 0, g: 170, b: 255 };
  const h = hex.slice(1);
  if (h.length !== 6) return { r: 0, g: 170, b: 255 };
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export default {
  init(container, config = {}) {
    const color = hexToRgb(config.color);
    const intensity = typeof config.intensity === "number" ? config.intensity : 0.95;
    const speed = typeof config.speed === "number" ? config.speed : 1.15;

    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "1";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let running = false;
    let t0 = performance.now();
    let center = { x: 0, y: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      center = { x: w / 2, y: h / 2 };
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      center.x = e.clientX - rect.left;
      center.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const drawLightning = (x, y, length, angle, depth) => {
      if (depth <= 0) return;
      const x2 = x + Math.cos(angle) * length;
      const y2 = y + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const branches = Math.random() > 0.7 ? 2 : 1;
      for (let i = 0; i < branches; i += 1) {
        drawLightning(
          x2,
          y2,
          length * (0.58 + Math.random() * 0.32),
          angle + (Math.random() - 0.5) * (0.7 + intensity * 0.35),
          depth - 1,
        );
      }
    };

    const draw = (t) => {
      if (!running) return;
      const elapsed = (t - t0) * 0.001 * speed;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      // Leave trails for energetic persistence.
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, w, h);

      const cx = center.x || w * 0.5;
      const cy = center.y || h * 0.5;
      const radius = 34 + Math.sin(elapsed * 10) * 5;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.2);
      grad.addColorStop(0, "rgba(190,255,255,1)");
      grad.addColorStop(0.3, `rgba(${Math.min(255, color.r + 30)},${Math.min(255, color.g + 40)},255,0.92)`);
      grad.addColorStop(0.6, `rgba(${color.r},${Math.max(80, color.g - 40)},255,0.5)`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "rgba(210,255,255,1)";
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(${Math.min(220, color.r + 140)},${Math.min(240, color.g + 80)},255,0.92)`;
      ctx.lineWidth = 1.6 + intensity * 1.2;
      ctx.shadowBlur = 12 + intensity * 10;
      ctx.shadowColor = `rgba(${color.r},${color.g},255,0.84)`;

      const rays = 10 + Math.round(intensity * 4);
      for (let i = 0; i < rays; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        drawLightning(cx, cy, 76 + Math.random() * 42, angle, 4);
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    return {
      canvas,
      ctx,
      ro,
      onMouseMove,
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
    };
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
    state.canvas.removeEventListener("mousemove", state.onMouseMove);
    state.ro.disconnect();
    state.canvas.remove();
  },
};
