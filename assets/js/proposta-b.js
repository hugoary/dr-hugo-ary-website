/* Proposta B — formas que se reorganizam com o scroll (GSAP + ScrollTrigger).
   As mesmas dez formas compõem um cérebro e depois, capítulo a capítulo,
   viram memória (gaveta), foco (alvo), tempo (relógio), padrão (grade) e
   degraus (aprendizagem). O fundo troca de cor junto. */
(function () {
  "use strict";

  /* ---------------- Barra e menu ---------------- */
  function initBar() {
    var bar = document.querySelector(".bar");
    var btn = document.querySelector(".bar__menu");
    var drawer = document.getElementById("menu-b");
    var lastY = 0;
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        if (!drawer.classList.contains("is-open")) {
          if (y > 300 && y - lastY > 6) bar.classList.add("is-hidden");
          else if (lastY - y > 6 || y < 80) bar.classList.remove("is-hidden");
        }
        lastY = y;
      },
      { passive: true }
    );
    function setOpen(open) {
      if (open) drawer.hidden = false;
      requestAnimationFrame(function () { drawer.classList.toggle("is-open", open); });
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      if (!open) setTimeout(function () { if (!drawer.classList.contains("is-open")) drawer.hidden = true; }, 180);
    }
    btn.addEventListener("click", function () { setOpen(!drawer.classList.contains("is-open")); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) { setOpen(false); btn.focus(); }
    });
  }

  /* ---------------- Composições ----------------
     Cada forma: [x, y, rotação, escala, opacidade], com x/y como fração do
     palco (centro da forma). N normaliza tamanhos para as grades. */
  var N = { 0: 0.55, 1: 0.8, 2: 0.5, 3: 0.62, 4: 0.9, 5: 0.48, 6: 0.72, 7: 1.15, 8: 1.6, 9: 2.3 };

  function grid(order, xs, ys, scaleMul, rot) {
    var out = {};
    order.forEach(function (s, i) {
      var col = i % xs.length;
      var row = Math.floor(i / xs.length);
      out[s] = [xs[col], ys[row], typeof rot === "function" ? rot(s, row) : rot || 0, N[s] * scaleMul, 1];
    });
    return out;
  }

  var COMPS = [];
  // Cérebro (vista lateral, frente à esquerda)
  COMPS.push({
    bg: "#ffd23f",
    s: {
      0: [0.27, 0.5, 0, 1.15, 1],
      1: [0.3, 0.47, 0, 0.5, 1],
      2: [0.52, 0.45, 0, 2.2, 1],
      3: [0.75, 0.69, 180, 1, 1],
      4: [0.6, 0.79, 135, 0.6, 1],
      5: [0.47, 0.41, -8, 0.9, 1],
      6: [0.45, 0.62, 0, 2.4, 1],
      7: [0.88, 0.2, 18, 0.6, 1],
      8: [0.68, 0.43, 0, 1.1, 1],
      9: [0.79, 0.5, 0, 1.2, 1]
    }
  });
  // Memória: tudo guardado em ordem; uma lembrança sai da gaveta.
  var mem = grid([0, 2, 5, 4, 1, 6, 3, 8, 9], [0.24, 0.46, 0.68], [0.3, 0.5, 0.7], 1, 0);
  mem[7] = [0.9, 0.5, 14, N[7], 1];
  COMPS.push({ bg: "#c9c1ff", s: mem });
  // Atenção (TDAH): um alvo no centro; o resto vira ruído na periferia.
  COMPS.push({
    bg: "#ff8a65",
    s: {
      0: [0.5, 0.5, 0, 2.0, 1],
      1: [0.5, 0.5, 0, 1.9, 1],
      2: [0.12, 0.15, -30, 0.55, 0.35],
      3: [0.88, 0.12, 40, 0.6, 0.35],
      4: [0.1, 0.86, 10, 0.6, 0.35],
      5: [0.84, 0.88, -50, 0.5, 0.35],
      6: [0.92, 0.52, 80, 0.6, 0.35],
      7: [0.1, 0.52, 30, 0.6, 0.35],
      8: [0.5, 0.06, 0, 0.8, 0.35],
      9: [0.5, 0.5, 0, 2.4, 1]
    }
  });
  // Tempo (Alzheimer e outros transtornos): um relógio.
  COMPS.push({
    bg: "#8fd9b0",
    s: {
      0: [0.5, 0.5, 0, 2.3, 1],
      1: [0.5, 0.5, 0, 3.0, 1],
      2: [0.5, 0.76, 180, 0.35, 1],
      3: [0.76, 0.5, 90, 0.4, 1],
      4: [0.24, 0.5, -45, 0.45, 1],
      5: [0.5, 0.96, 0, 0.9, 1],
      6: [0.555, 0.405, -60, 1, 1],
      7: [0.5, 0.5, 45, 0.45, 1],
      8: [0.88, 0.12, 0, 1, 1],
      9: [0.5, 0.24, 0, 1, 1]
    }
  });
  // Padrão (TEA): uma grade regular — e uma peça no seu próprio ângulo.
  COMPS.push({
    bg: "#a9d8ff",
    s: grid([0, 2, 4, 6, 8, 1, 3, 5, 7, 9], [0.14, 0.32, 0.5, 0.68, 0.86], [0.4, 0.62], 0.85, function (s, row) {
      return s === 7 ? 45 : row ? 180 : 0;
    })
  });
  // Degraus (aprendizagem).
  var stairs = {};
  [9, 8, 7, 6, 4, 3, 5, 2, 1, 0].forEach(function (s, i) {
    stairs[s] = [0.14 + i * 0.08, 0.86 - i * 0.08, 0, N[s] * (0.55 + i * 0.05), 1];
  });
  COMPS.push({ bg: "#ffb8d2", s: stairs });

  function initStory() {
    gsap.registerPlugin(ScrollTrigger);
    var story = document.querySelector(".story");
    var stage = document.querySelector(".stage");
    var shapes = gsap.utils.toArray(".shape");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function vars(c) {
      var comp = COMPS[c].s;
      return {
        x: function (i, el) { return comp[el.dataset.s][0] * stage.offsetWidth - el.offsetWidth / 2; },
        y: function (i, el) { return comp[el.dataset.s][1] * stage.offsetHeight - el.offsetHeight / 2; },
        rotation: function (i, el) { return comp[el.dataset.s][2]; },
        scale: function (i, el) { return comp[el.dataset.s][3]; },
        opacity: function (i, el) { return comp[el.dataset.s][4]; }
      };
    }

    gsap.set(shapes, vars(0));
    if (reduce) return;

    // Montagem inicial: as formas chegam de fora e compõem o cérebro.
    var intro = gsap.from(shapes, {
      x: function (i) { return (i % 2 ? 1.25 : -0.35) * stage.offsetWidth; },
      y: function (i) { return (0.1 + (i * 0.37) % 1) * stage.offsetHeight; },
      rotation: function (i) { return (i % 3 - 1) * 120; },
      scale: 0.4,
      opacity: 0,
      duration: 1.3,
      ease: "expo.out",
      stagger: { each: 0.05, from: "random" },
      delay: 0.15,
      onComplete: buildScroll
    });

    function buildScroll() {
      var tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      for (var k = 0; k < COMPS.length - 1; k++) {
        var to = vars(k + 1);
        to.duration = 0.7;
        to.immediateRender = false;
        to.stagger = { each: 0.025, from: k % 2 ? "end" : "start" };
        var from = vars(k);
        tl.fromTo(shapes, from, to, k + 0.2);
        tl.fromTo(story, { backgroundColor: COMPS[k].bg }, { backgroundColor: COMPS[k + 1].bg, duration: 0.5, ease: "none", immediateRender: false }, k + 0.3);
      }
      tl.to({}, { duration: 0.1 }, COMPS.length - 1);
      ScrollTrigger.create({
        trigger: story,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9,
        animation: tl,
        invalidateOnRefresh: true
      });
      intro = null;
    }

    // Recalcula posições quando o palco muda de tamanho.
    window.addEventListener("resize", function () {
      if (intro) { intro.progress(1); }
    });

    // Capítulos: o título entra uma vez.
    gsap.utils.toArray(".chapter:not(.chapter--hero)").forEach(function (ch) {
      gsap.from(ch.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ch, start: "top 70%" }
      });
    });
  }

  function initSections() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Sobre: a foto cresce no círculo; as formas decorativas giram com o scroll.
    gsap.fromTo(".about__photo", { scale: 0.7 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".about", start: "top 90%", end: "top 30%", scrub: 0.6 } });
    gsap.fromTo(".about__deco--half", { rotation: -90 }, { rotation: 90, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".about__deco--dot", { y: 80 }, { y: -80, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from(".facts li", { x: -30, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".facts", start: "top 80%" } });

    // Clínicas: o baralho chega empilhado e se espalha.
    var mm = gsap.matchMedia();
    mm.add("(min-width: 561px)", function () {
      var deck = document.querySelector(".deck");
      var cards = gsap.utils.toArray(".card");
      var rots = [-9, -3, 4, 10];
      gsap.fromTo(
        cards,
        {
          x: function (i, el) {
            var d = deck.getBoundingClientRect();
            var r = el.getBoundingClientRect();
            return d.left + d.width / 2 - (r.left + r.width / 2) + (i - 1.5) * 18;
          },
          y: function (i, el) {
            var d = deck.getBoundingClientRect();
            var r = el.getBoundingClientRect();
            return d.top + d.height / 2 - (r.top + r.height / 2) + 40;
          },
          rotation: function (i) { return rots[i]; }
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: { trigger: ".clinics", start: "top 75%", end: "top 5%", scrub: 0.8, invalidateOnRefresh: true }
        }
      );
    });
    mm.add("(max-width: 560px)", function () {
      gsap.utils.toArray(".card").forEach(function (card) {
        gsap.from(card, { y: 60, rotation: 3, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%" } });
      });
    });

    // Final: cada forma no seu ritmo.
    var fsMoves = [
      { rotation: 180 },
      { rotation: -120, y: 40 },
      { x: -60 },
      { rotation: 90, y: -50 },
      { rotation: -90 }
    ];
    gsap.utils.toArray(".fs").forEach(function (el, i) {
      gsap.to(el, Object.assign({ ease: "none", scrollTrigger: { trigger: ".finale", start: "top bottom", end: "bottom top", scrub: 0.6 } }, fsMoves[i]));
    });
  }

  function init() {
    initBar();
    if (!(window.gsap && window.ScrollTrigger)) return;
    initStory();
    initSections();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
