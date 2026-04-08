/**
 * Shadow Clone: white smoke burst + blurred "clone" silhouettes in the background.
 * config: { intensity, speed }
 */

export default {
  init(container, config = {}) {
    const intensity = typeof config.intensity === "number" ? config.intensity : 0.85;
    const speed = typeof config.speed === "number" ? config.speed : 1;

    const root = document.createElement("div");
    root.style.cssText = "position:absolute;inset:0;overflow:hidden;pointer-events:none;";
    container.appendChild(root);

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    root.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const clones = [];
    const cloneCount = 4;
    for (let i = 0; i < cloneCount; i += 1) {
      const d = document.createElement("div");
      d.style.cssText = [
        "position:absolute",
        "width:42%",
        "height:28%",
        "left:50%",
        "top:42%",
        "transform:translate(-50%,-50%)",
        "border-radius:1.25rem",
        "background:linear-gradient(135deg,rgba(255,255,255,0.25),rgba(148,163,184,0.15))",
        "filter:blur(10px)",
        "opacity:0",
        "pointer-events:none",
        "mix-blend-mode:screen",
      ].join(";");
      const ox = (Math.random() - 0.5) * 28;
      const oy = (Math.random() - 0.5) * 18;
      const rot = (Math.random() - 0.5) * 8;
      d.dataset.ox = String(ox);
      d.dataset.oy = String(oy);
      d.dataset.rot = String(rot);
      root.appendChild(d);
      clones.push(d);
    }

    const particles = Array.from({ length: 140 }, () => ({
      x: 0.5,
      y: 0.45,
      vx: (Math.random() - 0.5) * 2.2,
      vy: (Math.random() - 0.5) * 2.2 - 0.8,
      life: 0,
      max: 0.6 + Math.random() * 0.5,
      s: 2 + Math.random() * 5 * intensity,
    }));

    let raf = 0;
    let running = false;
    let t0 = 0;
    let lastT = performance.now();

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
      const dt = Math.min(0.045, (t - lastT) / 1000) * speed;
      lastT = t;
      const elapsed = ((t - t0) / 1000) * speed;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.life += dt * 1.8;
        p.x += p.vx * dt * 0.45;
        p.y += p.vy * dt * 0.45;
        p.vy += 0.35 * dt;
        const a = Math.max(0, 1 - p.life / p.max) * (0.55 + intensity * 0.45);
        if (a <= 0) return;
        ctx.beginPath();
        ctx.fillStyle = `rgba(250,250,250,${a})`;
        ctx.arc(p.x * w, p.y * h, p.s, 0, Math.PI * 2);
        ctx.fill();
      });

      const poofPhase = Math.min(1, elapsed * 2);
      clones.forEach((d, i) => {
        const stagger = Math.max(0, Math.min(1, (poofPhase - i * 0.08) / 0.5));
        const ox = Number(d.dataset.ox);
        const oy = Number(d.dataset.oy);
        const rot = Number(d.dataset.rot);
        d.style.opacity = String(0.35 + stagger * 0.45 * intensity);
        d.style.transform = `translate(calc(-50% + ${ox * stagger}%), calc(-50% + ${oy * stagger}%)) rotate(${rot * stagger}deg) scale(${0.92 + stagger * 0.12})`;
      });

      raf = requestAnimationFrame(draw);
    };

    const state = {
      root,
      canvas,
      ctx,
      ro,
      clones,
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
      get lastT() {
        return lastT;
      },
      set lastT(v) {
        lastT = v;
      },
      _draw: draw,
      speed,
    };
    return state;
  },

  play(state) {
    if (!state || state.running) return;
    state.running = true;
    state.t0 = performance.now();
    state.lastT = performance.now();
    state.particles.forEach((p) => {
      p.x = 0.5 + (Math.random() - 0.5) * 0.04;
      p.y = 0.45 + (Math.random() - 0.5) * 0.04;
      p.vx = (Math.random() - 0.5) * 2.4;
      p.vy = (Math.random() - 0.5) * 2.2 - 0.9;
      p.life = 0;
    });
    state.raf = requestAnimationFrame(state._draw);
  },

  destroy(state) {
    if (!state) return;
    state.running = false;
    cancelAnimationFrame(state.raf);
    state.ro.disconnect();
    state.root.remove();
  },
};
