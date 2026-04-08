/**
 * Mokuton (Wood Style): carved wood totems with moving crown flames.
 * config: { color (hex), intensity, speed }
 */

function parseHex(hex, fallback) {
  if (typeof hex !== "string" || !hex.startsWith("#") || hex.length !== 7) return fallback;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function buildPillars(w, h, intensity) {
  const rows = [0.62, 0.76, 0.9];
  const pillars = [];
  rows.forEach((rowDepth, rIdx) => {
    const count = rIdx === 2 ? 2 : 3;
    for (let i = 0; i < count; i += 1) {
      const spread = (i + 0.5) / count;
      pillars.push({
        depth: rowDepth + rand(-0.035, 0.035),
        x: spread + rand(-0.11, 0.11),
        width: w * rand(0.09, 0.14) * (1.14 - rowDepth * 0.35),
        height: h * rand(0.34, 0.58) * (1.2 - rowDepth * 0.28) * (0.9 + intensity * 0.15),
        phase: rand(0, Math.PI * 2),
      });
    }
  });
  pillars.sort((a, b) => a.depth - b.depth);
  return pillars;
}

export default {
  init(container, config = {}) {
    const tone = parseHex(config.color, { r: 120, g: 74, b: 44 });
    const intensity = typeof config.intensity === "number" ? config.intensity : 0.9;
    const speed = typeof config.speed === "number" ? config.speed : 1;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let running = false;
    let t0 = 0;
    let pillars = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pillars = buildPillars(w, h, intensity);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const drawFlame = (x, y, size, elapsed, seed) => {
      const flick = 0.72 + 0.28 * Math.sin(elapsed * 8 + seed);
      const flameH = size * (1.5 + 0.35 * flick);
      const flameW = size * (0.82 + 0.15 * Math.sin(elapsed * 5 + seed));
      const grad = ctx.createLinearGradient(x, y, x, y - flameH);
      grad.addColorStop(0, `rgba(255,146,58,${0.65 + intensity * 0.25})`);
      grad.addColorStop(0.5, `rgba(255,188,92,${0.62 + intensity * 0.24})`);
      grad.addColorStop(1, "rgba(255,232,165,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(x - flameW * 0.5, y);
      ctx.quadraticCurveTo(x - flameW, y - flameH * 0.45, x, y - flameH);
      ctx.quadraticCurveTo(x + flameW, y - flameH * 0.45, x + flameW * 0.5, y);
      ctx.closePath();
      ctx.fill();
    };

    const drawTotemFace = (x, top, width, height) => {
      const eyeY = top + height * 0.08;
      const eyeDX = width * 0.16;
      ctx.fillStyle = "rgba(32,18,12,0.75)";
      ctx.beginPath();
      ctx.arc(x - eyeDX, eyeY, width * 0.03, 0, Math.PI * 2);
      ctx.arc(x + eyeDX, eyeY, width * 0.03, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(30,20,14,0.55)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x - width * 0.28, top + height * 0.16);
      ctx.lineTo(x + width * 0.28, top + height * 0.16);
      ctx.moveTo(x - width * 0.26, top + height * 0.22);
      ctx.lineTo(x + width * 0.26, top + height * 0.22);
      ctx.stroke();
    };

    const drawPillar = (pillar, elapsed, w, h) => {
      const cx = pillar.x * w;
      const foot = h * pillar.depth;
      const pH = pillar.height * (0.95 + 0.05 * Math.sin(elapsed * 1.1 + pillar.phase));
      const pW = pillar.width;
      const top = foot - pH;
      const left = cx - pW * 0.5;
      const right = cx + pW * 0.5;

      const body = ctx.createLinearGradient(left, top, right, foot);
      body.addColorStop(0, `rgba(${tone.r + 18},${tone.g + 10},${tone.b + 6},0.94)`);
      body.addColorStop(0.5, `rgba(${tone.r},${tone.g},${tone.b},0.96)`);
      body.addColorStop(1, `rgba(${Math.max(0, tone.r - 25)},${Math.max(0, tone.g - 20)},${Math.max(0, tone.b - 16)},0.98)`);
      ctx.fillStyle = body;
      ctx.fillRect(left, top, pW, pH);

      ctx.fillStyle = "rgba(60,34,21,0.35)";
      ctx.beginPath();
      ctx.moveTo(right, top);
      ctx.lineTo(right + pW * 0.14, top + pH * 0.05);
      ctx.lineTo(right + pW * 0.14, foot + pH * 0.02);
      ctx.lineTo(right, foot);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = `rgba(${tone.r + 10},${tone.g + 8},${tone.b + 4},0.96)`;
      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(left + pW * 0.18, top - pH * 0.1);
      ctx.lineTo(cx - pW * 0.07, top - pH * 0.02);
      ctx.lineTo(cx, top - pH * 0.11);
      ctx.lineTo(cx + pW * 0.07, top - pH * 0.02);
      ctx.lineTo(right - pW * 0.18, top - pH * 0.1);
      ctx.lineTo(right, top);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(28,16,10,0.45)";
      ctx.lineWidth = 1.2 + intensity * 1.2;
      ctx.beginPath();
      ctx.moveTo(left + pW * 0.2, foot - pH * 0.18);
      ctx.quadraticCurveTo(cx, foot - pH * 0.62, right - pW * 0.18, foot - pH * 0.9);
      ctx.moveTo(left + pW * 0.34, foot - pH * 0.44);
      ctx.quadraticCurveTo(cx + pW * 0.03, foot - pH * 0.7, right - pW * 0.34, foot - pH * 0.92);
      ctx.stroke();

      drawTotemFace(cx, top, pW, pH);

      const flameBaseY = top - pH * 0.07;
      drawFlame(cx, flameBaseY, pW * 0.17, elapsed, pillar.phase);
      drawFlame(cx - pW * 0.12, flameBaseY + 2, pW * 0.1, elapsed, pillar.phase + 1.2);
      drawFlame(cx + pW * 0.12, flameBaseY + 2, pW * 0.1, elapsed, pillar.phase + 2.1);
    };

    const tick = (t) => {
      if (!running) return;
      const elapsed = ((t - t0) / 1000) * speed;
      const scale = window.devicePixelRatio || 1;
      const w = canvas.width / scale;
      const h = canvas.height / scale;
      ctx.clearRect(0, 0, w, h);

      const haze = ctx.createRadialGradient(w * 0.5, h * 0.6, h * 0.06, w * 0.5, h * 0.6, h * 0.95);
      haze.addColorStop(0, "rgba(255,170,88,0.14)");
      haze.addColorStop(0.55, "rgba(245,158,11,0.06)");
      haze.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      pillars.forEach((p) => drawPillar(p, elapsed, w, h));

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
