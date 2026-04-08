/**
 * Amaterasu: black-red inferno with pointer-triggered flame bursts.
 * config: { intensity, speed }
 */

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export default {
  init(container, config = {}) {
    const intensity = typeof config.intensity === "number" ? config.intensity : 0.95;
    const speed = typeof config.speed === "number" ? config.speed : 1;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:1;";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const ambient = Array.from({ length: 16 }, () => ({
      x: rand(0.08, 0.92),
      y: rand(0.6, 0.95),
      r: rand(18, 42),
      life: rand(0.3, 1),
      drift: rand(-0.25, 0.25),
      phase: rand(0, Math.PI * 2),
    }));

    const flames = [];
    let raf = 0;
    let running = false;
    let t0 = 0;

    const spawnFlame = (x, y, amount = 4) => {
      for (let i = 0; i < amount; i += 1) {
        flames.push({
          x: x + rand(-10, 10),
          y: y + rand(-6, 6),
          size: rand(8, 24) * (0.8 + intensity * 0.45),
          life: 1,
          vx: rand(-1.1, 1.1) * (0.7 + speed * 0.45),
          vy: rand(-2.2, -0.8) * (0.7 + speed * 0.5),
        });
      }
      if (flames.length > 550) flames.splice(0, flames.length - 550);
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      spawnFlame(e.clientX - rect.left, e.clientY - rect.top, 5);
    };

    const onTouchMove = (e) => {
      const touch = e.touches?.[0];
      if (!touch) return;
      const rect = container.getBoundingClientRect();
      if (
        touch.clientX < rect.left ||
        touch.clientX > rect.right ||
        touch.clientY < rect.top ||
        touch.clientY > rect.bottom
      ) {
        return;
      }
      spawnFlame(touch.clientX - rect.left, touch.clientY - rect.top, 6);
    };

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

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const drawBackdrop = (w, h, elapsed) => {
      const pulse = 0.16 + Math.sin(elapsed * 1.6) * 0.04;
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.58, 8, w * 0.5, h * 0.58, Math.max(w, h) * 0.86);
      bg.addColorStop(0, `rgba(22,6,6,${0.5 + pulse})`);
      bg.addColorStop(0.35, "rgba(10,3,4,0.74)");
      bg.addColorStop(1, "rgba(0,0,0,0.94)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const ember = ctx.createLinearGradient(0, h * 0.95, 0, h * 0.2);
      ember.addColorStop(0, `rgba(255,80,18,${0.18 + intensity * 0.16})`);
      ember.addColorStop(0.45, `rgba(150,24,8,${0.12 + intensity * 0.08})`);
      ember.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ember;
      ctx.fillRect(0, 0, w, h);
    };

    const drawAmbient = (w, h, elapsed) => {
      ambient.forEach((a, i) => {
        const y = a.y * h + Math.sin(elapsed * 0.9 + a.phase) * 12;
        const x = a.x * w + Math.cos(elapsed * 1.1 + i) * 10 + a.drift * elapsed * 18;
        const len = a.r * (1.2 + 0.25 * Math.sin(elapsed * 1.7 + a.phase));
        const width = a.r * 0.22;
        const tipX = x + Math.sin(elapsed * 1.6 + a.phase) * 14;
        const tipY = y - len;
        const glow = ctx.createLinearGradient(x, y, tipX, tipY);
        glow.addColorStop(0, `rgba(0,0,0,${0.8 * a.life})`);
        glow.addColorStop(0.58, `rgba(28,0,0,${0.52 * a.life})`);
        glow.addColorStop(1, `rgba(255,40,0,${0.24 + intensity * 0.18 * a.life})`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.moveTo(x - width, y);
        ctx.quadraticCurveTo(x - width * 1.2, y - len * 0.45, tipX, tipY);
        ctx.quadraticCurveTo(x + width * 1.2, y - len * 0.45, x + width, y);
        ctx.closePath();
        ctx.fill();
      });
    };

    const drawFlameParticle = (f) => {
      const angle = Math.atan2(f.vy, f.vx);
      const h = f.size * 1.85;
      const w = f.size * 0.72;
      const tipX = f.x + Math.cos(angle - Math.PI / 2) * h;
      const tipY = f.y + Math.sin(angle - Math.PI / 2) * h;

      const grad = ctx.createLinearGradient(f.x, f.y, tipX, tipY);
      grad.addColorStop(0, `rgba(0,0,0,${0.98 * f.life})`);
      grad.addColorStop(0.55, `rgba(26,0,0,${0.86 * f.life})`);
      grad.addColorStop(1, `rgba(255,0,0,${0.76 * f.life})`);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(f.x - w, f.y + w * 0.18);
      ctx.quadraticCurveTo(f.x - w * 1.2, f.y - h * 0.35, tipX, tipY);
      ctx.quadraticCurveTo(f.x + w * 1.1, f.y - h * 0.32, f.x + w, f.y + w * 0.18);
      ctx.quadraticCurveTo(f.x, f.y + h * 0.18, f.x - w, f.y + w * 0.18);
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.shadowBlur = 12 + intensity * 24;
      ctx.shadowColor = `rgba(255,24,0,${0.32 + intensity * 0.4})`;
      ctx.strokeStyle = `rgba(255,48,0,${0.42 * f.life})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(f.x - w * 0.62, f.y);
      ctx.quadraticCurveTo(f.x, f.y - h * 0.62, tipX, tipY);
      ctx.quadraticCurveTo(f.x + w * 0.62, f.y, f.x + w * 0.62, f.y + w * 0.08);
      ctx.stroke();
      ctx.restore();
    };

    const draw = (t) => {
      if (!running) return;
      const elapsed = ((t - t0) / 1000) * speed;
      const scale = window.devicePixelRatio || 1;
      const w = canvas.width / scale;
      const h = canvas.height / scale;
      ctx.clearRect(0, 0, w, h);

      drawBackdrop(w, h, elapsed);
      drawAmbient(w, h, elapsed);

      // Keep subtle activity when not hovering.
      if (Math.random() < 0.12) {
        spawnFlame(rand(w * 0.15, w * 0.85), rand(h * 0.58, h * 0.92), 1);
      }

      for (let i = flames.length - 1; i >= 0; i -= 1) {
        const f = flames[i];
        f.x += f.vx;
        f.y += f.vy;
        f.life -= 0.02 * (0.85 + speed * 0.45);
        f.size *= 0.972;
        drawFlameParticle(f);
        if (f.life <= 0 || f.size < 0.45) flames.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    return {
      canvas,
      ctx,
      ro,
      onPointerMove,
      onTouchMove,
      flames,
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
    window.removeEventListener("mousemove", state.onPointerMove);
    window.removeEventListener("touchmove", state.onTouchMove);
    state.ro.disconnect();
    state.canvas.remove();
  },
};
