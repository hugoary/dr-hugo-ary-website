/* ==========================================================================
   Dr. Hugo Ary — interações da página inicial
   Sem dependências. Cada módulo é independente e falha em silêncio: se algo
   não existir na página, o resto continua funcionando.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  /* ------------------------------------------------------------------------
     1. Cabeçalho: tema conforme a seção abaixo dele, fundo após rolar,
        recolhe ao descer e volta ao subir.
     ------------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var sections = document.querySelectorAll("[data-nav-theme]");
    if ("IntersectionObserver" in window && sections.length) {
      // Faixa fina logo abaixo do topo: a seção que a cruza dá o tema.
      var themeObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              header.setAttribute("data-theme", entry.target.getAttribute("data-nav-theme"));
            }
          });
        },
        { rootMargin: "-32px 0px -95% 0px" }
      );
      sections.forEach(function (s) {
        themeObserver.observe(s);
      });
    }

    var lastY = window.scrollY;
    var ticking = false;
    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);
      // Só recolhe depois do hero, e só com um gesto claro (> 6px).
      if (!header.classList.contains("menu-open")) {
        if (y > window.innerHeight * 0.8 && y - lastY > 6) {
          header.classList.add("is-hidden");
        } else if (lastY - y > 6 || y < 80) {
          header.classList.remove("is-hidden");
        }
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    // Navegação por teclado: se o foco entra no cabeçalho, ele aparece.
    header.addEventListener("focusin", function () {
      header.classList.remove("is-hidden");
    });
    update();
  }

  /* ------------------------------------------------------------------------
     2. Menu móvel
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.getElementById("mobile-menu");
    if (!header || !toggle || !menu) return;

    menu.hidden = false; // a visibilidade passa a ser controlada pelo CSS

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      header.classList.toggle("menu-open", open);
      header.classList.remove("is-hidden");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
      document.documentElement.style.overflow = open ? "hidden" : "";
      if (open) {
        var first = menu.querySelector("a");
        if (first) first.focus({ preventScroll: true });
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1181px)").addEventListener("change", function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------------
     3. Revelações no scroll — uma vez por elemento.
     ------------------------------------------------------------------------ */
  function initReveals() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     4. Manifesto: as palavras acendem conforme a leitura avança.
        A opacidade é escrita direto em cada <span> (não numa variável CSS
        herdada), para não recalcular estilos do bloco inteiro a cada frame.
     ------------------------------------------------------------------------ */
  function initManifesto() {
    var el = document.querySelector("[data-words]");
    if (!el || reduceMotion.matches) return;

    // Envolve cada palavra num span, preservando <em>.
    var words = [];
    function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              var span = document.createElement("span");
              span.className = "manifesto__word";
              span.textContent = part;
              words.push(span);
              frag.appendChild(span);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          wrap(child);
        }
      });
    }
    wrap(el);

    var last = [];
    var active = false;
    var frame = 0;
    function update() {
      frame = 0;
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 quando o topo do texto está a 85% da tela; 1 quando a base chega a 45%.
      var start = vh * 0.85;
      var end = vh * 0.45;
      var p = (start - r.top) / (start - end + r.height);
      p = Math.max(0, Math.min(1, p));
      var lit = p * (words.length + 2);
      for (var i = 0; i < words.length; i++) {
        var o = Math.max(0, Math.min(1, lit - i));
        var v = 0.16 + o * 0.84;
        v = Math.round(v * 100) / 100;
        if (last[i] !== v) {
          words[i].style.opacity = v;
          last[i] = v;
        }
      }
    }
    function onScroll() {
      if (active && !frame) frame = requestAnimationFrame(update);
    }
    new IntersectionObserver(function (entries) {
      active = entries[0].isIntersecting;
      if (active) onScroll();
    }).observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ------------------------------------------------------------------------
     5. Cards: holofote de atenção que segue o ponteiro.
     ------------------------------------------------------------------------ */
  function initSpotlight() {
    if (!finePointer.matches) return;
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. EEG do contato: pausa fora da tela.
     ------------------------------------------------------------------------ */
  function initEeg() {
    var section = document.querySelector(".contact");
    if (!section || !("IntersectionObserver" in window)) return;
    section.classList.add("is-paused");
    new IntersectionObserver(function (entries) {
      section.classList.toggle("is-paused", !entries[0].isIntersecting);
    }).observe(section);
  }

  /* ------------------------------------------------------------------------
     7. Hero: rede neural em canvas.

     Neurônios distribuídos (amostragem de Poisson) dentro da silhueta lateral
     de um cérebro, mais pontos ao longo do contorno e dos sulcos central e
     lateral, para a forma ser legível. Cada neurônio liga-se aos vizinhos
     mais próximos.

     - Atividade espontânea: de tempos em tempos um neurônio dispara; o
       potencial de ação percorre as sinapses e pode propagar em cascata,
       com probabilidade decrescente.
     - Atenção: o ponteiro (suavizado como uma mola) ilumina a região sob ele
       e provoca disparos ali — foco seletivo.
     - Profundidade: cada neurônio tem um "z"; o ponteiro desloca as camadas
       de forma diferente (paralaxe).
     - Entrada: a rede "acende" do polo frontal ao occipital.
     - Custo: pausa fora da tela e com a aba oculta; resolução limitada a 2x;
       menos neurônios em telas pequenas. Com movimento reduzido, desenha um
       único quadro estático.
     ------------------------------------------------------------------------ */
  function initNeuralHero() {
    var canvas = document.querySelector(".hero__canvas");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var hero = canvas.parentElement;

    // Silhueta lateral do cérebro (lobo frontal à esquerda), em unidades de
    // modelo ~830 × 690.
    var BRAIN =
      "M300 120C380 60 520 40 620 70C720 90 820 140 870 230C920 320 920 420 860 480" +
      "C820 520 760 530 720 520C760 560 762 640 680 652C620 658 582 622 590 580" +
      "L566 700C556 730 512 730 506 700L520 592C470 592 380 602 320 562" +
      "C280 542 262 502 230 482C170 462 110 422 100 340C95 250 180 160 300 120Z";
    // Sulco central e fissura lateral (Sylvius) — dão anatomia à forma.
    var SULCI = [
      "M585 72C560 150 548 210 520 300C505 345 500 380 498 410",
      "M262 470C340 430 430 418 520 408C590 400 650 380 700 350",
      "M720 520C700 500 690 470 700 440"
    ];
    var MODEL = { x: 95, y: 40, w: 830, h: 695 };

    // Gerador pseudoaleatório com semente: a "anatomia" é sempre a mesma.
    function rng(seed) {
      return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function samplePath(d, step) {
      var ns = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(ns, "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.style.position = "absolute";
      var p = document.createElementNS(ns, "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
      document.body.appendChild(svg);
      var out = [];
      var len = p.getTotalLength();
      for (var l = 0; l < len; l += step) {
        var pt = p.getPointAtLength(l);
        out.push({ x: pt.x, y: pt.y });
      }
      document.body.removeChild(svg);
      return out;
    }

    var nodes = [];
    var edges = [];
    var adj = [];

    function build(small) {
      var rand = rng(19610); // CRM, por que não
      var brain = new Path2D(BRAIN);
      // Teste de pertencimento num canvas próprio, sem a escala de DPR.
      var probe = document.createElement("canvas").getContext("2d");
      var minDist = small ? 50 : 40;
      var target = small ? 115 : 190;
      var pts = [];

      function farEnough(x, y, d) {
        for (var i = 0; i < pts.length; i++) {
          var dx = pts[i].x - x;
          var dy = pts[i].y - y;
          if (dx * dx + dy * dy < d * d) return false;
        }
        return true;
      }

      // Contorno e sulcos primeiro (estrutura), depois o interior.
      samplePath(BRAIN, minDist * 0.9).forEach(function (p) {
        if (farEnough(p.x, p.y, minDist * 0.75)) pts.push({ x: p.x, y: p.y, edge: true });
      });
      SULCI.forEach(function (d) {
        samplePath(d, minDist * 0.85).forEach(function (p) {
          if (farEnough(p.x, p.y, minDist * 0.7)) pts.push({ x: p.x, y: p.y, edge: true });
        });
      });
      var tries = 0;
      while (pts.length < target && tries < 12000) {
        tries++;
        var x = MODEL.x + rand() * MODEL.w;
        var y = MODEL.y + rand() * MODEL.h;
        if (probe.isPointInPath(brain, x, y) && farEnough(x, y, minDist)) {
          pts.push({ x: x, y: y, edge: false });
        }
      }

      nodes = pts.map(function (p) {
        return {
          mx: p.x,
          my: p.y,
          z: rand(), // profundidade 0 (fundo) … 1 (frente)
          phase: rand() * Math.PI * 2,
          act: 0,
          born: 0,
          sx: 0,
          sy: 0,
          edge: p.edge
        };
      });

      // Ligações: 3 vizinhos mais próximos (até uma distância máxima).
      edges = [];
      adj = nodes.map(function () {
        return [];
      });
      var seen = {};
      var maxD = minDist * 2.1;
      nodes.forEach(function (a, i) {
        var near = [];
        nodes.forEach(function (b, j) {
          if (i === j) return;
          var dx = a.mx - b.mx;
          var dy = a.my - b.my;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) near.push({ j: j, d: d });
        });
        near.sort(function (p, q) {
          return p.d - q.d;
        });
        near.slice(0, 3).forEach(function (n) {
          var key = i < n.j ? i + "-" + n.j : n.j + "-" + i;
          if (seen[key]) return;
          seen[key] = true;
          var e = { a: i, b: n.j, len: n.d };
          edges.push(e);
          adj[i].push({ to: n.j, e: e });
          adj[n.j].push({ to: i, e: e });
        });
      });
    }

    // Layout: modelo → tela.
    var W = 0;
    var H = 0;
    var dpr = 1;
    var scale = 1;
    var ox = 0;
    var oy = 0;
    var small = false;

    function layout() {
      var rect = hero.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var wasSmall = small;
      small = W < 900;
      if (!nodes.length || wasSmall !== small) build(small);

      if (small) {
        // Telas estreitas: cérebro no alto, atrás do texto.
        var areaW = W * 1.05;
        var areaH = H * 0.44;
        scale = Math.min(areaW / MODEL.w, areaH / MODEL.h);
        ox = (W - MODEL.w * scale) / 2 - MODEL.x * scale;
        oy = H * 0.07 - MODEL.y * scale;
      } else {
        // Telas largas: cérebro à direita, centrado na vertical.
        var regionX = W * 0.44;
        var regionW = W * 0.54;
        var regionH = H * 0.78;
        scale = Math.min(regionW / MODEL.w, regionH / MODEL.h);
        ox = regionX + (regionW - MODEL.w * scale) / 2 - MODEL.x * scale;
        oy = (H - MODEL.h * scale) / 2 - MODEL.y * scale + H * 0.02;
      }
    }

    // Estado dinâmico
    var pulses = [];
    var MAX_PULSES = 90;
    var pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, inside: false };
    var par = { x: 0, y: 0, tx: 0, ty: 0 }; // paralaxe suavizada
    var lastPointerFire = 0;
    var nextSpontaneous = 0;
    var startTime = 0;
    var IGNITE = 1400;

    function fire(i, gen, from) {
      var n = nodes[i];
      n.act = 1;
      if (gen > 6) return;
      var prob = 0.62 * Math.pow(0.78, gen);
      adj[i].forEach(function (link) {
        if (link.to === from) return;
        if (pulses.length >= MAX_PULSES) return;
        if (Math.random() < prob) {
          pulses.push({
            from: i,
            to: link.to,
            t: 0,
            // ~0,35–0,6 px/ms em unidades de modelo: o sinal "anda", não pisca
            speed: (0.35 + Math.random() * 0.25) / link.e.len,
            gen: gen + 1
          });
        }
      });
    }

    function nearestNode(x, y) {
      var best = -1;
      var bestD = Infinity;
      for (var i = 0; i < nodes.length; i++) {
        var dx = nodes[i].sx - x;
        var dy = nodes[i].sy - y;
        var d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      return { i: best, d: Math.sqrt(bestD) };
    }

    var GLOW = "143, 240, 191";
    var LINE = "120, 210, 165";

    function draw(now, dt, staticFrame) {
      var elapsed = now - startTime;
      ctx.clearRect(0, 0, W, H);

      // Mola simples para o ponteiro e a paralaxe (sem saltos).
      var k = staticFrame ? 1 : 1 - Math.pow(0.001, dt / 1000);
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, k * 2.2);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, k * 2.2);
      par.x += (par.tx - par.x) * k;
      par.y += (par.ty - par.y) * k;

      var decay = Math.exp(-dt / 520);
      var radius = small ? 0 : 150;

      // Posição de tela de cada neurônio.
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var breathe = staticFrame ? 0 : Math.sin(now * 0.0007 + n.phase) * 1.6;
        var depth = 0.35 + n.z * 0.65;
        n.sx = ox + n.mx * scale + par.x * depth * 14 + breathe;
        n.sy = oy + n.my * scale + par.y * depth * 10 + Math.cos(now * 0.0006 + n.phase) * 1.2;

        // Entrada: do polo frontal (esq.) ao occipital (dir.).
        if (staticFrame) {
          n.born = 1;
        } else {
          var delay = ((n.mx - MODEL.x) / MODEL.w) * 900 + n.phase * 40;
          n.born = Math.max(0, Math.min(1, (elapsed - delay) / 700));
          n.born = 1 - Math.pow(1 - n.born, 3); // ease-out
        }

        n.act *= decay;
        if (pointer.inside && radius) {
          var dx = n.sx - pointer.x;
          var dy = n.sy - pointer.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < radius) {
            var f = 1 - d / radius;
            n.act = Math.max(n.act, f * f * 0.75);
          }
        }
      }

      // Halo de atenção sob o ponteiro.
      if (pointer.inside && radius) {
        var g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius * 1.4);
        g.addColorStop(0, "rgba(" + GLOW + ", 0.08)");
        g.addColorStop(1, "rgba(" + GLOW + ", 0)");
        ctx.fillStyle = g;
        ctx.fillRect(pointer.x - radius * 1.4, pointer.y - radius * 1.4, radius * 2.8, radius * 2.8);
      }

      // Sinapses
      ctx.lineWidth = 1;
      for (var e = 0; e < edges.length; e++) {
        var ed = edges[e];
        var A = nodes[ed.a];
        var B = nodes[ed.b];
        var born = Math.min(A.born, B.born);
        if (born <= 0) continue;
        var a = (0.09 + (A.act + B.act) * 0.22) * born;
        ctx.strokeStyle = "rgba(" + LINE + "," + a.toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(A.sx, A.sy);
        ctx.lineTo(B.sx, B.sy);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "lighter";

      // Neurônios
      for (var j = 0; j < nodes.length; j++) {
        var m = nodes[j];
        if (m.born <= 0) continue;
        var r = (small ? 1 : 1.2) + m.z * 1.3;
        if (m.act > 0.04) {
          ctx.fillStyle = "rgba(" + GLOW + "," + (m.act * 0.16 * m.born).toFixed(3) + ")";
          ctx.beginPath();
          ctx.arc(m.sx, m.sy, r + 3 + m.act * 9, 0, Math.PI * 2);
          ctx.fill();
        }
        var alpha = (0.28 + m.z * 0.25 + m.act * 0.6) * m.born;
        ctx.fillStyle = "rgba(" + GLOW + "," + Math.min(1, alpha).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(m.sx, m.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Potenciais de ação
      if (!staticFrame) {
        for (var p = pulses.length - 1; p >= 0; p--) {
          var pu = pulses[p];
          pu.t += pu.speed * dt;
          var F = nodes[pu.from];
          var T = nodes[pu.to];
          if (pu.t >= 1) {
            pulses.splice(p, 1);
            fire(pu.to, pu.gen, pu.from);
            continue;
          }
          var t0 = Math.max(0, pu.t - 0.35);
          var hx = F.sx + (T.sx - F.sx) * pu.t;
          var hy = F.sy + (T.sy - F.sy) * pu.t;
          var tx = F.sx + (T.sx - F.sx) * t0;
          var ty = F.sy + (T.sy - F.sy) * t0;
          var grad = ctx.createLinearGradient(tx, ty, hx, hy);
          grad.addColorStop(0, "rgba(" + GLOW + ",0)");
          grad.addColorStop(1, "rgba(" + GLOW + ",0.75)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.stroke();
          ctx.fillStyle = "rgba(225, 255, 240, 0.95)";
          ctx.beginPath();
          ctx.arc(hx, hy, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";

      if (staticFrame) return;

      // Disparos espontâneos (depois que a rede acendeu).
      if (elapsed > IGNITE && now > nextSpontaneous) {
        var idx = Math.floor(Math.random() * nodes.length);
        fire(idx, Math.random() < 0.3 ? 0 : 2, -1);
        nextSpontaneous = now + 500 + Math.random() * 1100;
      }

      // Atenção: o ponteiro parado sobre a rede gera disparos locais.
      if (pointer.inside && radius && now - lastPointerFire > 260) {
        var hit = nearestNode(pointer.x, pointer.y);
        if (hit.i >= 0 && hit.d < radius * 0.6) {
          fire(hit.i, 3, -1);
          lastPointerFire = now;
        }
      }
    }

    // Loop: só roda com o hero visível e a aba ativa.
    var raf = 0;
    var visible = true;
    var lastNow = 0;
    var ignitionFired = false;

    function loop(now) {
      raf = 0;
      var dt = lastNow ? Math.min(now - lastNow, 50) : 16;
      lastNow = now;
      draw(now, dt, false);
      if (!ignitionFired && now - startTime > IGNITE * 0.75) {
        // Primeira cascata a partir do polo frontal: a rede "liga".
        ignitionFired = true;
        var front = 0;
        nodes.forEach(function (n, i) {
          if (n.mx < nodes[front].mx) front = i;
        });
        fire(front, 0, -1);
      }
      schedule();
    }
    function schedule() {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lastNow = 0;
    }

    function renderStatic() {
      // Um quadro só, com algumas regiões acesas — sem movimento.
      nodes.forEach(function (n, i) {
        n.act = i % 7 === 0 ? 0.5 : 0;
      });
      draw(performance.now(), 16, true);
    }

    layout();
    startTime = performance.now();
    canvas.classList.add("is-ready");

    if (reduceMotion.matches) {
      renderStatic();
      if ("ResizeObserver" in window) {
        new ResizeObserver(function () {
          layout();
          renderStatic();
        }).observe(hero);
      }
      return;
    }

    if ("ResizeObserver" in window) {
      var resizeRaf = 0;
      new ResizeObserver(function () {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(layout);
      }).observe(hero);
    } else {
      window.addEventListener("resize", layout);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) schedule();
        else stop();
      }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else schedule();
    });

    if (finePointer.matches) {
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        if (!pointer.inside) {
          // Entrou agora: o halo nasce no lugar, sem atravessar a tela.
          pointer.x = x;
          pointer.y = y;
        }
        pointer.tx = x;
        pointer.ty = y;
        pointer.inside = true;
        par.tx = (x / W - 0.5) * 2;
        par.ty = (y / H - 0.5) * 2;
      });
      hero.addEventListener("pointerleave", function () {
        pointer.inside = false;
        par.tx = 0;
        par.ty = 0;
      });
    }

    schedule();
  }

  function init() {
    initHeader();
    initMobileMenu();
    initReveals();
    initManifesto();
    initSpotlight();
    initEeg();
    initNeuralHero();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
