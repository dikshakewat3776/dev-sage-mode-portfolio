/**
 * Rinnegan: eye-shaped mask with animated inner ripple rings.
 * config: { color, intensity, speed }
 */

function hexToRgb(hex, fb) {
  if (typeof hex !== "string" || !hex.startsWith("#")) return fb;
  const h = hex.slice(1);
  if (h.length !== 6) return fb;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export default {
  init(container, config = {}) {
    const { r, g, b } = hexToRgb(config.color, { r: 170, g: 145, b: 220 });
    const intensity = typeof config.intensity === "number" ? clamp(config.intensity, 0.2, 1.5) : 0.9;
    const speed = typeof config.speed === "number" ? clamp(config.speed, 0.3, 2.5) : 1;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:1;";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let running = false;
    let t0 = 0;

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

    const drawEyePath = (cx, cy, eyeW, eyeH) => {
      ctx.beginPath();
      ctx.moveTo(cx - eyeW / 2, cy);
      ctx.quadraticCurveTo(cx, cy - eyeH * 0.92, cx + eyeW / 2, cy);
      ctx.quadraticCurveTo(cx, cy + eyeH * 0.78, cx - eyeW / 2, cy);
      ctx.closePath();
    };

    const draw = (t) => {
      if (!running) return;
      const elapsed = ((t - t0) / 1000) * speed;
      const scale = window.devicePixelRatio || 1;
      const w = canvas.width / scale;
      const h = canvas.height / scale;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.52;
      const eyeW = Math.min(w * 0.8, h * 2.05);
      const eyeH = eyeW * 0.34;
      const irisR = eyeH * 0.78;

      // Outer eyelid shape.
      drawEyePath(cx, cy, eyeW, eyeH);
      ctx.fillStyle = "rgba(16,12,20,0.22)";
      ctx.fill();
      ctx.strokeStyle = "rgba(22,16,28,0.95)";
      ctx.lineWidth = 3 + intensity * 1.5;
      ctx.stroke();

      // Clip all inner eye effects to almond shape.
      ctx.save();
      drawEyePath(cx, cy, eyeW * 0.96, eyeH * 0.94);
      ctx.clip();

      // Iris base gradient.
      const iris = ctx.createRadialGradient(cx, cy, irisR * 0.2, cx, cy, irisR * 1.25);
      iris.addColorStop(0, `rgba(${Math.min(255, r + 28)},${Math.min(255, g + 22)},${Math.min(255, b + 32)},${0.9})`);
      iris.addColorStop(0.55, `rgba(${r},${g},${b},${0.72 + intensity * 0.18})`);
      iris.addColorStop(1, "rgba(80,62,120,0.6)");
      ctx.fillStyle = iris;
      ctx.fillRect(cx - eyeW / 2, cy - eyeH, eyeW, eyeH * 2);

      // Moving ripple rings.
      const ringCount = 6;
      for (let i = 0; i < ringCount; i += 1) {
        const p = (elapsed * 0.55 + i * 0.18) % 1;
        const radius = irisR * (0.18 + p * 0.95);
        const alpha = (0.28 + intensity * 0.22) * (1 - p * 0.7);
        const wobbleX = Math.sin(elapsed * 1.8 + i) * 1.4;
        const wobbleY = Math.cos(elapsed * 2.1 + i * 0.8) * 1.1;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(45,30,76,${alpha})`;
        ctx.lineWidth = 1.8 + intensity * 0.8;
        ctx.arc(cx + wobbleX, cy + wobbleY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Stable hard rings like anime eye contour.
      for (let i = 1; i <= 3; i += 1) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(34,24,58,${0.52 + intensity * 0.14})`;
        ctx.lineWidth = 1.8;
        ctx.arc(cx, cy, irisR * (0.23 + i * 0.2), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Pupil + highlight.
      ctx.beginPath();
      ctx.fillStyle = "rgba(10,10,12,0.95)";
      ctx.arc(cx, cy, irisR * 0.17, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.ellipse(cx + irisR * 0.32, cy - irisR * 0.3, irisR * 0.16, irisR * 0.06, -0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Upper lid shadow for depth.
      const lidShade = ctx.createLinearGradient(cx, cy - eyeH, cx, cy);
      lidShade.addColorStop(0, "rgba(0,0,0,0.22)");
      lidShade.addColorStop(1, "rgba(0,0,0,0)");
      drawEyePath(cx, cy, eyeW * 0.98, eyeH * 0.95);
      ctx.fillStyle = lidShade;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    const state = {
      canvas,
      ctx,
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
      _draw: draw,
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
