/**
 * Susanoo: full glowing spectral figure rising from ground.
 * config: { color (hex), intensity (glow), speed (pulse) }
 */

function hexRgb(hex, fb) {
  if (typeof hex !== "string" || !hex.startsWith("#") || hex.length !== 7) return fb;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function mkEl(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

export default {
  init(container, config = {}) {
    const { r, g, b } = hexRgb(config.color, { r: 76, g: 185, b: 255 });
    const intensity = typeof config.intensity === "number" ? config.intensity : 0.9;
    const speed = typeof config.speed === "number" ? config.speed : 1;

    const wrap = document.createElement("div");
    wrap.style.cssText =
      "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;";
    container.appendChild(wrap);

    const svg = mkEl("svg");
    svg.setAttribute("viewBox", "0 0 900 680");
    svg.style.cssText = "width:100%;height:100%;max-height:100%;overflow:visible;";
    wrap.appendChild(svg);

    const defs = mkEl("defs");
    const glowFilter = mkEl("filter");
    const filterId = "susanoo-body-glow-" + String(Math.random()).slice(2, 9);
    glowFilter.setAttribute("id", filterId);
    glowFilter.setAttribute("x", "-45%");
    glowFilter.setAttribute("y", "-45%");
    glowFilter.setAttribute("width", "190%");
    glowFilter.setAttribute("height", "190%");
    const blur = mkEl("feGaussianBlur");
    blur.setAttribute("stdDeviation", String(2 + intensity * 4));
    blur.setAttribute("result", "blur");
    const merge = mkEl("feMerge");
    const n1 = mkEl("feMergeNode");
    n1.setAttribute("in", "blur");
    const n2 = mkEl("feMergeNode");
    n2.setAttribute("in", "SourceGraphic");
    merge.append(n1, n2);
    glowFilter.append(blur, merge);
    defs.appendChild(glowFilter);
    svg.appendChild(defs);

    const core = mkEl("g");
    core.setAttribute("filter", "url(#" + filterId + ")");
    svg.appendChild(core);

    const aura = mkEl("ellipse");
    aura.setAttribute("cx", "450");
    aura.setAttribute("cy", "420");
    aura.setAttribute("rx", "240");
    aura.setAttribute("ry", "210");
    aura.setAttribute("fill", `rgba(${r},${g},${b},${0.18 + intensity * 0.18})`);
    aura.setAttribute("stroke", `rgba(${r},${g},${b},${0.72})`);
    aura.setAttribute("stroke-width", String(3 + intensity * 2));
    core.appendChild(aura);

    const body = mkEl("path");
    body.setAttribute(
      "d",
      "M 250 560 Q 280 420 345 300 Q 385 230 450 205 Q 515 230 555 300 Q 620 420 650 560 Z",
    );
    body.setAttribute("fill", `rgba(${r},${g},${b},${0.28 + intensity * 0.22})`);
    body.setAttribute("stroke", `rgba(${r},${g},${b},${0.88})`);
    body.setAttribute("stroke-width", String(4 + intensity * 2.4));
    core.appendChild(body);

    const head = mkEl("path");
    head.setAttribute(
      "d",
      "M 395 235 L 420 180 L 440 205 L 460 168 L 480 205 L 505 185 L 530 235 Q 510 268 450 270 Q 390 268 370 235 Z",
    );
    head.setAttribute("fill", `rgba(${r},${g},${b},${0.24 + intensity * 0.24})`);
    head.setAttribute("stroke", `rgba(${r},${g},${b},${0.95})`);
    head.setAttribute("stroke-width", String(3 + intensity * 1.8));
    core.appendChild(head);

    const hornL = mkEl("path");
    hornL.setAttribute("d", "M 410 188 Q 355 160 332 115 Q 390 135 425 170");
    hornL.setAttribute("fill", "none");
    hornL.setAttribute("stroke", `rgba(${r},${g},${b},${0.8})`);
    hornL.setAttribute("stroke-width", String(3 + intensity * 1.3));
    core.appendChild(hornL);

    const hornR = mkEl("path");
    hornR.setAttribute("d", "M 490 188 Q 545 160 568 115 Q 510 135 475 170");
    hornR.setAttribute("fill", "none");
    hornR.setAttribute("stroke", `rgba(${r},${g},${b},${0.8})`);
    hornR.setAttribute("stroke-width", String(3 + intensity * 1.3));
    core.appendChild(hornR);

    const eye = mkEl("circle");
    eye.setAttribute("cx", "450");
    eye.setAttribute("cy", "228");
    eye.setAttribute("r", String(6 + intensity * 2));
    eye.setAttribute("fill", `rgba(220,250,255,${0.95})`);
    core.appendChild(eye);

    const lineLayer = mkEl("g");
    lineLayer.setAttribute("fill", "none");
    lineLayer.setAttribute("stroke", `rgba(${r},${g},${b},${0.72 + intensity * 0.18})`);
    lineLayer.setAttribute("stroke-width", String(2 + intensity * 1.2));
    lineLayer.setAttribute("stroke-linecap", "round");
    lineLayer.setAttribute("opacity", "0.95");
    const lines = [
      "M 330 540 Q 360 420 395 310",
      "M 390 555 Q 425 420 440 295",
      "M 450 558 L 450 290",
      "M 510 555 Q 475 420 460 295",
      "M 570 540 Q 540 420 505 310",
      "M 305 455 Q 390 410 450 406 Q 510 410 595 455",
      "M 320 500 Q 405 452 450 450 Q 495 452 580 500",
      "M 385 255 Q 450 280 515 255",
    ];
    lines.forEach((d) => {
      const p = mkEl("path");
      p.setAttribute("d", d);
      lineLayer.appendChild(p);
    });
    core.appendChild(lineLayer);

    const armL = mkEl("path");
    armL.setAttribute("d", "M 325 350 Q 240 400 200 485 Q 255 465 305 420");
    armL.setAttribute("fill", "none");
    armL.setAttribute("stroke", `rgba(${r},${g},${b},${0.84})`);
    armL.setAttribute("stroke-width", String(8 + intensity * 3));
    armL.setAttribute("stroke-linecap", "round");
    core.appendChild(armL);

    const armR = mkEl("path");
    armR.setAttribute("d", "M 575 350 Q 660 400 700 485 Q 645 465 595 420");
    armR.setAttribute("fill", "none");
    armR.setAttribute("stroke", `rgba(${r},${g},${b},${0.84})`);
    armR.setAttribute("stroke-width", String(8 + intensity * 3));
    armR.setAttribute("stroke-linecap", "round");
    core.appendChild(armR);

    const ground = mkEl("ellipse");
    ground.setAttribute("cx", "450");
    ground.setAttribute("cy", "592");
    ground.setAttribute("rx", "250");
    ground.setAttribute("ry", "34");
    ground.setAttribute("fill", `rgba(${r},${g},${b},${0.16 + intensity * 0.1})`);
    ground.setAttribute("stroke", `rgba(${r},${g},${b},${0.55})`);
    ground.setAttribute("stroke-width", "2");
    svg.appendChild(ground);

    const flames = mkEl("g");
    flames.setAttribute("fill", "none");
    flames.setAttribute("stroke", `rgba(${r},${g},${b},${0.72})`);
    flames.setAttribute("stroke-width", String(3 + intensity * 1.6));
    flames.setAttribute("stroke-linecap", "round");
    const flameData = [
      { d: "M 260 550 Q 235 510 250 470 Q 280 430 300 375", phase: 0.2 },
      { d: "M 640 550 Q 665 510 650 470 Q 620 430 600 375", phase: 0.6 },
      { d: "M 355 250 Q 320 210 336 170 Q 360 140 372 105", phase: 1.1 },
      { d: "M 545 250 Q 580 210 564 170 Q 540 140 528 105", phase: 1.5 },
      { d: "M 448 188 Q 430 150 442 110 Q 456 80 450 48", phase: 2.1 },
    ];
    flameData.forEach((f) => {
      const p = mkEl("path");
      p.setAttribute("d", f.d);
      p.dataset.phase = String(f.phase);
      flames.appendChild(p);
    });
    core.appendChild(flames);

    let raf = 0;
    let running = false;
    let t0 = 0;

    const ro = new ResizeObserver(() => {});
    ro.observe(container);

    const pulse = (t) => {
      if (!running) return;
      const elapsed = ((t - t0) / 1000) * speed;
      const rise = Math.min(1, elapsed / 1.25);
      const riseEase = 1 - (1 - rise) ** 3;
      const yOffset = (1 - riseEase) * 260;

      core.setAttribute("transform", `translate(0 ${yOffset})`);
      core.setAttribute("opacity", String(0.2 + 0.78 * riseEase));

      const glowPulse = 0.9 + 0.1 * Math.sin(elapsed * 2.6);
      aura.setAttribute("rx", String((240 + 18 * Math.sin(elapsed * 1.8)) * (0.9 + 0.1 * riseEase)));
      aura.setAttribute("ry", String((210 + 12 * Math.cos(elapsed * 1.6)) * (0.9 + 0.1 * riseEase)));
      aura.setAttribute("fill", `rgba(${r},${g},${b},${(0.16 + intensity * 0.18) * glowPulse})`);

      eye.setAttribute("r", String((6 + intensity * 2) * (0.88 + 0.22 * Math.sin(elapsed * 5.2))));
      lineLayer.setAttribute("opacity", String(0.78 + 0.2 * Math.sin(elapsed * 3.4)));

      Array.from(flames.children).forEach((node) => {
        const p = node;
        const phase = Number(p.dataset.phase || 0);
        const wobble = 0.86 + 0.22 * Math.sin(elapsed * 4 + phase);
        p.setAttribute("stroke-width", String((3 + intensity * 1.6) * wobble));
        p.setAttribute("opacity", String(0.58 + 0.36 * Math.sin(elapsed * 3.1 + phase)));
      });

      ground.setAttribute("ry", String(30 + 8 * riseEase + 3 * Math.sin(elapsed * 2.3)));
      ground.setAttribute("opacity", String(0.46 + 0.38 * riseEase));

      raf = requestAnimationFrame(pulse);
    };

    return {
      wrap,
      svg,
      core,
      lineLayer,
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
      _pulse: pulse,
    };
  },

  play(state) {
    if (!state || state.running) return;
    state.running = true;
    state.t0 = performance.now();
    state.raf = requestAnimationFrame(state._pulse);
  },

  destroy(state) {
    if (!state) return;
    state.running = false;
    cancelAnimationFrame(state.raf);
    state.ro.disconnect();
    state.wrap.remove();
  },
};
