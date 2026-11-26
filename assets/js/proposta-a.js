/* Proposta A — animações por rolagem (GSAP + ScrollTrigger, locais).
   Princípios: o scroll comanda (scrub), só transform/opacity/stroke/clip-path,
   e movimento reduzido mostra tudo pronto, sem fixações nem rolagem lateral. */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function rng(seed) {
    return function () {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
  }

  /* ---------------- Topo e menu ---------------- */
  function initTop() {
    var top = document.querySelector(".top");
    var btn = document.querySelector(".top__menu");
    var sheet = document.getElementById("menu-a");
    var lastY = 0;
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        top.classList.toggle("is-solid", y > 10);
        if (!sheet.classList.contains("is-open")) {
          if (y > 400 && y - lastY > 6) top.classList.add("is-hidden");
          else if (lastY - y > 6 || y < 100) top.classList.remove("is-hidden");
        }
        lastY = y;
      },
      { passive: true }
    );
    function setOpen(open) {
      if (open) sheet.hidden = false;
      requestAnimationFrame(function () {
        sheet.classList.toggle("is-open", open);
      });
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Fechar" : "Menu";
      if (!open) setTimeout(function () { if (!sheet.classList.contains("is-open")) sheet.hidden = true; }, 180);
    }
    btn.addEventListener("click", function () {
      setOpen(!sheet.classList.contains("is-open"));
    });
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sheet.classList.contains("is-open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  /* ---------------- Ilustrações ----------------
     Cada função monta o SVG e devolve uma timeline pausada que vai do
     estado "antes" ao "depois". O scroll a percorre. */

  // Memória: pontos soltos se ligam numa constelação; três deles "lembram".
  function artMemory(svg) {
    var r = rng(11);
    var pts = [];
    while (pts.length < 15) {
      var a = r() * Math.PI * 2;
      var d = Math.sqrt(r()) * 160;
      var p = [200 + Math.cos(a) * d, 200 + Math.sin(a) * d * 0.9];
      if (pts.every(function (q) { return Math.hypot(q[0] - p[0], q[1] - p[1]) > 52; })) pts.push(p);
    }
    // ordem por vizinho mais próximo → um traço que percorre todos
    var order = [pts.shift()];
    while (pts.length) {
      var last = order[order.length - 1];
      pts.sort(function (p, q) {
        return Math.hypot(p[0] - last[0], p[1] - last[1]) - Math.hypot(q[0] - last[0], q[1] - last[1]);
      });
      order.push(pts.shift());
    }
    var dPath = "M" + order.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("L");
    var link = el("path", { d: dPath, pathLength: 1, class: "link" }, svg);
    var halos = [];
    var dots = order.map(function (p, i) {
      if (i % 5 === 2) halos.push(el("circle", { cx: p[0], cy: p[1], r: 16, class: "halo" }, svg));
      return el("circle", { cx: p[0], cy: p[1], r: 5, class: "dot" }, svg);
    });
    gsap.set(dots, { transformOrigin: "50% 50%", scale: 0.5, opacity: 0.3 });
    gsap.set(halos, { transformOrigin: "50% 50%", scale: 0.6 });
    var tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    tl.to(dots, { scale: 1, opacity: 1, stagger: 0.03, duration: 0.3 }, 0)
      .to(link, { strokeDashoffset: 0, duration: 0.6 }, 0.15)
      .to(halos, { opacity: 1, scale: 1.25, stagger: 0.05, duration: 0.2 }, 0.7);
    return tl;
  }

  // Atenção (TDAH): pontos dispersos se organizam numa seta — direção.
  function artFocus(svg) {
    var r = rng(5);
    var targets = [];
    for (var i = 0; i < 34; i++) targets.push([70 + i * 7, 200]);
    for (var j = 1; j <= 15; j++) {
      targets.push([318 - j * 3.4, 200 - j * 3.4]);
      targets.push([318 - j * 3.4, 200 + j * 3.4]);
    }
    var ring = el("circle", { cx: 318, cy: 200, r: 22, class: "ring" }, svg);
    var dots = targets.map(function (t) {
      var c = el("circle", { cx: 0, cy: 0, r: 3.2, class: "dot" }, svg);
      gsap.set(c, { x: 30 + r() * 340, y: 30 + r() * 340, scale: 0.6 + r() * 1.2, opacity: 0.5 + r() * 0.5 });
      c._t = t;
      return c;
    });
    gsap.set(ring, { transformOrigin: "50% 50%", scale: 7, opacity: 0 });
    var tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    dots.forEach(function (c, k) {
      tl.to(c, { x: c._t[0], y: c._t[1], scale: 1, opacity: 1, duration: 0.7, ease: "power2.inOut" }, (k % 12) * 0.02);
    });
    tl.to(ring, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.45);
    return tl;
  }

  // Alzheimer e outros transtornos: anéis de crescimento — uma história
  // inteira, camada por camada.
  function artRings(svg) {
    var rings = svg.querySelectorAll(".ring");
    var tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    tl.to(rings, { strokeDashoffset: 0, duration: 0.5, stagger: 0.07 });
    return tl;
  }

  // Espectro: faixas com ritmos diferentes, cada uma no seu passo.
  function artSpectrum(svg) {
    var defs = el("defs", {}, svg);
    var clip = el("clipPath", { id: "spectrum-a" }, defs);
    el("rect", { x: 30, y: 40, width: 340, height: 320, rx: 24 }, clip);
    var g = el("g", { "clip-path": "url(#spectrum-a)" }, svg);
    var rows = [];
    function wave(y, period, amp) {
      var d = "M-400 " + y;
      for (var x = -400; x < 800; x += period) {
        d += "q" + period / 4 + " " + -amp + " " + period / 2 + " 0t" + period / 2 + " 0";
      }
      return d;
    }
    var specs = [
      { d: wave(70, 40, 10), shift: 120 },
      { d: "M-400 115H800", dash: "0 14", shift: -84 },
      { d: wave(160, 24, 8), shift: 72, accent: true },
      { d: "M-400 205H800", dash: "28 12", shift: -120 },
      { d: wave(250, 64, 16), shift: 192 },
      { d: "M-400 295H800", dash: "0 22 6 22", shift: -100 },
      { d: wave(335, 32, 6), shift: 64 }
    ];
    specs.forEach(function (s) {
      var p = el("path", { d: s.d, class: "row" + (s.accent ? " row--accent" : "") }, g);
      if (s.dash) p.setAttribute("stroke-dasharray", s.dash);
      p._shift = s.shift;
      rows.push(p);
    });
    var tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    rows.forEach(function (p) {
      tl.fromTo(p, { x: 0 }, { x: p._shift, duration: 1 }, 0);
    });
    return tl;
  }

  // Aprendizagem: o caminho pelo labirinto vai sendo encontrado.
  function artMaze(svg) {
    var route = svg.querySelector(".art-maze__route");
    var end = svg.querySelector(".art-maze__end");
    gsap.set(end, { transformOrigin: "50% 50%" });
    var tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    tl.to(route, { strokeDashoffset: 0, duration: 0.85 }).fromTo(end, { scale: 1 }, { scale: 1.8, fill: "#ffb89c", duration: 0.15 });
    return tl;
  }

  function buildArts() {
    return [
      artMemory(document.querySelector(".art-memory")),
      artFocus(document.querySelector(".art-focus")),
      artRings(document.querySelector(".art-rings")),
      artSpectrum(document.querySelector(".art-spectrum")),
      artMaze(document.querySelector(".art-maze"))
    ];
  }

  /* ---------------- Coreografia de scroll ---------------- */
  function initScroll() {
    gsap.registerPlugin(ScrollTrigger);
    var arts = buildArts();
    var panels = gsap.utils.toArray(".panel");
    var mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)"
      },
      function (ctx) {
        var c = ctx.conditions;

        if (c.reduce) {
          arts.forEach(function (tl) { tl.progress(1); });
          return;
        }

        /* Abertura → portal azul */
        var stage = document.querySelector(".intro__stage");
        var brain = document.querySelector(".intro__brain");
        function centerShift() {
          var s = stage.getBoundingClientRect();
          var b = brain.getBoundingClientRect();
          return c.desktop ? s.left + s.width / 2 - (b.left + b.width / 2) : 0;
        }
        function portalAt() {
          var s = stage.getBoundingClientRect();
          var b = brain.getBoundingClientRect();
          var x = c.desktop ? 50 : ((b.left + b.width / 2 - s.left) / s.width) * 100;
          var y = ((b.top + b.height * 0.48 - s.top) / s.height) * 100;
          return x.toFixed(1) + "% " + y.toFixed(1) + "%";
        }
        var at = portalAt();
        gsap.set(".intro__portal", { clipPath: "circle(0% at " + at + ")" });
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".intro",
              start: "top top",
              end: "+=140%",
              pin: ".intro__stage",
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          })
          .to(".intro__text", { yPercent: -18, opacity: 0, duration: 0.35 }, 0)
          .to(brain, { x: centerShift, scale: c.desktop ? 1.12 : 1.05, duration: 0.5, ease: "power1.inOut" }, 0)
          .to(".intro__portal", { clipPath: function () { return "circle(150% at " + portalAt() + ")"; }, duration: 0.55, ease: "power2.in" }, 0.3)
          .to(brain, { color: "#ffffff", duration: 0.25 }, 0.45)
          .to(brain, { opacity: 0.22, scale: c.desktop ? 1.5 : 1.35, duration: 0.35 }, 0.62)
          .fromTo(".intro__statement", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.74)
          .to({}, { duration: 0.08 });

        /* Especialidades */
        if (c.desktop) {
          var track = document.querySelector(".areas__track");
          var bar = document.querySelector(".areas__progress span");
          function distance() {
            return track.scrollWidth - window.innerWidth;
          }
          var horizontal = gsap.to(track, {
            x: function () { return -distance(); },
            ease: "none",
            scrollTrigger: {
              trigger: ".areas",
              start: "top top",
              end: function () { return "+=" + distance(); },
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: function (self) { gsap.set(bar, { scaleX: self.progress }); }
            }
          });
          // Primeiro painel: avança enquanto a seção sobe até o topo.
          ScrollTrigger.create({
            trigger: ".areas",
            start: "top 75%",
            end: "top 5%",
            scrub: 0.6,
            animation: arts[0]
          });
          panels.slice(1).forEach(function (panel, i) {
            ScrollTrigger.create({
              trigger: panel,
              containerAnimation: horizontal,
              start: "left 80%",
              end: "left 5%",
              scrub: 0.6,
              animation: arts[i + 1]
            });
          });
        } else {
          panels.forEach(function (panel, i) {
            ScrollTrigger.create({
              trigger: panel.querySelector(".panel__art"),
              start: "top 85%",
              end: "bottom 55%",
              scrub: 0.6,
              animation: arts[i]
            });
          });
        }

        /* Formação: a foto se abre num círculo (eco do portal) */
        gsap.fromTo(
          ".about__photo",
          { clipPath: "circle(12% at 50% 45%)" },
          {
            clipPath: "circle(75% at 50% 45%)",
            ease: "none",
            scrollTrigger: { trigger: ".about", start: "top 85%", end: "top 25%", scrub: 0.6 }
          }
        );
        gsap.fromTo(
          ".about__photo img",
          { yPercent: -8 },
          { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.from(".about__list .mask > span", {
          yPercent: 105,
          duration: 0.9,
          ease: "expo.out",
          stagger: { each: 0.08, ease: "power1.in" },
          scrollTrigger: { trigger: ".about__list", start: "top 80%" }
        });

        /* Clínicas: o Plano Piloto se desenha */
        gsap.fromTo(
          ".pilot__axis",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", stagger: 0.2, scrollTrigger: { trigger: ".places", start: "top 75%", end: "top 15%", scrub: 0.6 } }
        );
        gsap.fromTo(
          ".pilot__block",
          { opacity: 0 },
          { opacity: 0.1, ease: "none", stagger: { each: 0.02, from: "center" }, scrollTrigger: { trigger: ".places", start: "top 65%", end: "top 10%", scrub: 0.6 } }
        );
        gsap.from(".pin", {
          scale: 0,
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.07,
          clearProps: "transform",
          scrollTrigger: { trigger: ".places", start: "top 35%" }
        });

        /* Fechamento: o mesmo cérebro, agora traçado pelo scroll */
        gsap.fromTo(
          ".closing__brain .draw",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".closing", start: "top 90%", end: "bottom 60%", scrub: 0.8 } }
        );
      }
    );

    /* Lista de clínicas ↔ pinos no mapa (scroll e ponteiro) */
    var list = document.querySelector(".places__list");
    var places = gsap.utils.toArray(".place");
    var pins = gsap.utils.toArray(".pin");
    function activate(i) {
      list.classList.add("is-tracking");
      places.forEach(function (p, k) { p.classList.toggle("is-active", k === i); });
      pins.forEach(function (p, k) { p.classList.toggle("is-active", k === i); });
    }
    places.forEach(function (place, i) {
      ScrollTrigger.create({
        trigger: place,
        start: "top 62%",
        end: "bottom 62%",
        onToggle: function (self) { if (self.isActive) activate(i); }
      });
      place.addEventListener("pointerenter", function () { activate(i); });
    });
    ScrollTrigger.create({
      trigger: list,
      start: "top 62%",
      end: "bottom 40%",
      onLeave: function () { list.classList.remove("is-tracking"); },
      onLeaveBack: function () { list.classList.remove("is-tracking"); }
    });

    // As fontes mudam medidas: recalcula depois que carregam.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

  function init() {
    initTop();
    if (window.gsap && window.ScrollTrigger) initScroll();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
