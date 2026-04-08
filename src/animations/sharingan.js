/**
 * Sharingan: rotating iris ring + moving tomoe.
 * config: { intensity (0-1), speed }
 */

export default {
  init(container, config = {}) {
    const intensity = typeof config.intensity === "number" ? config.intensity : 0.9;
    const speed = typeof config.speed === "number" ? config.speed : 1;

    const wrap = document.createElement("div");
    wrap.style.cssText =
      "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;";
    container.appendChild(wrap);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.cssText = "width:100%;height:100%;min-height:220px;overflow:visible;";
    wrap.appendChild(svg);

    const cx = 200;
    const cy = 200;
    svg.setAttribute("viewBox", "0 0 400 400");

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const grad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    grad.setAttribute("id", "sharingan-iris");
    const s0 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    s0.setAttribute("offset", "0%");
    s0.setAttribute("stop-color", "#fecaca");
    const s1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    s1.setAttribute("offset", "45%");
    s1.setAttribute("stop-color", "#dc2626");
    const s2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    s2.setAttribute("offset", "100%");
    s2.setAttribute("stop-color", "#7f1d1d");
    grad.append(s0, s1, s2);
    defs.appendChild(grad);
    svg.appendChild(defs);

    const outer = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    outer.setAttribute("cx", String(cx));
    outer.setAttribute("cy", String(cy));
    outer.setAttribute("r", "132");
    outer.setAttribute("fill", "url(#sharingan-iris)");
    outer.setAttribute("stroke", "#0a0a0a");
    outer.setAttribute("stroke-width", "5");
    svg.appendChild(outer);

    const ringOrbit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ringOrbit.setAttribute("cx", String(cx));
    ringOrbit.setAttribute("cy", String(cy));
    ringOrbit.setAttribute("r", "82");
    ringOrbit.setAttribute("fill", "none");
    ringOrbit.setAttribute("stroke", "#0b0b0c");
    ringOrbit.setAttribute("stroke-width", String(3.5 + intensity * 1.8));
    ringOrbit.setAttribute("opacity", String(0.85 + intensity * 0.12));
    svg.appendChild(ringOrbit);

    const pupil = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pupil.setAttribute("cx", String(cx));
    pupil.setAttribute("cy", String(cy));
    pupil.setAttribute("r", "18");
    pupil.setAttribute("fill", "#0c0a09");
    svg.appendChild(pupil);

    const gTomoe = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gTomoe.setAttribute("transform", `translate(${cx} ${cy})`);
    svg.appendChild(gTomoe);

    const tomoePaths = [];
    for (let i = 0; i < 3; i += 1) {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute(
        "d",
        "M 0,-52 Q 18,-38 14,-12 Q 10,8 -8,4 Q -22,-8 -6,-32 Q 2,-48 0,-52 Z",
      );
      p.setAttribute("fill", "#09090b");
      p.setAttribute("stroke", "#18181b");
      p.setAttribute("stroke-width", "0.8");
      p.setAttribute("transform", `rotate(${i * 120})`);
      p.style.opacity = "0";
      gTomoe.appendChild(p);
      tomoePaths.push(p);
    }

    const ringMarkers = [];
    for (let i = 0; i < 3; i += 1) {
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("r", String(7 + intensity * 1.8));
      dot.setAttribute("fill", "#0a0a0a");
      dot.setAttribute("stroke", "#1a1a1a");
      dot.setAttribute("stroke-width", "1");
      svg.appendChild(dot);
      ringMarkers.push(dot);
    }

    let raf = 0;
    let running = false;
    let t0 = 0;

    const ro = new ResizeObserver(() => {
      /* viewBox fixed; optional scale */
    });
    ro.observe(container);

    const tick = (t) => {
      if (!running) return;
      const elapsed = ((t - t0) / 1000) * speed;
      const spinIn = Math.min(1, elapsed * 1.6);
      const ease = 1 - (1 - spinIn) ** 3;
      const orbitRadius = 82 + 4 * Math.sin(elapsed * 1.7);
      const tomoeAngle = 120 * elapsed + (1 - ease) * 420;
      gTomoe.setAttribute("transform", `translate(${cx} ${cy}) rotate(${tomoeAngle})`);
      tomoePaths.forEach((el, i) => {
        const stagger = Math.max(0, Math.min(1, (ease - i * 0.1) / 0.4));
        el.style.opacity = String(Math.max(0.38, stagger));
      });

      ringMarkers.forEach((dot, i) => {
        const a = elapsed * 1.9 + i * (Math.PI * 2) / 3;
        const x = cx + Math.cos(a) * orbitRadius;
        const y = cy + Math.sin(a) * orbitRadius;
        dot.setAttribute("cx", String(x));
        dot.setAttribute("cy", String(y));
      });

      ringOrbit.setAttribute(
        "stroke-width",
        String((3.5 + intensity * 1.8) * (0.92 + 0.08 * Math.sin(elapsed * 3))),
      );
      ringOrbit.setAttribute("r", String(82 + Math.sin(elapsed * 2.2) * 2.5));

      const pulse = 0.88 + 0.12 * Math.sin(elapsed * 2.8);
      s1.setAttribute("stop-color", pulse > 0.95 ? "#ef4444" : "#dc2626");
      outer.setAttribute("fill", ease > 0.2 ? "url(#sharingan-iris)" : "#dc2626");
      outer.setAttribute("opacity", String(0.9 + intensity * 0.1 * pulse));
      raf = requestAnimationFrame(tick);
    };

    return {
      wrap,
      svg,
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
      tomoePaths,
      ringMarkers,
      ringOrbit,
      gTomoe,
      cx,
      cy,
      outer,
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
    state.ro.disconnect();
    state.wrap.remove();
  },
};
