/**
 * Crystal Style (Shoton): translucent pink crystal spikes that grow upward.
 * config: { intensity, speed }
 */

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function makeCrystal(x, w, h, intensity) {
  return {
    x,
    baseY: h + rand(-8, 14),
    height: rand(h * 0.22, h * 0.58) * (0.82 + intensity * 0.24),
    width: rand(w * 0.024, w * 0.06),
    growth: 0,
    growthSpeed: rand(0.009, 0.028) * (0.75 + intensity * 0.45),
    lean: rand(-0.24, 0.24),
    life: 1,
    phase: rand(0, Math.PI * 2),
    facet: rand(0.18, 0.42),
  };
}

export default {
  init(container, config = {}) {
    const intensity = typeof config.intensity === "number" ? clamp(config.intensity, 0.25, 1.5) : 0.9;
    const speed = typeof config.speed === "number" ? clamp(config.speed, 0.3, 2.4) : 1;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let running = false;
    let t0 = 0;
    let crystals = [];
    let spawnTimer = 0;
    let clickBurstUntil = 0;

    const spawnCrystal = (w, h, x = Math.random() * w) => {
      crystals.push(makeCrystal(x, w, h, intensity));
      if (crystals.length > 260) crystals.splice(0, crystals.length - 260);
    };

    const spawnBurst = (x, y, w, h) => {
      const n = 7 + Math.floor(intensity * 5);
      for (let i = 0; i < n; i += 1) {
        const xx = x + rand(-90, 90);
        const c = makeCrystal(xx, w, h, intensity);
        c.baseY = y + rand(40, 130);
        c.height *= rand(0.85, 1.25);
        c.growthSpeed *= 1.2;
        crystals.push(c);
      }
      clickBurstUntil = performance.now() + 380;
    };

    const onPointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      spawnBurst(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!crystals.length) {
        const seed = Math.max(18, Math.floor(w / 54));
        for (let i = 0; i < seed; i += 1) spawnCrystal(w, h);
      }
    };
    resize();

    canvas.addEventListener("pointerdown", onPointerDown);
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const drawCrystal = (c, elapsed) => {
      const growth = clamp(c.growth, 0, 1);
      const h = c.height * growth;
      const w = c.width;
      const tipX = c.x + c.lean * w;
      const tipY = c.baseY - h;

      const shimmer = 0.82 + 0.18 * Math.sin(elapsed * 2.1 + c.phase);
      const alpha = (0.34 + intensity * 0.2) * c.life * shimmer;

      const grad = ctx.createLinearGradient(c.x, c.baseY, tipX, tipY);
      grad.addColorStop(0, `rgba(146,36,95,${alpha * 0.9})`);
      grad.addColorStop(0.45, `rgba(236,72,153,${alpha})`);
      grad.addColorStop(1, `rgba(251,182,206,${alpha * 0.95})`);

      // Main body
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(c.x - w * 0.5, c.baseY);
      ctx.lineTo(c.x + w * 0.5, c.baseY);
      ctx.lineTo(tipX, tipY);
      ctx.closePath();
      ctx.fill();

      // Facet pane (semi-transparent, crystal-like)
      ctx.fillStyle = `rgba(255,245,250,${0.1 + 0.18 * growth})`;
      ctx.beginPath();
      ctx.moveTo(c.x - w * c.facet, c.baseY - h * 0.08);
      ctx.lineTo(tipX - w * 0.05, tipY + h * 0.08);
      ctx.lineTo(c.x + w * (c.facet * 0.4), c.baseY - h * 0.12);
      ctx.closePath();
      ctx.fill();

      // Edges/glow
      ctx.strokeStyle = `rgba(255,220,240,${0.52 + 0.26 * growth})`;
      ctx.lineWidth = 1.2 + intensity * 0.8;
      ctx.shadowBlur = 8 + intensity * 16;
      ctx.shadowColor = `rgba(244,114,182,${0.48 + intensity * 0.25})`;
      ctx.beginPath();
      ctx.moveTo(c.x - w * 0.5, c.baseY);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(c.x + w * 0.5, c.baseY);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const tick = (t) => {
      if (!running) return;
      const elapsed = ((t - t0) / 1000) * speed;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.fillStyle = "rgba(10,10,10,0.18)";
      ctx.fillRect(0, 0, w, h);

      // Periodic random spawn (like reference).
      spawnTimer += 1;
      const spawnEvery = Math.max(6, Math.floor(18 / speed));
      if (spawnTimer >= spawnEvery) {
        spawnTimer = 0;
        spawnCrystal(w, h);
      }

      // During burst, spawn faster.
      if (performance.now() < clickBurstUntil && Math.random() < 0.45) {
        spawnCrystal(w, h, rand(w * 0.3, w * 0.7));
      }

      for (let i = crystals.length - 1; i >= 0; i -= 1) {
        const c = crystals[i];
        if (c.growth < 1) c.growth += c.growthSpeed * speed;
        else if (Math.random() < 0.004) c.life -= 0.02;
        drawCrystal(c, elapsed);

        if (c.life <= 0 || c.growth <= 0) crystals.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    };

    return {
      canvas,
      ro,
      onPointerDown,
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
    };
  },

  play(state) {
    if (!state || state.running) return;
    state.running = true;
    state.t0 = performance.now();
    state.raf = requestAnimationFrame(state._tick);
  },

  destroy(state) {
    if (!state) return;
    state.running = false;
    cancelAnimationFrame(state.raf);
    state.canvas.removeEventListener("pointerdown", state.onPointerDown);
    state.ro.disconnect();
    state.canvas.remove();
  },
};
