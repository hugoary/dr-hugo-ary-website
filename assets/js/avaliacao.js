const {
  useState,
  useEffect,
  useRef
} = React;

/* ═══ CONSTANTS ═══ */
const WORD_LIST = ["creme", "dedo", "mar", "carta", "rei", "casa", "poste", "flor", "chá", "motor"];
const WORD_LIST_ALT2 = ["flor", "creme", "mar", "motor", "dedo", "rei", "carta", "poste", "chá", "casa"];
const WORD_LIST_ALT3 = ["rei", "chá", "dedo", "casa", "poste", "mar", "creme", "motor", "flor", "carta"];
const BOSTON_ITEMS = [{
  name: "cama",
  hint: "um móvel"
}, {
  name: "escova de dente",
  hint: "usada na boca"
}, {
  name: "gaita/realejo",
  hint: "instrumento musical"
}, {
  name: "raquete",
  hint: "usada para jogar"
}, {
  name: "árvore",
  hint: "cresce na terra"
}, {
  name: "camelo",
  hint: "um animal"
}, {
  name: "dominó",
  hint: "um jogo"
}, {
  name: "caramujo/caracol",
  hint: "um animal"
}, {
  name: "escada rolante",
  hint: "para subir/descer"
}, {
  name: "casa",
  hint: "uma construção"
}, {
  name: "máscara",
  hint: "parte da fantasia"
}, {
  name: "rede",
  hint: "usada para descansar"
}, {
  name: "apito",
  hint: "para assobiar"
}, {
  name: "vulcão",
  hint: "tipo de montanha"
}, {
  name: "funil",
  hint: "utensílio para passar água"
}, {
  name: "harpa",
  hint: "instrumento"
}, {
  name: "flor",
  hint: "cresce no jardim"
}, {
  name: "barco/canoa",
  hint: "usado na água"
}, {
  name: "pegador/pinça",
  hint: "utensílio doméstico"
}, {
  name: "pirâmide",
  hint: "fica no Egito"
}];
const PROVERBS = [{
  start: "De grão em grão",
  end: "a galinha enche o papo"
}, {
  start: "Mais vale um pássaro na mão",
  end: "do que dois voando"
}, {
  start: "Quem sai na chuva",
  end: "é pra se molhar"
}];
const GESTURES = [{
  id: 1,
  name: "Gesto 1",
  max: 1
}, {
  id: 2,
  name: "Gesto 2",
  max: 1
}, {
  id: 3,
  name: "Gesto 3",
  max: 1
}, {
  id: 4,
  name: "Gesto 4",
  max: 1
}, {
  id: 5,
  name: "Gesto 5",
  max: 1
}, {
  id: 6,
  name: "Gesto 6",
  max: 2
}];
const GESTURE_SVG_PATHS = [
/*#__PURE__*/
/* 1 – ângulo reto (L) */
React.createElement("polyline", {
  key: "g1",
  points: "14,8 14,42 44,42",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}),
/*#__PURE__*/
/* 2 – degrau (Z deitado) */
React.createElement("polyline", {
  key: "g2",
  points: "8,12 8,28 30,28 30,44",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}),
/*#__PURE__*/
/* 3 – duas linhas paralelas deslocadas */
React.createElement("g", {
  key: "g3"
}, /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "18",
  x2: "34",
  y2: "18",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("line", {
  x1: "16",
  y1: "32",
  x2: "44",
  y2: "32",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round"
})),
/*#__PURE__*/
/* 4 – dois círculos sobrepostos (Venn) */
React.createElement("g", {
  key: "g4"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "19",
  cy: "25",
  r: "13",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "31",
  cy: "25",
  r: "13",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
})),
/*#__PURE__*/
/* 5 – dois círculos tangentes */
React.createElement("g", {
  key: "g5"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "17",
  cy: "25",
  r: "11",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "33",
  cy: "25",
  r: "11",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
})),
/*#__PURE__*/
/* 6 – dois círculos sobrepostos com setas diagonais cruzadas */
React.createElement("g", {
  key: "g6"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "20",
  cy: "27",
  r: "11",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "30",
  cy: "27",
  r: "11",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "37",
  y1: "42",
  x2: "17",
  y2: "22",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("polygon", {
  points: "13,19 19.6,20.4 15.4,25.6",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("line", {
  x1: "13",
  y1: "12",
  x2: "33",
  y2: "32",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}), /*#__PURE__*/React.createElement("polygon", {
  points: "37,35 30.4,33.6 34.6,28.4",
  fill: "currentColor"
}))];
const MEEM_ITEMS = [{
  key: "meem_orient_temp",
  label: "Orientação Temporal",
  max: 5
}, {
  key: "meem_orient_spat",
  label: "Orientação Espacial",
  max: 5
}, {
  key: "meem_mem_imm",
  label: "Memória Imediata",
  max: 3
}, {
  key: "meem_attn",
  label: "Atenção/Cálculo",
  max: 5
}, {
  key: "meem_mem_evoc",
  label: "Memória Evocada",
  max: 3
}, {
  key: "meem_naming",
  label: "Nomeação",
  max: 2
}, {
  key: "meem_repetition",
  label: "Repetição",
  max: 1
}, {
  key: "meem_verbal_cmd",
  label: "Comando Verbal",
  max: 3
}, {
  key: "meem_written_cmd",
  label: "Comando Escrito",
  max: 1
}, {
  key: "meem_phrase",
  label: "Frase",
  max: 1
}, {
  key: "meem_drawing",
  label: "Desenho",
  max: 1
}];
const PRAXIA_ITEMS = [{
  key: "praxias_clock",
  name: "Relógio",
  max: 15
}, {
  key: "praxias_cube",
  name: "Cubo",
  max: 4
}, {
  key: "praxias_rect",
  name: "Retângulos",
  max: 2
}, {
  key: "praxias_diamond",
  name: "Losango",
  max: 3
}, {
  key: "praxias_circle",
  name: "Círculo",
  max: 2
}];
const MOCA_MEM_WORDS = ["Rosto", "Veludo", "Igreja", "Margarida", "Vermelho"];
const MOCA_SUBTRACTION = [{
  key: "moca_sub93",
  label: "93"
}, {
  key: "moca_sub86",
  label: "86"
}, {
  key: "moca_sub79",
  label: "79"
}, {
  key: "moca_sub72",
  label: "72"
}, {
  key: "moca_sub65",
  label: "65"
}];

/* ═══ INTERPRETATION FUNCTIONS ═══ */
const N = v => {
  const x = parseFloat(v);
  return isNaN(x) ? null : x;
};
function interpretMEEM(score, schooling) {
  if (score === null || schooling === null) return null;
  const norms = [{
    min: 0,
    max: 0,
    median: 20,
    sd: 2.8
  }, {
    min: 1,
    max: 4,
    median: 25,
    sd: 2.9
  }, {
    min: 5,
    max: 8,
    median: 26,
    sd: 2.3
  }, {
    min: 9,
    max: 11,
    median: 28,
    sd: 1.8
  }, {
    min: 12,
    max: 99,
    median: 29,
    sd: 2.0
  }];
  const norm = norms.find(n => schooling >= n.min && schooling <= n.max) || norms[norms.length - 1];
  const z = (score - norm.median) / norm.sd;
  let faixa = z >= 0 ? "≥ 0" : z >= -1 ? "0 a −1" : z >= -2 ? "−1 a −2" : z >= -3 ? "−2 a −3" : "< −3";
  return {
    z: z.toFixed(2),
    faixa,
    alert: z <= -1,
    median: norm.median,
    sd: norm.sd
  };
}
function interpretMoCA(score, schooling) {
  if (score === null || schooling === null) return null;
  if (schooling < 9) return {
    valid: false,
    msg: "MoCA não recomendado para escolaridade < 9 anos"
  };
  const adj = score + (schooling < 12 ? 1 : 0);
  if (adj < 18) return {
    valid: true,
    adjusted: adj,
    cls: "Provável Demência",
    alert: true
  };
  if (adj < 26) return {
    valid: true,
    adjusted: adj,
    cls: "CCL",
    alert: true
  };
  return {
    valid: true,
    adjusted: adj,
    cls: "Normal",
    alert: false
  };
}
function interpretFluency(count, schooling, type = "animais") {
  if (count === null || schooling === null) return null;
  let cutoff;
  if (schooling === 0) cutoff = 9;else if (schooling <= 7) cutoff = 12;else cutoff = 13;
  const alert = count < cutoff;
  const extra = type === "frutas" ? " *" : "";
  return {
    cutoff,
    alert,
    label: alert ? `Alterado (< ${cutoff})${extra}` : `Normal (≥ ${cutoff})${extra}`
  };
}
function interpretWordImmediate(t1, t2, t3) {
  const s1 = N(t1),
    s2 = N(t2),
    s3 = N(t3);
  if (s1 === null && s2 === null && s3 === null) return null;
  const sum = (s1 || 0) + (s2 || 0) + (s3 || 0);
  return {
    sum,
    alert: sum <= 13,
    label: sum <= 13 ? "Alterado (≤ 13)" : "Normal (> 13)"
  };
}
function interpretLateEvocation(score) {
  if (score === null) return null;
  return {
    alert: score <= 3,
    label: score <= 3 ? "Alterado (≤ 3)" : "Normal (> 3)"
  };
}
function interpretRecognition(score) {
  if (score === null) return null;
  return {
    alert: score <= 7,
    label: score <= 7 ? "Alterado (≤ 7)" : "Normal (> 7)"
  };
}
function interpretBoston(score, schooling) {
  if (score === null || schooling === null) return null;
  let cutoff,
    mean,
    note = "";
  if (schooling >= 9) {
    cutoff = 16;
    mean = 18;
  } else if (schooling >= 5) {
    cutoff = 16;
    mean = 17;
  } else if (schooling >= 1) {
    cutoff = 14;
    mean = 15;
  } else {
    cutoff = 10;
    mean = 12;
    note = "Avaliação qualitativa em analfabetos — pontuação 10-12 pode ser comum por privação cultural.";
  }
  const alert = score <= cutoff;
  return {
    cutoff,
    mean,
    alert,
    note,
    label: alert ? `Alterado (≤ ${cutoff})` : `Normal (> ${cutoff})`
  };
}
function interpretReyCopy(score, schooling) {
  if (score === null || schooling === null) return null;
  let cutoff, expected;
  if (schooling === 0) {
    cutoff = 6;
    expected = "8";
  } else if (schooling <= 4) {
    cutoff = 9;
    expected = "10";
  } else if (schooling <= 9) {
    cutoff = 10;
    expected = "11";
  } else {
    cutoff = 11;
    expected = "12";
  }
  return {
    cutoff,
    expected,
    alert: score <= cutoff,
    label: score <= cutoff ? `Alterado (≤ ${cutoff})` : `Normal`
  };
}
function interpretReyEvoc(score, schooling) {
  if (score === null || schooling === null) return null;
  let cutoff, expected;
  if (schooling === 0) {
    cutoff = 3;
    expected = "4";
  } else if (schooling <= 4) {
    cutoff = 4;
    expected = "6";
  } else if (schooling <= 9) {
    cutoff = 6;
    expected = "8";
  } else {
    cutoff = 7;
    expected = "9";
  }
  return {
    cutoff,
    expected,
    alert: score <= cutoff,
    label: score <= cutoff ? `Alterado (≤ ${cutoff})` : `Normal`
  };
}
const REFERENCES = ["Brucki, S. M. D., et al. (2003). Sugestões para o uso do mini-exame do estado mental no Brasil. Arq. Neuro-Psiquiatria, 61(3B), 777-781.", "César, K. G., et al. (2019). MoCA Test: normative and diagnostic accuracy data for seniors with heterogeneous educational levels in Brazil. Arq. Neuro-Psiquiatria, 77(11), 775-781.", "Brucki, S. M. D., et al. (1997). Dados normativos para o teste de fluência verbal categoria animais em nosso meio. Arq. Neuro-Psiquiatria, 55(1), 56-61.", "Bertolucci, P. H. F., et al. (2001). Dados de normatização do teste de memória e reconhecimento da lista de palavras do CERAD.", "Silagi, M. L., Bertolucci, P. H. F., & Ortiz, K. Z. (2015). Naming ability in patients with mild to moderate Alzheimer's disease. Clinics, 70(6), 423-428.", "Abrisqueta-Gomez, J., et al. (2008). Bateria de Avaliação Neuropsicológica NEUROPSI."];

/* ═══ DASHBOARD COMPONENT ═══ */
function buildDashboardRows(data, testType, bCheck, recog) {
  const sch = N(data.schooling);
  const isMoCA = testType === "moca";
  const rows = [];

  // helpers
  const filled = v => v !== "" && v !== undefined && v !== null;
  const clkNorm = s => {
    if (s === null) return null;
    let exp, cut;
    if (s === 0) {
      exp = "6";
      cut = 5;
    } else if (s <= 4) {
      exp = "7";
      cut = 6;
    } else {
      exp = "8";
      cut = 7;
    }
    return {
      exp,
      cut
    };
  };

  // 1. MEEM or MoCA — always shown
  if (!isMoCA) {
    const s = N(data.meem_total);
    const r = s !== null ? interpretMEEM(s, sch) : null;
    let cls = "—",
      expected = sch !== null ? String(interpretMEEM(30, sch)?.median ?? "—") : "—";
    if (r) {
      expected = String(r.median);
      if (r.z <= -3) cls = "Déficit grave";else if (r.z <= -2) cls = "Déficit moderado";else if (r.z <= -1) cls = "Déficit leve";else cls = "Normal";
    }
    rows.push({
      test: "MEEM",
      score: s !== null ? String(s) : "—",
      expected,
      cls,
      alert: r?.alert ?? false,
      sub: r ? `Z: ${r.z} (${r.faixa})` : ""
    });
  } else {
    const s = N(data.moca_total);
    const r = s !== null ? interpretMoCA(s, sch) : null;
    let score = s !== null ? String(s) : "—",
      cls = "—";
    if (r) {
      cls = r.valid === false ? r.msg : r.cls;
    }
    rows.push({
      test: "MoCA",
      score,
      expected: "26",
      cls,
      alert: r?.alert ?? false,
      sub: sch !== null && sch < 12 ? "Ajuste +1pt aplicado" : ""
    });
  }

  // 2. Lista de Palavras — Aprendizagem — always shown
  const t1 = (data.trial1_order || []).length,
    t2 = (data.trial2_order || []).length,
    t3 = (data.trial3_order || []).length;
  const anyTrials = t1 > 0 || t2 > 0 || t3 > 0;
  if (anyTrials) {
    const s = t1 + t2 + t3;
    const cls = s > 13 ? "Normal" : s === 13 ? "Normal (limítrofe)" : s >= 10 ? "Déficit leve" : s >= 7 ? "Déficit moderado" : "Déficit grave";
    rows.push({
      test: "Lista de Palavras — Aprendizagem",
      score: String(s),
      expected: "13",
      cls,
      alert: s < 13,
      sub: `T1:${t1} T2:${t2} T3:${t3}`
    });
  } else {
    rows.push({
      test: "Lista de Palavras — Aprendizagem",
      score: "—",
      expected: "13",
      cls: "—",
      alert: false
    });
  }

  // 3. Evocação Tardia — always shown
  const evN = (data.trial4_order || []).length;
  const evFilled = Array.isArray(data.trial4_order);
  if (evFilled) {
    const cls = evN > 3 ? "Normal" : evN === 3 ? "Normal (limítrofe)" : evN >= 2 ? "Déficit leve" : evN === 1 ? "Déficit moderado" : "Déficit grave";
    rows.push({
      test: "Evocação Tardia",
      score: String(evN),
      expected: "3",
      cls,
      alert: evN < 3
    });
  } else {
    rows.push({
      test: "Evocação Tardia",
      score: "—",
      expected: "3",
      cls: "—",
      alert: false
    });
  }

  // 4. Reconhecimento — always shown
  const recFilled = filled(data.recog_vp) || filled(data.recog_vn);
  if (recFilled) {
    const cls = recog > 7 ? "Normal" : recog === 7 ? "Normal (limítrofe)" : recog >= 5 ? "Déficit leve" : recog >= 3 ? "Déficit moderado" : "Déficit grave";
    rows.push({
      test: "Reconhecimento",
      score: String(recog),
      expected: "7",
      cls,
      alert: recog < 7
    });
  } else {
    rows.push({
      test: "Reconhecimento",
      score: "—",
      expected: "7",
      cls: "—",
      alert: false
    });
  }

  // 5. Boston — always shown
  const bosR = interpretBoston(bCheck, sch);
  if (bCheck > 0 && bosR) {
    const cls = bosR.alert ? bCheck >= bosR.cutoff - 2 ? "Déficit leve" : bCheck >= bosR.cutoff - 4 ? "Déficit moderado" : "Déficit grave" : "Normal";
    rows.push({
      test: "Nomeação Boston (20 itens)",
      score: String(bCheck),
      expected: sch !== null ? String(bosR.mean) : "—",
      cls,
      alert: bosR.alert,
      sub: bosR.note
    });
  } else {
    rows.push({
      test: "Nomeação Boston (20 itens)",
      score: "—",
      expected: sch !== null && bosR ? String(bosR.mean) : "—",
      cls: "—",
      alert: false
    });
  }

  // 6. Fluência Animais — always shown
  const fluA = interpretFluency(N(data.flu_anim_total), sch, "animais");
  rows.push({
    test: "Fluência Verbal — Animais",
    score: filled(data.flu_anim_total) ? String(data.flu_anim_total) : "—",
    expected: sch !== null && fluA ? String(fluA.cutoff) : "—",
    cls: fluA ? fluA.alert ? "Déficit leve" : "Normal" : "—",
    alert: fluA?.alert ?? false
  });

  // 7. Fluência Frutas — always shown
  const fluF = interpretFluency(N(data.flu_fruit_total), sch, "frutas");
  rows.push({
    test: "Fluência Verbal — Frutas",
    score: filled(data.flu_fruit_total) ? String(data.flu_fruit_total) : "—",
    expected: sch !== null && fluF ? String(fluF.cutoff) : "—",
    cls: fluF ? fluF.alert ? "Déficit leve" : "Normal" : "—",
    alert: fluF?.alert ?? false
  });

  // 8. Teste do Relógio — always shown
  {
    const clkVal = data.praxias_clock;
    const clkScore = filled(clkVal) ? parseInt(clkVal) : null;
    const norm = sch !== null ? clkNorm(sch) : null;
    const clkAlert = norm && clkScore !== null && clkScore <= norm.cut;
    const cls = clkScore === null ? "—" : !norm ? "—" : clkAlert ? "Déficit leve" : "Normal";
    rows.push({
      test: "Teste do Relógio",
      score: clkScore !== null ? String(clkScore) : "—",
      expected: norm ? norm.exp : "—",
      cls,
      alert: clkAlert ?? false
    });
  }

  // 9. Cópia do Cubo — always shown
  {
    const cubeVal = data.praxias_cube;
    rows.push({
      test: "Cópia do Cubo",
      score: filled(cubeVal) ? String(parseInt(cubeVal) || 0) : "—",
      expected: "—",
      cls: filled(cubeVal) ? "Normal" : "—",
      alert: false
    });
  }

  // 10. Figura de Rey — Cópia — always shown
  const rcR = interpretReyCopy(N(data.rey_copy), sch);
  if (rcR) {
    const cls = rcR.alert ? N(data.rey_copy) >= rcR.cutoff - 2 ? "Déficit leve" : "Déficit moderado" : "Normal";
    rows.push({
      test: "Figura Complexa de Rey — Cópia",
      score: String(data.rey_copy),
      expected: rcR.expected,
      cls,
      alert: rcR.alert
    });
  } else {
    rows.push({
      test: "Figura Complexa de Rey — Cópia",
      score: "—",
      expected: sch !== null ? interpretReyCopy(12, sch)?.expected ?? "—" : "—",
      cls: "—",
      alert: false
    });
  }

  // 11. Figura de Rey — Evocação — always shown
  const reR = interpretReyEvoc(N(data.rey_evoc), sch);
  if (reR) {
    const cls = reR.alert ? N(data.rey_evoc) >= reR.cutoff - 2 ? "Déficit leve" : "Déficit moderado" : "Normal";
    rows.push({
      test: "Figura Complexa de Rey — Evocação",
      score: String(data.rey_evoc),
      expected: reR.expected,
      cls,
      alert: reR.alert
    });
  } else {
    rows.push({
      test: "Figura Complexa de Rey — Evocação",
      score: "—",
      expected: sch !== null ? interpretReyEvoc(12, sch)?.expected ?? "—" : "—",
      cls: "—",
      alert: false
    });
  }
  return rows;
}
function DashboardTable({
  rows,
  warn
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dtable-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dtable-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dtable-title"
  }, "Resumo dos Resultados"), warn && /*#__PURE__*/React.createElement("span", {
    className: "dtable-warn"
  }, "\u26A0 Preencha a escolaridade para interpreta\xE7\xE3o completa")), /*#__PURE__*/React.createElement("table", {
    className: "dtable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "dtable-th"
  }, "Teste"), /*#__PURE__*/React.createElement("th", {
    className: "dtable-th dtable-center"
  }, "Pontua\xE7\xE3o do Paciente"), /*#__PURE__*/React.createElement("th", {
    className: "dtable-th dtable-center"
  }, "Pontua\xE7\xE3o Esperada"), /*#__PURE__*/React.createElement("th", {
    className: "dtable-th dtable-center"
  }, "Classifica\xE7\xE3o"))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 4,
    className: "dtable-empty"
  }, "Preencha os testes para ver os resultados")), rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    className: r.alert ? "dtable-row-alert" : ""
  }, /*#__PURE__*/React.createElement("td", {
    className: "dtable-td dtable-test"
  }, r.test, r.sub && /*#__PURE__*/React.createElement("span", {
    className: "dtable-sub"
  }, r.sub)), /*#__PURE__*/React.createElement("td", {
    className: "dtable-td dtable-center dtable-score"
  }, r.score), /*#__PURE__*/React.createElement("td", {
    className: "dtable-td dtable-center dtable-expected"
  }, r.expected), /*#__PURE__*/React.createElement("td", {
    className: `dtable-td dtable-center dtable-cls ${r.alert ? "dtable-cls-alert" : ""}`
  }, r.cls))))), /*#__PURE__*/React.createElement("div", {
    className: "dtable-note"
  }, "* Dados para Frutas extrapolados de estudos com Flu\xEAncia de Animais."));
}
function ReferencesSection() {
  return /*#__PURE__*/React.createElement("div", {
    className: "refs-section"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "refs-title"
  }, "Refer\xEAncias Bibliogr\xE1ficas"), /*#__PURE__*/React.createElement("ol", {
    className: "refs-list"
  }, REFERENCES.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r))));
}

/* ═══ SVG ═══ */
const LOGO_BRAIN_URI = "data:image/png;base64,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";
const LOGO_FULL_URI = "data:image/png;base64,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KMSTTz555E3K5/HOO++on//857z11jusra0hpaSkpISWliays7PJyMjAcRxCoRBra2usr68zNjbGxMQEN2/eZGBgQL300kt0dHSIg6xlu+tpNBo98HP0Vc/orlFj2/ae5/GznD17lvr6ej66/DG9vb386le/Vt/5zrcOfU/19fWp9957j5WVFc6cOcOFCxe+cB3ave6ysjLyd9Zy0zQxDAMp5d76tCuQqWuQe2t9TU3NVxp9tm0TDodJJuNfOAeft7YGg0FisRhlZXmUlpbiOA6GYewZg6Zp7m0aYrEYY2Nj+P1+PvjgA9577z2+973vqT/90+8dab344IMPGB0dJRqNEovFGBwc5IMPPqCzs31/lrVhpCzmkpIS/uRP/oSLFx9JPdhqZ1ItsbdDklKyvb3NwsIC169fZ3BwkOnpSV599VWGh4eZmppSf/zHf0x7+/52CllZWXu72xdffJFvfetbuN3uvUm73X0SiUTY2toiEAhw5coVRkZGePfdd9nYWCMUCqnvfve792zh3b0Jd3drh/2M7OxsLMvC7Xbv+31eb8qdaRjGHRblgc5CLGvvoXK73XubpP1ZLj9Wf/M3f8Pk5CQej4fW1lYeeughzp8/T0NDA4WFhTQ1NYrUDndYTY5PMDo6ytWrVxkaGuLq1ausrq5iWZb64V/8R7Hfxf6//bf/xs2bNzFNk/r6erq6ujh//jzt7e3k5eXh8Xj2xHp2dpa+vj56e3sZHBxkcHCQ5eVllpeX1fe//6ecP3/+rt47V65cVR999BHBYJCamhosy2J1dZW33nqL733ve4f+XI/Hs3cPPPnkk/zgBz/A48nYWyhvF2vHUWxsbDA5Ocnly5fp7+/n1q1brK2t4TiO+j//z//3587JK6+8wsDAAG+88TofffQRp06dorW19UDj/OlPf8rw8DANDQ18//vf5+LFC2md/3/5l39RP/rRj7h58ybJpENTU9Pe/XHqVBf5+fl7Itzb26umpqa4efMmN2/eJBAIMDo6yo9//GPW19f57nf/SO33WGv3Gdr9537FZL+Ck52dvSd8X0Rre5t45ZVXVP/gAKurq1y6dInvfOdbh/7enp4e+vv7yc7O5tSpU7zye5/vSdk9QnW5XLz44ou88vLLZGVl7d13u6K4K9a73o1kMr73mtzc3H2tky6XC9tO7HudsiwLj8dDJBLhpZde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";
function CircuitBrainSVG({
  className,
  full
}) {
  return /*#__PURE__*/React.createElement("img", {
    className: className,
    alt: "",
    src: full ? LOGO_FULL_URI : LOGO_BRAIN_URI,
    style: {
      objectFit: 'contain'
    }
  });
}

/* ═══ REUSABLE COMPONENTS ═══ */
function Section({
  title,
  number,
  children,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: `section ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-number"
  }, number), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "section-body"
  }, children));
}
function Field({
  label,
  children,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `field ${className}`
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, label), children);
}
function ScoreField({
  label,
  value,
  onChange,
  max,
  readOnly
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "score-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "score-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: max,
    value: value,
    onChange: e => onChange(e.target.value),
    className: `score-input ${readOnly ? "score-auto" : ""}`,
    readOnly: readOnly
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/", max)));
}
function CheckGroup({
  label,
  options,
  value,
  onChange,
  multi = false
}) {
  const h = opt => {
    if (multi) {
      const a = value || [];
      onChange(a.includes(opt) ? a.filter(v => v !== opt) : [...a, opt]);
    } else {
      onChange(value === opt ? "" : opt);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "check-group"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "check-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "check-options"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o,
    type: "button",
    className: `check-btn ${multi ? (value || []).includes(o) ? "active" : "" : value === o ? "active" : ""}`,
    onClick: () => h(o)
  }, o))));
}
function WordListTrial({
  trialNum,
  words,
  data,
  setData
}) {
  const k = `trial${trialNum}`,
    order = data[`${k}_order`] || [],
    intr = data[`${k}_intrusions`] || "";
  const toggle = w => {
    const n = order.includes(w) ? order.filter(x => x !== w) : [...order, w];
    setData({
      ...data,
      [`${k}_order`]: n
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "word-trial"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trial-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "trial-num"
  }, "Tentativa ", trialNum), /*#__PURE__*/React.createElement("span", {
    className: "trial-score"
  }, order.length, "/10")), /*#__PURE__*/React.createElement("div", {
    className: "word-chips"
  }, words.map((w, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: `word-chip ${order.includes(w) ? "selected" : ""}`,
    onClick: () => toggle(w)
  }, order.includes(w) && /*#__PURE__*/React.createElement("span", {
    className: "chip-order"
  }, order.indexOf(w) + 1), w))), /*#__PURE__*/React.createElement(Field, {
    label: "Intrus\xF5es",
    className: "intrusions-field"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: intr,
    onChange: e => setData({
      ...data,
      [`${k}_intrusions`]: e.target.value
    }),
    placeholder: "Registrar intrus\xF5es..."
  })));
}
function BostonItem({
  item,
  index,
  score,
  onChange
}) {
  const BCATS = [{
    k: "✓",
    cls: "correct"
  }, {
    k: "C",
    cls: "coord"
  }, {
    k: "A",
    cls: "anomia"
  }, {
    k: "AV",
    cls: "agnvis"
  }, {
    k: "AO",
    cls: "apropt"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "boston-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "boston-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "boston-num"
  }, index + 1, "."), /*#__PURE__*/React.createElement("span", {
    className: "boston-name"
  }, item.name)), /*#__PURE__*/React.createElement("div", {
    className: "boston-score-btns"
  }, BCATS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.k,
    type: "button",
    className: `boston-btn ${score === s.k ? "active" : ""} ${s.cls}`,
    onClick: () => onChange(score === s.k ? "" : s.k)
  }, s.k))));
}
function ProverbSection({
  proverb,
  index,
  data,
  setData
}) {
  const p = `prov${index}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "proverb-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "proverb-text"
  }, "\"", proverb.start, " ", /*#__PURE__*/React.createElement("span", {
    className: "proverb-end"
  }, "(", proverb.end, ")"), "\""), /*#__PURE__*/React.createElement("div", {
    className: "proverb-checks"
  }, /*#__PURE__*/React.createElement(CheckGroup, {
    label: "Completou:",
    options: ["Sim", "Não"],
    value: data[`${p}_completou`] || "",
    onChange: v => setData({
      ...data,
      [`${p}_completou`]: v
    })
  }), /*#__PURE__*/React.createElement(CheckGroup, {
    label: "Interpretou:",
    options: ["Sim", "Escolheu alternativa certa", "Não interpretou"],
    value: data[`${p}_interpretou`] || "",
    onChange: v => setData({
      ...data,
      [`${p}_interpretou`]: v
    })
  })));
}
function FlowTimer({
  label,
  data,
  setData,
  prefix
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flow-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flow-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "flow-total"
  }, /*#__PURE__*/React.createElement("span", null, "Total:"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: data[`${prefix}_total`] || "",
    onChange: e => setData({
      ...data,
      [`${prefix}_total`]: e.target.value
    }),
    className: "score-input small"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flow-intervals"
  }, ["00-15s", "16-30s", "31-45s", "45-60s"].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flow-interval"
  }, /*#__PURE__*/React.createElement("span", {
    className: "interval-label"
  }, i), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data[`${prefix}_${i}`] || "",
    onChange: e => setData({
      ...data,
      [`${prefix}_${i}`]: e.target.value
    }),
    placeholder: "Palavras..."
  })))));
}

/* ═══════════════════════════════════
   MoCA FORM SECTION
   ═══════════════════════════════════ */
function MocaForm({
  data,
  set
}) {
  const mocaSub = MOCA_SUBTRACTION.filter(s => data[s.key]).length;
  const mocaSubScore = mocaSub >= 4 ? 3 : mocaSub === 3 ? 2 : mocaSub === 2 ? 2 : mocaSub === 1 ? 1 : 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    title: "Visuoespacial / Executiva",
    number: "V"
  }, /*#__PURE__*/React.createElement("div", {
    className: "moca-subsec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-grid",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr"
    }
  }, [{
    key: "moca_trilha",
    label: "Trilha alternada (1-A-2-B...)",
    max: 1
  }, {
    key: "moca_cubo",
    label: "Cópia do cubo",
    max: 1
  }].map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: it.max,
    value: data[it.key] || "",
    onChange: e => set(it.key, e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/", it.max)))), /*#__PURE__*/React.createElement("div", {
    className: "meem-item",
    style: {
      gridColumn: "span 1"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, "Rel\xF3gio (11:10)"))), /*#__PURE__*/React.createElement("div", {
    className: "meem-grid",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr",
      marginTop: 6
    }
  }, [{
    key: "moca_rel_contorno",
    label: "Contorno",
    max: 1
  }, {
    key: "moca_rel_numeros",
    label: "Números",
    max: 1
  }, {
    key: "moca_rel_ponteiros",
    label: "Ponteiros",
    max: 1
  }].map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: it.max,
    value: data[it.key] || "",
    onChange: e => set(it.key, e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/", it.max))))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL VISUOESPACIAL",
    value: data.moca_visuo_total || "",
    onChange: () => {},
    max: 5,
    readOnly: true
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "Nomea\xE7\xE3o",
    number: "N"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-grid",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr"
    }
  }, [{
    key: "moca_nome_leao",
    label: "Leão"
  }, {
    key: "moca_nome_rino",
    label: "Rinoceronte"
  }, {
    key: "moca_nome_camelo",
    label: "Dromedário/Camelo"
  }].map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data[it.key] || "",
    onChange: e => set(it.key, e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1"))))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL NOMEA\xC7\xC3O",
    value: data.moca_nome_total || "",
    onChange: () => {},
    max: 3,
    readOnly: true
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Mem\xF3ria (Registro)",
    number: "M"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text3)",
      marginBottom: 10
    }
  }, "Marque as palavras que o sujeito repetiu corretamente. Sem pontua\xE7\xE3o \u2014 apenas registro."), /*#__PURE__*/React.createElement("div", {
    className: "moca-mem-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "moca-mem-header"
  }, /*#__PURE__*/React.createElement("span", null), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w,
    className: "moca-mem-word"
  }, w))), [1, 2].map(trial => /*#__PURE__*/React.createElement("div", {
    key: trial,
    className: "moca-mem-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "moca-mem-label"
  }, trial, "\xAA tentativa"), MOCA_MEM_WORDS.map(w => {
    const k = `moca_mem_t${trial}_${w.toLowerCase()}`;
    return /*#__PURE__*/React.createElement("button", {
      key: w,
      type: "button",
      className: `moca-mem-btn ${data[k] ? "active" : ""}`,
      onClick: () => set(k, !data[k])
    }, data[k] ? "✓" : "—");
  }))))), /*#__PURE__*/React.createElement(Section, {
    title: "Aten\xE7\xE3o",
    number: "A"
  }, /*#__PURE__*/React.createElement("div", {
    className: "moca-subsec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, "Sequ\xEAncia direta (2 1 8 5 4)"), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_digit_dir || "",
    onChange: e => set("moca_digit_dir", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1"))), /*#__PURE__*/React.createElement("div", {
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, "Sequ\xEAncia inversa (7 4 2)"), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_digit_inv || "",
    onChange: e => set("moca_digit_inv", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1")))), /*#__PURE__*/React.createElement("div", {
    className: "meem-item",
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, "Vigil\xE2ncia \u2014 Letra \"A\" (\u2264 1 erro)"), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_vigilancia || "",
    onChange: e => set("moca_vigilancia", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Subtra\xE7\xE3o serial (100 \u2212 7)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "moca-sub-row"
  }, MOCA_SUBTRACTION.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    type: "button",
    className: `moca-sub-btn ${data[s.key] ? "active" : ""}`,
    onClick: () => set(s.key, !data[s.key])
  }, /*#__PURE__*/React.createElement("span", {
    className: "moca-sub-num"
  }, s.label), data[s.key] ? "✓" : "—")), /*#__PURE__*/React.createElement("div", {
    className: "moca-sub-result"
  }, "Corretas: ", mocaSub, " \u2192 ", /*#__PURE__*/React.createElement("strong", null, mocaSubScore, "/3"))))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL ATEN\xC7\xC3O",
    value: data.moca_attn_total || "",
    onChange: () => {},
    max: 6,
    readOnly: true
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "Linguagem",
    number: "L"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label",
    style: {
      fontSize: 11
    }
  }, "Frase 1: \"Eu somente sei que \xE9 Jo\xE3o quem ser\xE1 ajudado hoje.\""), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_frase1 || "",
    onChange: e => set("moca_frase1", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1"))), /*#__PURE__*/React.createElement("div", {
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label",
    style: {
      fontSize: 11
    }
  }, "Frase 2: \"O gato sempre se esconde embaixo do sof\xE1 quando o cachorro est\xE1 na sala.\""), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_frase2 || "",
    onChange: e => set("moca_frase2", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1")))), /*#__PURE__*/React.createElement("div", {
    className: "meem-item",
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, "Flu\xEAncia verbal \u2014 Letra F (1 minuto, N \u2265 11)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "N\xBA palavras"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: data.moca_fluencia_n || "",
    onChange: e => set("moca_fluencia_n", e.target.value),
    style: {
      width: 70
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_fluencia || "",
    onChange: e => set("moca_fluencia", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1")))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL LINGUAGEM",
    value: data.moca_ling_total || "",
    onChange: () => {},
    max: 3,
    readOnly: true
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Abstra\xE7\xE3o",
    number: "Ab"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, "Trem \u2014 Bicicleta"), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_abst1 || "",
    onChange: e => set("moca_abst1", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1"))), /*#__PURE__*/React.createElement("div", {
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, "Rel\xF3gio \u2014 R\xE9gua"), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data.moca_abst2 || "",
    onChange: e => set("moca_abst2", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1")))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL ABSTRA\xC7\xC3O",
    value: data.moca_abst_total || "",
    onChange: () => {},
    max: 2,
    readOnly: true
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Evoca\xE7\xE3o Tardia",
    number: "ET"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--text3)",
      marginBottom: 10
    }
  }, "Pontua\xE7\xE3o apenas para evoca\xE7\xE3o SEM pistas."), /*#__PURE__*/React.createElement("div", {
    className: "moca-mem-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "moca-mem-header"
  }, /*#__PURE__*/React.createElement("span", null), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w,
    className: "moca-mem-word"
  }, w))), /*#__PURE__*/React.createElement("div", {
    className: "moca-mem-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "moca-mem-label"
  }, "Sem pistas"), MOCA_MEM_WORDS.map(w => {
    const k = `moca_evoc_${w.toLowerCase()}`;
    return /*#__PURE__*/React.createElement("button", {
      key: w,
      type: "button",
      className: `moca-mem-btn ${data[k] ? "active" : ""}`,
      onClick: () => set(k, !data[k])
    }, data[k] ? "✓" : "—");
  })), /*#__PURE__*/React.createElement("div", {
    className: "moca-mem-row moca-mem-opt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "moca-mem-label"
  }, "Pista categoria"), MOCA_MEM_WORDS.map(w => {
    const k = `moca_evoc_cat_${w.toLowerCase()}`;
    return /*#__PURE__*/React.createElement("button", {
      key: w,
      type: "button",
      className: `moca-mem-btn moca-opt ${data[k] ? "active" : ""}`,
      onClick: () => set(k, !data[k])
    }, data[k] ? "✓" : "—");
  })), /*#__PURE__*/React.createElement("div", {
    className: "moca-mem-row moca-mem-opt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "moca-mem-label"
  }, "Pista m\xFAlt. escolha"), MOCA_MEM_WORDS.map(w => {
    const k = `moca_evoc_mult_${w.toLowerCase()}`;
    return /*#__PURE__*/React.createElement("button", {
      key: w,
      type: "button",
      className: `moca-mem-btn moca-opt ${data[k] ? "active" : ""}`,
      onClick: () => set(k, !data[k])
    }, data[k] ? "✓" : "—");
  }))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL EVOCA\xC7\xC3O",
    value: data.moca_evoc_total || "",
    onChange: () => {},
    max: 5,
    readOnly: true
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Orienta\xE7\xE3o",
    number: "O"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-grid",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr"
    }
  }, [{
    key: "moca_ori_diames",
    label: "Dia do mês"
  }, {
    key: "moca_ori_mes",
    label: "Mês"
  }, {
    key: "moca_ori_ano",
    label: "Ano"
  }, {
    key: "moca_ori_diasem",
    label: "Dia da semana"
  }, {
    key: "moca_ori_lugar",
    label: "Lugar"
  }, {
    key: "moca_ori_cidade",
    label: "Cidade"
  }].map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: 1,
    value: data[it.key] || "",
    onChange: e => set(it.key, e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/1"))))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL ORIENTA\xC7\xC3O",
    value: data.moca_ori_total || "",
    onChange: () => {},
    max: 6,
    readOnly: true
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Pontua\xE7\xE3o Total MoCA",
    number: "\u03A3",
    className: "section-highlight"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL",
    value: data.moca_total || "",
    onChange: () => {},
    max: 30,
    readOnly: true
  }), /*#__PURE__*/React.createElement(CheckGroup, {
    label: "Escolaridade \u2264 12 anos (+1pt):",
    options: ["Sim", "Não"],
    value: data.moca_escolaridade || "",
    onChange: v => set("moca_escolaridade", v)
  }))));
}

/* ═══════════════════════════════════
   MoCA PRINT SECTIONS
   ═══════════════════════════════════ */
function MocaPrintSections({
  data,
  V,
  Score
}) {
  const mocaSub = MOCA_SUBTRACTION.filter(s => data[s.key]).length;
  const mocaSubScore = mocaSub >= 4 ? 3 : mocaSub === 3 ? 2 : mocaSub === 2 ? 2 : mocaSub === 1 ? 1 : 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "V"), "Visuoespacial / Executiva"), /*#__PURE__*/React.createElement("div", {
    className: "pv-mg",
    style: {
      gridTemplateColumns: "1fr 1fr 1fr"
    }
  }, [{
    k: "moca_trilha",
    l: "Trilha alternada"
  }, {
    k: "moca_cubo",
    l: "Cópia do cubo"
  }, {
    k: "moca_rel_contorno",
    l: "Relógio — Contorno"
  }, {
    k: "moca_rel_numeros",
    l: "Relógio — Números"
  }, {
    k: "moca_rel_ponteiros",
    l: "Relógio — Ponteiros"
  }].map(it => /*#__PURE__*/React.createElement("div", {
    key: it.k,
    className: "pv-mr"
  }, /*#__PURE__*/React.createElement("span", null, it.l), /*#__PURE__*/React.createElement(Score, {
    v: data[it.k],
    max: 1
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pv-mr pv-mt",
    style: {
      gridColumn: "1/-1"
    }
  }, /*#__PURE__*/React.createElement("span", null, "TOTAL VISUOESPACIAL"), /*#__PURE__*/React.createElement(Score, {
    v: data.moca_visuo_total,
    max: 5
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "N"), "Nomea\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, [{
    k: "moca_nome_leao",
    l: "Leão"
  }, {
    k: "moca_nome_rino",
    l: "Rinoceronte"
  }, {
    k: "moca_nome_camelo",
    l: "Dromedário"
  }].map(it => /*#__PURE__*/React.createElement("span", {
    key: it.k
  }, it.l, ": ", /*#__PURE__*/React.createElement("strong", null, V(data[it.k]), "/1"))), /*#__PURE__*/React.createElement("span", {
    className: "pv-rct"
  }, "Total: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_nome_total), "/3")))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "M"), "Mem\xF3ria (Registro)"), /*#__PURE__*/React.createElement("div", {
    className: "pv-mem-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-mem-hdr"
  }, /*#__PURE__*/React.createElement("span", null), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w
  }, w))), [1, 2].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "pv-mem-r"
  }, /*#__PURE__*/React.createElement("span", null, t, "\xAA tent."), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w,
    className: data[`moca_mem_t${t}_${w.toLowerCase()}`] ? "pv-mem-ok" : ""
  }, data[`moca_mem_t${t}_${w.toLowerCase()}`] ? "✓" : "—")))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "A"), "Aten\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il",
    style: {
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "Seq. direta: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_digit_dir), "/1")), /*#__PURE__*/React.createElement("span", null, "Seq. inversa: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_digit_inv), "/1")), /*#__PURE__*/React.createElement("span", null, "Vigil\xE2ncia: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_vigilancia), "/1"))), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, /*#__PURE__*/React.createElement("span", null, "Subtra\xE7\xE3o serial: ", MOCA_SUBTRACTION.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.key,
    style: {
      marginRight: 4,
      fontWeight: data[s.key] ? 700 : 400,
      color: data[s.key] ? "var(--green-dark)" : "var(--text3)"
    }
  }, s.label, data[s.key] ? "✓" : "")), " \u2192 ", /*#__PURE__*/React.createElement("strong", null, mocaSubScore, "/3"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 11
    }
  }, "Total: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_attn_total), "/6"))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "L"), "Linguagem"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, /*#__PURE__*/React.createElement("span", null, "Frase 1: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_frase1), "/1")), /*#__PURE__*/React.createElement("span", null, "Frase 2: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_frase2), "/1")), /*#__PURE__*/React.createElement("span", null, "Flu\xEAncia F: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_fluencia), "/1"), " (", V(data.moca_fluencia_n), " palavras)"), /*#__PURE__*/React.createElement("span", {
    className: "pv-rct"
  }, "Total: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_ling_total), "/3")))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "Ab"), "Abstra\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, /*#__PURE__*/React.createElement("span", null, "Trem\u2013Bicicleta: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_abst1), "/1")), /*#__PURE__*/React.createElement("span", null, "Rel\xF3gio\u2013R\xE9gua: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_abst2), "/1")), /*#__PURE__*/React.createElement("span", {
    className: "pv-rct"
  }, "Total: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_abst_total), "/2")))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "ET"), "Evoca\xE7\xE3o Tardia"), /*#__PURE__*/React.createElement("div", {
    className: "pv-mem-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-mem-hdr"
  }, /*#__PURE__*/React.createElement("span", null), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w
  }, w))), /*#__PURE__*/React.createElement("div", {
    className: "pv-mem-r"
  }, /*#__PURE__*/React.createElement("span", null, "Sem pistas"), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w,
    className: data[`moca_evoc_${w.toLowerCase()}`] ? "pv-mem-ok" : ""
  }, data[`moca_evoc_${w.toLowerCase()}`] ? "✓" : "—"))), /*#__PURE__*/React.createElement("div", {
    className: "pv-mem-r",
    style: {
      opacity: .6
    }
  }, /*#__PURE__*/React.createElement("span", null, "Cat."), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w
  }, data[`moca_evoc_cat_${w.toLowerCase()}`] ? "✓" : "—"))), /*#__PURE__*/React.createElement("div", {
    className: "pv-mem-r",
    style: {
      opacity: .6
    }
  }, /*#__PURE__*/React.createElement("span", null, "M\xFAlt."), MOCA_MEM_WORDS.map(w => /*#__PURE__*/React.createElement("span", {
    key: w
  }, data[`moca_evoc_mult_${w.toLowerCase()}`] ? "✓" : "—")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 11
    }
  }, "Total (sem pistas): ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_evoc_total), "/5"))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "O"), "Orienta\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, [{
    k: "moca_ori_diames",
    l: "Dia"
  }, {
    k: "moca_ori_mes",
    l: "Mês"
  }, {
    k: "moca_ori_ano",
    l: "Ano"
  }, {
    k: "moca_ori_diasem",
    l: "Dia sem."
  }, {
    k: "moca_ori_lugar",
    l: "Lugar"
  }, {
    k: "moca_ori_cidade",
    l: "Cidade"
  }].map(it => /*#__PURE__*/React.createElement("span", {
    key: it.k
  }, it.l, ": ", /*#__PURE__*/React.createElement("strong", null, V(data[it.k])))), /*#__PURE__*/React.createElement("span", {
    className: "pv-rct"
  }, "Total: ", /*#__PURE__*/React.createElement("strong", null, V(data.moca_ori_total), "/6")))));
}

/* ═══════════════════════════════════
   PRINT VIEW
   ═══════════════════════════════════ */
function PrintView({
  data,
  computed,
  onClose
}) {
  const {
    bostonCheckCount: bC,
    bostonErrors: bE,
    bCoord,
    bAnomia,
    bAgnVis,
    bAprOpt,
    recogTotal: rT,
    testType
  } = computed;
  const doPrint = () => {
    const pageEl = document.querySelector('.print-page');
    if (!pageEl) return;
    const styleEl = document.querySelector('style');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Avaliação Neurocognitiva</title><style>${styleEl ? styleEl.textContent : ''}
      body{margin:0;padding:0;background:#fff;font-family:'DM Sans',-apple-system,sans-serif;}
      .no-print{display:none!important;}
      .print-page{width:100%;margin:0;padding:14px 18px;box-shadow:none;border-radius:0;}
      .pv-sec{break-inside:avoid;}.pv-hdr{break-after:avoid;}.pv-sbar{break-inside:avoid;}
      @page{margin:10mm 8mm 14mm 8mm;size:A4;@bottom-center{content:"Página " counter(page) " de " counter(pages);font-family:'DM Sans',sans-serif;font-size:8px;color:#8896a6;}}
    </style></head><body>${pageEl.outerHTML}</body></html>`;
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;top:-99999px;left:-99999px;width:210mm;height:297mm;border:none;';
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    iframe.onload = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        } catch (e) {}
        setTimeout(() => {
          try {
            document.body.removeChild(iframe);
          } catch (e) {}
        }, 2000);
      }, 300);
    };
  };
  const V = v => v || v === 0 ? v : "—";
  const Score = ({
    v,
    max
  }) => /*#__PURE__*/React.createElement("span", {
    className: "pv-score"
  }, V(v), /*#__PURE__*/React.createElement("span", {
    className: "pv-max"
  }, "/", max));
  const fmtDate = d => {
    if (!d) return "—";
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };
  const wt = n => ({
    order: data[`trial${n}_order`] || [],
    intr: data[`trial${n}_intrusions`] || ""
  });
  const isMoCA = testType === "moca";
  const testLabel = isMoCA ? "MoCA" : "MEEM";
  const testTotal = isMoCA ? data.moca_total : data.meem_total;
  return /*#__PURE__*/React.createElement("div", {
    className: "print-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "print-bar no-print"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "print-back-btn"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M12 19l-7-7 7-7"
  })), "Voltar ao formul\xE1rio"), /*#__PURE__*/React.createElement("span", {
    className: "print-bar-title"
  }, "Pr\xE9-visualiza\xE7\xE3o \u2014 ", testLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text3)'
    }
  }, "ou use Ctrl+P"), /*#__PURE__*/React.createElement("button", {
    onClick: doPrint,
    className: "print-now-btn"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "14",
    width: "12",
    height: "8"
  })), "Imprimir"))), /*#__PURE__*/React.createElement("div", {
    className: "print-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-hdr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-hdr-left"
  }, /*#__PURE__*/React.createElement(CircuitBrainSVG, {
    className: "pv-brain"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "pv-h1"
  }, "Avalia\xE7\xE3o Neurocognitiva"), /*#__PURE__*/React.createElement("p", {
    className: "pv-h2"
  }, isMoCA ? "Montreal Cognitive Assessment (MoCA) — UNIFESP" : "Avaliação Neurocognitiva — V-01"), /*#__PURE__*/React.createElement("p", {
    className: "pv-h3"
  }, "Dr. Hugo Ary Oliveira Silva \u2014 Neurologista Cogni\xE7\xE3o e Comportamento \xB7 CRM-DF 19610 \xB7 RQE 17996"))), /*#__PURE__*/React.createElement("div", {
    className: "pv-hdr-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-hf"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-hl"
  }, "Paciente:"), " ", /*#__PURE__*/React.createElement("strong", null, V(data.initials))), /*#__PURE__*/React.createElement("div", {
    className: "pv-hf"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-hl"
  }, "Data:"), " ", /*#__PURE__*/React.createElement("strong", null, fmtDate(data.date)), " ", /*#__PURE__*/React.createElement("span", {
    className: "pv-hl",
    style: {
      marginLeft: 8
    }
  }, "Nasc.:"), " ", /*#__PURE__*/React.createElement("strong", null, fmtDate(data.birthdate))), /*#__PURE__*/React.createElement("div", {
    className: "pv-hf"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-hl"
  }, "Sexo:"), " ", /*#__PURE__*/React.createElement("strong", null, V(data.gender)), " ", /*#__PURE__*/React.createElement("span", {
    className: "pv-hl",
    style: {
      marginLeft: 8
    }
  }, "Escol.:"), " ", /*#__PURE__*/React.createElement("strong", null, V(data.schooling), " anos"), " ", /*#__PURE__*/React.createElement("span", {
    className: "pv-hl",
    style: {
      marginLeft: 8
    }
  }, "Dom.:"), " ", /*#__PURE__*/React.createElement("strong", null, V(data.dominance))))), isMoCA ? /*#__PURE__*/React.createElement(MocaPrintSections, {
    data: data,
    V: V,
    Score: Score
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.1"), "Miniexame do Estado Mental"), /*#__PURE__*/React.createElement("div", {
    className: "pv-mg"
  }, MEEM_ITEMS.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    className: "pv-mr"
  }, /*#__PURE__*/React.createElement("span", null, it.label), /*#__PURE__*/React.createElement(Score, {
    v: data[it.key],
    max: it.max
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pv-mr pv-mt"
  }, /*#__PURE__*/React.createElement("span", null, "TOTAL"), /*#__PURE__*/React.createElement(Score, {
    v: data.meem_total,
    max: 30
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, isMoCA ? "4.2" : "4.2a"), "Lista de Palavras"), [{
    n: 1,
    w: WORD_LIST
  }, {
    n: 2,
    w: WORD_LIST_ALT2
  }, {
    n: 3,
    w: WORD_LIST_ALT3
  }].map(({
    n,
    w
  }) => {
    const t = wt(n);
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      className: "pv-wt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pv-wth"
    }, /*#__PURE__*/React.createElement("strong", null, "Tentativa ", n), /*#__PURE__*/React.createElement("span", {
      className: "pv-wts"
    }, t.order.length, "/10")), /*#__PURE__*/React.createElement("div", {
      className: "pv-wr"
    }, w.map((word, i) => {
      const idx = t.order.indexOf(word);
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: `pv-w ${idx >= 0 ? "pv-wh" : ""}`
      }, idx >= 0 && /*#__PURE__*/React.createElement("sup", null, idx + 1), word);
    })), t.intr && /*#__PURE__*/React.createElement("div", {
      className: "pv-intr"
    }, "Intrus\xF5es: ", t.intr));
  })), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.3"), "Boston Reduzido"), /*#__PURE__*/React.createElement("div", {
    className: "pv-bg"
  }, BOSTON_ITEMS.map((it, i) => {
    const s = data.boston_scores[i];
    const cls = s ? {
      "✓": "ok",
      "C": "co",
      "A": "an",
      "AV": "av",
      "AO": "ao"
    }[s] || "" : "";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `pv-bi ${cls ? "pv-b" + cls : ""}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "pv-bn"
    }, i + 1, "."), /*#__PURE__*/React.createElement("span", {
      className: "pv-bm"
    }, it.name), /*#__PURE__*/React.createElement("span", {
      className: "pv-bs"
    }, s || "—"));
  })), /*#__PURE__*/React.createElement("div", {
    className: "pv-bt"
  }, /*#__PURE__*/React.createElement("span", null, "Acertos (\u2713): ", /*#__PURE__*/React.createElement("strong", null, bC, "/20")), /*#__PURE__*/React.createElement("span", null, "C: ", /*#__PURE__*/React.createElement("strong", null, bCoord)), /*#__PURE__*/React.createElement("span", null, "A: ", /*#__PURE__*/React.createElement("strong", null, bAnomia)), /*#__PURE__*/React.createElement("span", null, "AV: ", /*#__PURE__*/React.createElement("strong", null, bAgnVis)), /*#__PURE__*/React.createElement("span", null, "AO: ", /*#__PURE__*/React.createElement("strong", null, bAprOpt)))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.4"), "Digit Span"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, /*#__PURE__*/React.createElement("span", null, "Direto: ", /*#__PURE__*/React.createElement("strong", null, V(data.digit_direct))), /*#__PURE__*/React.createElement("span", null, "Inverso: ", /*#__PURE__*/React.createElement("strong", null, V(data.digit_inverse))))), (() => {
    const t = wt(4);
    return /*#__PURE__*/React.createElement("div", {
      className: "pv-sec"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "pv-st"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pv-sn"
    }, "4.2b"), "Evoca\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
      className: "pv-wt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pv-wth"
    }, /*#__PURE__*/React.createElement("strong", null, "Evoca\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
      className: "pv-wts"
    }, t.order.length, "/10")), /*#__PURE__*/React.createElement("div", {
      className: "pv-wr"
    }, WORD_LIST.map((word, i) => {
      const idx = t.order.indexOf(word);
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: `pv-w ${idx >= 0 ? "pv-wh" : ""}`
      }, idx >= 0 && /*#__PURE__*/React.createElement("sup", null, idx + 1), word);
    })), t.intr && /*#__PURE__*/React.createElement("div", {
      className: "pv-intr"
    }, "Intrus\xF5es: ", t.intr)));
  })(), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.2c"), "Reconhecimento"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, /*#__PURE__*/React.createElement("span", null, "VP: ", /*#__PURE__*/React.createElement("strong", null, V(data.recog_vp))), /*#__PURE__*/React.createElement("span", null, "VN: ", /*#__PURE__*/React.createElement("strong", null, V(data.recog_vn))), /*#__PURE__*/React.createElement("span", null, "FP: ", /*#__PURE__*/React.createElement("strong", null, V(data.recog_fp))), /*#__PURE__*/React.createElement("span", null, "FN: ", /*#__PURE__*/React.createElement("strong", null, V(data.recog_fn))), /*#__PURE__*/React.createElement("span", {
    className: "pv-rct"
  }, "VP+VN\u221210 = ", /*#__PURE__*/React.createElement("strong", null, rT, "/10")))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.5"), "Flu\xEAncia Verbal"), /*#__PURE__*/React.createElement("div", {
    className: "pv-fr"
  }, [{
    l: "Animais",
    p: "flu_anim"
  }, {
    l: "Frutas",
    p: "flu_fruit"
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.p,
    className: "pv-fb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-fh"
  }, /*#__PURE__*/React.createElement("strong", null, f.l), /*#__PURE__*/React.createElement("span", null, "Total: ", /*#__PURE__*/React.createElement("strong", null, V(data[`${f.p}_total`])))), ["00-15s", "16-30s", "31-45s", "45-60s"].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pv-fi"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-fl"
  }, i), /*#__PURE__*/React.createElement("span", null, data[`${f.p}_${i}`] || "—"))))))), !isMoCA && /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.6"), "Praxias"), /*#__PURE__*/React.createElement("div", {
    className: "pv-pr"
  }, PRAXIA_ITEMS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.key,
    className: "pv-pi"
  }, /*#__PURE__*/React.createElement("span", null, p.name), /*#__PURE__*/React.createElement(Score, {
    v: data[p.key],
    max: p.max
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pv-gr"
  }, /*#__PURE__*/React.createElement("strong", null, "Gestos:"), GESTURES.map(g => /*#__PURE__*/React.createElement("span", {
    key: g.id
  }, g.name, ": ", /*#__PURE__*/React.createElement("strong", null, V(data.gestures[g.id]), "/", g.max))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.7"), "Figura de Rey"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, /*#__PURE__*/React.createElement("span", null, "C\xF3pia: ", /*#__PURE__*/React.createElement("strong", null, V(data.rey_copy), "/12")), /*#__PURE__*/React.createElement("span", null, "Evoca\xE7\xE3o: ", /*#__PURE__*/React.createElement("strong", null, V(data.rey_evoc), "/12")))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.8"), "Leitura e Compreens\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, /*#__PURE__*/React.createElement("span", null, "Leitura: ", /*#__PURE__*/React.createElement("strong", null, V(data.reading))), /*#__PURE__*/React.createElement("span", null, "Compreens\xE3o: ", /*#__PURE__*/React.createElement("strong", null, V(data.comprehension))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec pv-si2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.9"), "Emparelhamento"), /*#__PURE__*/React.createElement("div", {
    className: "pv-il"
  }, ["relógio", "cama", "peso", "binóculo"].map(w => /*#__PURE__*/React.createElement("span", {
    key: w
  }, w, ": ", /*#__PURE__*/React.createElement("strong", null, V(data[`match_${w}`])))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "4.10"), "Prov\xE9rbios"), PROVERBS.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pv-pv"
  }, /*#__PURE__*/React.createElement("em", null, "\"", p.start, " (", p.end, ")\""), /*#__PURE__*/React.createElement("span", null, "Completou: ", /*#__PURE__*/React.createElement("strong", null, V(data[`prov${i}_completou`]))), /*#__PURE__*/React.createElement("span", null, "Interpretou: ", /*#__PURE__*/React.createElement("strong", null, V(data[`prov${i}_interpretou`])))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "5"), "Diagn\xF3stico Neurocognitivo"), /*#__PURE__*/React.createElement("p", {
    className: "pv-tb"
  }, data.neuro_diag || "—")), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "6"), "Impress\xE3o Diagn\xF3stica"), /*#__PURE__*/React.createElement("div", {
    className: "pv-dg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-dr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-dl"
  }, "Sindr\xF4mico:"), /*#__PURE__*/React.createElement("span", null, data.diag_sindromico || "—")), /*#__PURE__*/React.createElement("div", {
    className: "pv-dr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-dl"
  }, "Topogr\xE1fico:"), /*#__PURE__*/React.createElement("span", null, data.diag_topografico || "—")), /*#__PURE__*/React.createElement("div", {
    className: "pv-dr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-dl"
  }, "Etiol\xF3gico:"), /*#__PURE__*/React.createElement("span", null, data.diag_etiologico || "—")))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "7"), "Condutas"), /*#__PURE__*/React.createElement("p", {
    className: "pv-tb"
  }, data.condutas || "—")), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "8"), "Examinador"), /*#__PURE__*/React.createElement("p", {
    className: "pv-tb"
  }, data.examiner || "—")), (() => {
    const rows = buildDashboardRows(data, testType, bC, rT);
    return rows.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "pv-sec pv-dash-sec"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "pv-st",
      style: {
        padding: '8px 10px',
        marginBottom: 0,
        background: 'linear-gradient(135deg,#1a2332,var(--accent-dark))',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pv-sn",
      style: {
        background: '#fff',
        color: 'var(--accent-dark)'
      }
    }, "\u03A3"), "Resumo dos Resultados"), /*#__PURE__*/React.createElement("table", {
      className: "pv-dtable"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Teste"), /*#__PURE__*/React.createElement("th", null, "Pont. Paciente"), /*#__PURE__*/React.createElement("th", null, "Pont. Esperada"), /*#__PURE__*/React.createElement("th", null, "Classifica\xE7\xE3o"))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
      key: i,
      className: r.alert ? "pv-dtr-alert" : ""
    }, /*#__PURE__*/React.createElement("td", null, r.test, r.sub ? /*#__PURE__*/React.createElement("span", {
      className: "pv-dtr-sub"
    }, " \u2014 ", r.sub) : ""), /*#__PURE__*/React.createElement("td", {
      className: "pv-dtc"
    }, r.score), /*#__PURE__*/React.createElement("td", {
      className: "pv-dtc"
    }, r.expected), /*#__PURE__*/React.createElement("td", {
      className: `pv-dtc ${r.alert ? "pv-dtc-alert" : ""}`
    }, r.cls))))), /*#__PURE__*/React.createElement("div", {
      className: "pv-dash-note"
    }, "* Dados para Frutas extrapolados de estudos com Flu\xEAncia de Animais."));
  })(), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pv-st"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-sn"
  }, "Ref"), "Refer\xEAncias Bibliogr\xE1ficas"), /*#__PURE__*/React.createElement("div", {
    className: "pv-refs"
  }, REFERENCES.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pv-ref"
  }, i + 1, ". ", r)))), /*#__PURE__*/React.createElement("div", {
    className: "pv-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-foot-wm"
  }, /*#__PURE__*/React.createElement(CircuitBrainSVG, {
    className: "pv-foot-logo",
    full: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "pv-foot-meta"
  }, /*#__PURE__*/React.createElement("span", null, V(data.initials), " \u2014 ", fmtDate(data.date))))));
}

/* ═══════════════════════════════════
   MAIN
   ═══════════════════════════════════ */
function NeuroCogAssessment() {
  const [data, setData] = useState({
    initials: "",
    date: new Date().toISOString().split("T")[0],
    dominance: "",
    birthdate: "",
    gender: "",
    schooling: "",
    meem_total: "",
    meem_orient_temp: "",
    meem_orient_spat: "",
    meem_mem_imm: "",
    meem_attn: "",
    meem_mem_evoc: "",
    meem_naming: "",
    meem_repetition: "",
    meem_verbal_cmd: "",
    meem_written_cmd: "",
    meem_phrase: "",
    meem_drawing: "",
    boston_scores: {},
    digit_direct: "",
    digit_inverse: "",
    recog_vp: "",
    recog_vn: "",
    recog_fp: "",
    recog_fn: "",
    praxias_clock: "",
    praxias_cube: "",
    praxias_rect: "",
    praxias_diamond: "",
    praxias_circle: "",
    gestures: {},
    rey_copy: "",
    rey_evoc: "",
    reading: "",
    comprehension: "",
    match_relogio: "",
    match_cama: "",
    match_peso: "",
    match_binoculo: "",
    neuro_diag: "",
    diag_sindromico: "",
    diag_topografico: "",
    diag_etiologico: "",
    condutas: "",
    examiner: "",
    // MoCA fields
    moca_trilha: "",
    moca_cubo: "",
    moca_rel_contorno: "",
    moca_rel_numeros: "",
    moca_rel_ponteiros: "",
    moca_visuo_total: "",
    moca_nome_leao: "",
    moca_nome_rino: "",
    moca_nome_camelo: "",
    moca_nome_total: "",
    moca_digit_dir: "",
    moca_digit_inv: "",
    moca_vigilancia: "",
    moca_sub93: false,
    moca_sub86: false,
    moca_sub79: false,
    moca_sub72: false,
    moca_sub65: false,
    moca_attn_total: "",
    moca_frase1: "",
    moca_frase2: "",
    moca_fluencia: "",
    moca_fluencia_n: "",
    moca_ling_total: "",
    moca_abst1: "",
    moca_abst2: "",
    moca_abst_total: "",
    moca_evoc_total: "",
    moca_ori_diames: "",
    moca_ori_mes: "",
    moca_ori_ano: "",
    moca_ori_diasem: "",
    moca_ori_lugar: "",
    moca_ori_cidade: "",
    moca_ori_total: "",
    moca_total: "",
    moca_escolaridade: ""
  });
  const [showPrint, setShowPrint] = useState(false);
  const [testType, setTestType] = useState("meem"); // "meem" | "moca"

  const set = (k, v) => setData(p => ({
    ...p,
    [k]: v
  }));
  const setBos = (i, v) => setData(p => ({
    ...p,
    boston_scores: {
      ...p.boston_scores,
      [i]: v
    }
  }));
  const setGes = (i, v) => setData(p => ({
    ...p,
    gestures: {
      ...p.gestures,
      [i]: v
    }
  }));
  const fileInputRef = useRef(null);
  function saveToFile() {
    const name = data.initials ? data.initials.trim().replace(/\s+/g, "_") : "avaliacao";
    const date = data.date || new Date().toISOString().split("T")[0];
    const filename = `${name}_${date}.navcog`;
    const content = JSON.stringify({
      version: 1,
      testType,
      data
    }, null, 2);
    const blob = new Blob([content], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  function handleLoadFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.data) setData(parsed.data);
        if (parsed.testType) setTestType(parsed.testType);
      } catch {
        alert("Erro ao carregar arquivo. Verifique se é um arquivo .navcog válido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }
  const bCheck = Object.values(data.boston_scores).filter(v => v === "✓").length;
  const bCoord = Object.values(data.boston_scores).filter(v => v === "C").length;
  const bAnomia = Object.values(data.boston_scores).filter(v => v === "A").length;
  const bAgnVis = Object.values(data.boston_scores).filter(v => v === "AV").length;
  const bAprOpt = Object.values(data.boston_scores).filter(v => v === "AO").length;
  const bErrors = bCoord + bAnomia + bAgnVis + bAprOpt;
  const recog = (parseInt(data.recog_vp) || 0) + (parseInt(data.recog_vn) || 0) - 10;
  const computed = {
    bostonCheckCount: bCheck,
    bostonErrors: bErrors,
    bCoord,
    bAnomia,
    bAgnVis,
    bAprOpt,
    recogTotal: recog,
    testType
  };
  const isMoCA = testType === "moca";
  const n = v => {
    const x = parseInt(v);
    return isNaN(x) ? 0 : x;
  };

  // Auto-calculate MEEM total
  useEffect(() => {
    const sum = MEEM_ITEMS.reduce((acc, it) => acc + n(data[it.key]), 0);
    const anyFilled = MEEM_ITEMS.some(it => data[it.key] !== "" && data[it.key] !== undefined);
    if (anyFilled) setData(p => ({
      ...p,
      meem_total: String(sum)
    }));
  }, [data.meem_orient_temp, data.meem_orient_spat, data.meem_mem_imm, data.meem_attn, data.meem_mem_evoc, data.meem_naming, data.meem_repetition, data.meem_verbal_cmd, data.meem_written_cmd, data.meem_phrase, data.meem_drawing]);

  // Auto-calculate MoCA subtotals
  const mocaSubCount = [data.moca_sub93, data.moca_sub86, data.moca_sub79, data.moca_sub72, data.moca_sub65].filter(Boolean).length;
  const mocaSubScore = mocaSubCount >= 4 ? 3 : mocaSubCount >= 2 ? 2 : mocaSubCount === 1 ? 1 : 0;
  useEffect(() => {
    const visuo = n(data.moca_trilha) + n(data.moca_cubo) + n(data.moca_rel_contorno) + n(data.moca_rel_numeros) + n(data.moca_rel_ponteiros);
    const nome = n(data.moca_nome_leao) + n(data.moca_nome_rino) + n(data.moca_nome_camelo);
    const attn = n(data.moca_digit_dir) + n(data.moca_digit_inv) + n(data.moca_vigilancia) + mocaSubScore;
    const ling = n(data.moca_frase1) + n(data.moca_frase2) + n(data.moca_fluencia);
    const abst = n(data.moca_abst1) + n(data.moca_abst2);
    const evocWords = ["rosto", "veludo", "igreja", "margarida", "vermelho"];
    const evoc = evocWords.filter(w => data[`moca_evoc_${w}`]).length;
    const ori = n(data.moca_ori_diames) + n(data.moca_ori_mes) + n(data.moca_ori_ano) + n(data.moca_ori_diasem) + n(data.moca_ori_lugar) + n(data.moca_ori_cidade);
    const total = visuo + nome + attn + ling + abst + evoc + ori;
    setData(p => ({
      ...p,
      moca_visuo_total: String(visuo),
      moca_nome_total: String(nome),
      moca_attn_total: String(attn),
      moca_ling_total: String(ling),
      moca_abst_total: String(abst),
      moca_evoc_total: String(evoc),
      moca_ori_total: String(ori),
      moca_total: String(total)
    }));
  }, [data.moca_trilha, data.moca_cubo, data.moca_rel_contorno, data.moca_rel_numeros, data.moca_rel_ponteiros, data.moca_nome_leao, data.moca_nome_rino, data.moca_nome_camelo, data.moca_digit_dir, data.moca_digit_inv, data.moca_vigilancia, mocaSubScore, data.moca_frase1, data.moca_frase2, data.moca_fluencia, data.moca_abst1, data.moca_abst2, data.moca_evoc_rosto, data.moca_evoc_veludo, data.moca_evoc_igreja, data.moca_evoc_margarida, data.moca_evoc_vermelho, data.moca_ori_diames, data.moca_ori_mes, data.moca_ori_ano, data.moca_ori_diasem, data.moca_ori_lugar, data.moca_ori_cidade]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
        :root{--bg:#f7f9fc;--surface:#fff;--surface2:#f0f4f8;--border:#e2e8f0;--text:#1a2332;--text2:#4a5568;--text3:#8896a6;--accent:#4a7fb5;--accent-light:#e8f0f8;--accent-dark:#2d5f8a;--green:#5ba88c;--green-light:#e6f5ef;--green-dark:#3d7a62;--red:#c75a5a;--red-light:#fde8e8;--orange:#d4915e;--orange-light:#fef3e8;--shadow-sm:0 1px 3px rgba(26,35,50,.06);--shadow-md:0 4px 12px rgba(26,35,50,.08);--radius:10px;--radius-sm:6px;--font:'DM Sans',-apple-system,sans-serif;--mono:'JetBrains Mono',monospace;}
        *{margin:0;padding:0;box-sizing:border-box;}body,html{font-family:var(--font);background:var(--bg);color:var(--text);}
        .app-container{max-width:1000px;margin:0 auto;padding:0 16px 60px;}
        .app-header{position:sticky;top:0;z-index:100;background:linear-gradient(135deg,var(--surface),#f0f6fc);border-bottom:1px solid var(--border);padding:16px 0;margin-bottom:24px;}
        .header-inner{max-width:1000px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
        .header-brand{display:flex;align-items:center;gap:10px;}.header-brain{width:48px;height:48px;}
        .header-text h1{font-size:18px;font-weight:700;letter-spacing:-.3px;line-height:1.2;}.header-text p{font-size:10px;color:var(--text3);letter-spacing:.3px;font-weight:500;line-height:1.4;}.header-text .header-doc{font-size:11px;color:var(--text2);font-weight:600;letter-spacing:0;margin-top:2px;}
        .header-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
        .btn-print{display:flex;align-items:center;gap:6px;padding:8px 16px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius-sm);font-family:var(--font);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;}.btn-print:hover{background:var(--accent-dark);transform:translateY(-1px);box-shadow:var(--shadow-md);}.btn-print svg{width:16px;height:16px;}
        .btn-save{display:flex;align-items:center;gap:6px;padding:8px 16px;background:var(--green);color:#fff;border:none;border-radius:var(--radius-sm);font-family:var(--font);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;}.btn-save:hover{background:var(--green-dark);transform:translateY(-1px);box-shadow:var(--shadow-md);}.btn-save svg{width:16px;height:16px;}
        .btn-load{display:flex;align-items:center;gap:6px;padding:8px 16px;background:var(--surface2);color:var(--text2);border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:var(--font);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;}.btn-load:hover{background:var(--accent-light);color:var(--accent);border-color:var(--accent);transform:translateY(-1px);box-shadow:var(--shadow-md);}.btn-load svg{width:16px;height:16px;}
        .test-toggle{display:flex;gap:0;border-radius:var(--radius-sm);overflow:hidden;border:2px solid var(--accent);}.test-toggle-btn{padding:6px 16px;border:none;background:transparent;font-family:var(--font);font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;color:var(--accent);letter-spacing:.3px;}.test-toggle-btn.active{background:var(--accent);color:#fff;}
        .patient-bar{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;margin-bottom:20px;box-shadow:var(--shadow-sm);}.patient-bar .field{display:flex;flex-direction:column;gap:4px;}.pb-wide{grid-column:1/-1;}
        .stepper-wrap{display:flex;align-items:center;gap:0;border:1.5px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;width:fit-content;}.stepper-btn{width:36px;height:36px;border:none;background:var(--surface2);font-size:18px;font-weight:600;color:var(--accent);cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;font-family:var(--font);}.stepper-btn:hover{background:var(--accent-light);}.stepper-btn:active{background:var(--accent);color:#fff;}.stepper-input{width:50px!important;height:36px;border:none;border-left:1.5px solid var(--border);border-right:1.5px solid var(--border);text-align:center;font-weight:700;font-family:var(--mono);font-size:15px;padding:0;border-radius:0;}
        .section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:16px;box-shadow:var(--shadow-sm);overflow:hidden;transition:box-shadow .2s;}.section:hover{box-shadow:var(--shadow-md);}
        .section-highlight{border-color:var(--accent);}.section-highlight .section-header{background:linear-gradient(135deg,var(--accent),var(--accent-dark));}.section-highlight .section-header .section-title{color:#fff;}.section-highlight .section-number{background:#fff;color:var(--accent);}
        .section-header{display:flex;align-items:center;gap:10px;padding:14px 20px;background:linear-gradient(135deg,var(--accent-light),var(--surface));border-bottom:1px solid var(--border);}
        .section-number{display:flex;align-items:center;justify-content:center;min-width:28px;height:28px;padding:0 6px;background:var(--accent);color:#fff;border-radius:14px;font-size:11px;font-weight:700;font-family:var(--mono);flex-shrink:0;}
        .section-title{font-size:15px;font-weight:600;letter-spacing:-.2px;}.section-body{padding:20px;}
        .field{display:flex;flex-direction:column;gap:4px;}.field-label{font-size:12px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.5px;}
        input[type="text"],input[type="date"],input[type="number"],textarea,select{padding:8px 12px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:var(--font);font-size:14px;color:var(--text);background:var(--surface);transition:all .2s;outline:none;width:100%;}input:focus,textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(74,127,181,.12);}input[type="number"]{width:70px;text-align:center;}textarea{resize:vertical;min-height:80px;}
        .score-field{display:flex;align-items:center;gap:8px;}.score-label{font-size:13px;font-weight:500;white-space:nowrap;}.score-input-wrap{display:flex;align-items:center;gap:2px;}.score-input{width:64px!important;text-align:center;font-weight:600;font-family:var(--mono);}.score-input.small{width:52px!important;}.score-input.score-auto{background:var(--accent-light);border-color:var(--accent);color:var(--accent-dark);cursor:default;}.score-max{font-size:13px;color:var(--text3);font-family:var(--mono);font-weight:500;}
        .meem-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}.meem-item{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--surface2);border-radius:var(--radius-sm);border:1px solid transparent;transition:all .15s;}.meem-item:hover{border-color:var(--border);}.meem-item-label{font-size:13px;font-weight:500;}.meem-total{grid-column:1/-1;display:flex;justify-content:flex-end;align-items:center;gap:10px;padding:12px 14px;background:var(--accent-light);border-radius:var(--radius-sm);border:1.5px solid var(--accent);}.meem-total .score-label{font-weight:700;color:var(--accent-dark);}
        .check-group{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}.check-label{font-size:13px;font-weight:500;color:var(--text2);white-space:nowrap;}.check-options{display:flex;gap:4px;flex-wrap:wrap;}.check-btn{padding:5px 12px;border:1.5px solid var(--border);border-radius:20px;background:#fff;font-family:var(--font);font-size:12px;font-weight:500;color:var(--text2);cursor:pointer;transition:all .15s;}.check-btn:hover{border-color:var(--accent);color:var(--accent);}.check-btn.active{background:var(--accent);border-color:var(--accent);color:#fff;}
        .word-trial{margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border);}.word-trial:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}.trial-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}.trial-num{font-size:14px;font-weight:600;color:var(--accent);}.trial-score{font-family:var(--mono);font-size:14px;font-weight:600;color:var(--green);}
        .word-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}.word-chip{position:relative;padding:6px 14px;border:1.5px solid var(--border);border-radius:20px;background:#fff;font-family:var(--font);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:var(--text);}.word-chip:hover{border-color:var(--accent);}.word-chip.selected{background:var(--green-light);border-color:var(--green);color:var(--green-dark);padding-left:28px;}.chip-order{position:absolute;left:8px;top:50%;transform:translateY(-50%);font-size:10px;font-weight:700;color:var(--green);font-family:var(--mono);}
        .intrusions-field{margin-top:6px;}.intrusions-field input{font-size:13px;padding:6px 10px;}
        .boston-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}.boston-item{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--surface2);border-radius:var(--radius-sm);gap:8px;}.boston-info{display:flex;align-items:center;gap:6px;flex:1;min-width:0;}.boston-num{font-family:var(--mono);font-size:11px;color:var(--text3);font-weight:500;}.boston-name{font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .boston-score-btns{display:flex;gap:3px;flex-shrink:0;}.boston-btn{min-width:28px;height:28px;padding:0 4px;border:1.5px solid var(--border);border-radius:4px;background:#fff;font-size:10px;font-weight:700;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;color:var(--text3);font-family:var(--mono);}.boston-btn:hover{border-color:var(--accent);}.boston-btn.correct.active{background:var(--green-light);border-color:var(--green);color:var(--green);}.boston-btn.coord.active{background:var(--orange-light);border-color:var(--orange);color:var(--orange);}.boston-btn.anomia.active{background:var(--red-light);border-color:var(--red);color:var(--red);}.boston-btn.agnvis.active{background:#ede8f5;border-color:#7c5cbf;color:#7c5cbf;}.boston-btn.apropt.active{background:#e4f0f5;border-color:#4a8fa8;color:#4a8fa8;}
        .boston-summary{display:flex;gap:16px;margin-top:12px;padding:12px;background:var(--accent-light);border-radius:var(--radius-sm);justify-content:center;}.boston-summary-item{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;}.boston-summary-item .label{color:var(--text2);font-weight:500;}.boston-summary-item .value{font-family:var(--mono);color:var(--accent-dark);}
        .digit-row{display:flex;gap:20px;align-items:center;}.recog-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}.recog-item{display:flex;flex-direction:column;gap:4px;}.recog-item label{font-size:12px;color:var(--text2);font-weight:500;}.recog-total{grid-column:1/-1;text-align:center;padding:10px;background:var(--green-light);border-radius:var(--radius-sm);font-weight:600;font-size:14px;color:var(--green-dark);}
        .fluency-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}.flow-block{background:var(--surface2);border-radius:var(--radius-sm);padding:14px;}.flow-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}.flow-label{font-size:14px;font-weight:600;color:var(--accent-dark);}.flow-total{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;}.flow-intervals{display:flex;flex-direction:column;gap:6px;}.flow-interval{display:flex;align-items:center;gap:8px;}.interval-label{font-size:12px;font-family:var(--mono);color:var(--text3);width:56px;flex-shrink:0;}.flow-interval input{font-size:13px;padding:6px 10px;}
        .praxias-scores{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px;}.praxia-card{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 8px;background:var(--surface2);border-radius:var(--radius-sm);}.praxia-card .name{font-size:12px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.3px;}
        .gestures-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;}.gesture-item{display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 8px;background:var(--surface2);border-radius:var(--radius);border:1.5px solid var(--border);}.gesture-svg{color:var(--text2);}
        .proverb-card{padding:14px;background:var(--surface2);border-radius:var(--radius-sm);margin-bottom:10px;border-left:3px solid var(--accent);}.proverb-card:last-child{margin-bottom:0;}.proverb-text{font-size:14px;font-style:italic;margin-bottom:10px;}.proverb-end{color:var(--text3);}.proverb-checks{display:flex;flex-direction:column;gap:8px;}
        .match-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}.match-item{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 8px;background:var(--surface2);border-radius:var(--radius-sm);}.match-item .name{font-size:13px;font-weight:600;}
        .diag-grid{display:flex;flex-direction:column;gap:10px;}.diag-row{display:flex;gap:10px;align-items:flex-start;}.diag-label{font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.5px;width:120px;flex-shrink:0;padding-top:10px;}.diag-row textarea{min-height:60px;}
        .two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px;}.rey-row{display:flex;gap:16px;}.rey-card{flex:1;padding:16px;background:var(--surface2);border-radius:var(--radius-sm);display:flex;flex-direction:column;align-items:center;gap:8px;}.rey-card .name{font-size:13px;font-weight:600;color:var(--text2);text-transform:uppercase;}
        .legend-row{display:flex;gap:10px;flex-wrap:wrap;font-size:11px;color:var(--text2);margin-bottom:12px;padding:8px 12px;background:var(--surface2);border-radius:var(--radius-sm);}.legend-item{display:flex;align-items:center;gap:4px;}.legend-dot{width:10px;height:10px;border-radius:2px;}.legend-dot.correct{background:var(--green-light);border:1.5px solid var(--green);}.legend-dot.coord{background:var(--orange-light);border:1.5px solid var(--orange);}.legend-dot.anomia{background:var(--red-light);border:1.5px solid var(--red);}.legend-dot.agnvis{background:#ede8f5;border:1.5px solid #7c5cbf;}.legend-dot.apropt{background:#e4f0f5;border:1.5px solid #4a8fa8;}
        /* DASHBOARD TABLE */
        .dtable-wrap{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:20px;box-shadow:var(--shadow-sm);overflow:hidden;}
        .dtable-header{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;background:linear-gradient(135deg,#1a2332,var(--accent-dark));}
        .dtable-title{font-size:15px;font-weight:700;color:#fff;letter-spacing:-.2px;}
        .dtable-warn{font-size:11px;color:#ffd07b;font-weight:500;}
        .dtable{width:100%;border-collapse:collapse;}
        .dtable-th{padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--accent-dark);text-transform:uppercase;letter-spacing:.5px;background:var(--accent-light);border-bottom:2px solid var(--accent);}
        .dtable-center{text-align:center;}
        .dtable-td{padding:10px 14px;font-size:13px;border-bottom:1px solid var(--border);vertical-align:top;}
        .dtable-test{font-weight:600;color:var(--text);}
        .dtable-sub{display:block;font-size:10px;font-weight:400;color:var(--text3);margin-top:2px;}
        .dtable-score{font-family:var(--mono);font-weight:700;color:var(--accent-dark);font-size:14px;}
        .dtable-expected{font-size:12px;color:var(--text2);}
        .dtable-cls{font-weight:700;font-size:12px;color:var(--green-dark);}
        .dtable-cls-alert{color:var(--red)!important;}
        .dtable-row-alert{background:#fff8f8;}
        .dtable-row-alert .dtable-score{color:var(--red);}
        .dtable-empty{text-align:center;padding:24px;color:var(--text3);font-style:italic;}
        .dtable-note{padding:8px 14px;font-size:10px;color:var(--text3);font-style:italic;border-top:1px solid var(--border);}

        /* REFERENCES */
        .refs-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:16px;box-shadow:var(--shadow-sm);}
        .refs-title{font-size:14px;font-weight:700;color:var(--accent-dark);margin-bottom:12px;}
        .refs-list{font-size:11px;color:var(--text2);line-height:1.7;padding-left:20px;margin:0;}.refs-list li{margin-bottom:4px;}

        /* PRINT DASHBOARD TABLE */
        .pv-dash-sec{border:1.5px solid var(--accent);border-radius:4px;overflow:hidden;margin-bottom:12px;padding:0;}
        .pv-dtable{width:100%;border-collapse:collapse;font-size:9px;}
        .pv-dtable th{padding:4px 6px;text-align:left;font-size:7.5px;font-weight:700;color:var(--accent-dark);text-transform:uppercase;background:#f0f4f8;border-bottom:1.5px solid var(--accent);letter-spacing:.3px;}
        .pv-dtable td{padding:4px 6px;border-bottom:1px solid #eee;font-size:9px;}
        .pv-dtc{text-align:center;font-family:var(--mono);font-weight:600;}
        .pv-dtc-alert{color:var(--red)!important;font-weight:700;}
        .pv-dtr-alert{background:#fff8f8;}
        .pv-dtr-alert td:nth-child(2){color:var(--red);font-weight:700;}
        .pv-dtr-sub{font-size:7px;color:var(--text3);font-style:italic;}
        .pv-dash-note{padding:3px 6px;font-size:7px;color:var(--text3);font-style:italic;}
        .pv-refs{font-size:8px;color:var(--text2);line-height:1.6;}.pv-ref{margin-bottom:2px;}

        /* APP FOOTER */
        .app-footer{display:flex;align-items:center;justify-content:center;padding:24px 0 8px;margin-top:8px;border-top:1px solid var(--border);opacity:.45;transition:opacity .3s;}.app-footer:hover{opacity:.8;}
        .app-footer-logo{height:80px;width:auto;}

        /* MoCA SPECIFIC */
        .moca-mem-grid{border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;}
        .moca-mem-header{display:grid;grid-template-columns:120px repeat(5,1fr);background:var(--accent-light);padding:8px 0;font-size:11px;font-weight:700;text-align:center;color:var(--accent-dark);}
        .moca-mem-row{display:grid;grid-template-columns:120px repeat(5,1fr);border-top:1px solid var(--border);align-items:center;}
        .moca-mem-label{font-size:12px;font-weight:600;color:var(--text2);padding:6px 12px;}
        .moca-mem-btn{border:none;background:transparent;font-size:14px;font-weight:600;cursor:pointer;padding:8px;color:var(--text3);transition:all .15s;}.moca-mem-btn:hover{background:var(--surface2);}.moca-mem-btn.active{color:var(--green);background:var(--green-light);}
        .moca-mem-btn.moca-opt{font-size:12px;}.moca-mem-btn.moca-opt.active{color:var(--orange);background:var(--orange-light);}
        .moca-mem-opt{background:#fafafa;}
        .moca-sub-row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:6px;}
        .moca-sub-btn{display:flex;flex-direction:column;align-items:center;padding:8px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);background:#fff;cursor:pointer;transition:all .15s;font-family:var(--font);font-size:13px;color:var(--text3);gap:2px;}.moca-sub-btn:hover{border-color:var(--accent);}.moca-sub-btn.active{background:var(--green-light);border-color:var(--green);color:var(--green-dark);}
        .moca-sub-num{font-family:var(--mono);font-weight:700;font-size:14px;}
        .moca-sub-result{font-size:12px;color:var(--text2);padding:6px 12px;background:var(--surface2);border-radius:var(--radius-sm);}
        .moca-subsec .meem-grid{margin-bottom:0;}

        /* PRINT */
        .print-overlay{position:fixed;inset:0;z-index:9999;background:#e8ecf0;overflow-y:auto;display:flex;flex-direction:column;align-items:center;}
        .print-bar{position:sticky;top:0;z-index:10;width:100%;display:flex;justify-content:space-between;align-items:center;padding:10px 24px;background:#fff;border-bottom:1px solid var(--border);box-shadow:var(--shadow-sm);}
        .print-bar-title{font-size:13px;font-weight:600;color:var(--text2);}
        .print-back-btn{display:flex;align-items:center;gap:6px;padding:8px 16px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);font-family:var(--font);font-size:13px;font-weight:600;color:var(--text);cursor:pointer;}.print-back-btn:hover{background:var(--border);}
        .print-now-btn{display:flex;align-items:center;gap:6px;padding:8px 20px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius-sm);font-family:var(--font);font-size:13px;font-weight:600;cursor:pointer;}.print-now-btn:hover{background:var(--accent-dark);}
        .print-page{width:210mm;min-height:297mm;background:#fff;margin:24px auto;padding:24px 28px;box-shadow:0 2px 24px rgba(0,0,0,.12);font-size:11px;line-height:1.5;color:#1a1a1a;border-radius:4px;}
        .pv-hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:12px;border-bottom:2.5px solid var(--accent);margin-bottom:12px;}.pv-hdr-left{display:flex;align-items:center;gap:10px;}.pv-brain{width:42px;height:42px;}.pv-h1{font-size:16px;font-weight:700;color:var(--accent-dark);letter-spacing:-.3px;}.pv-h2{font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;font-weight:500;}.pv-h3{font-size:8.5px;color:var(--text2);font-weight:500;margin-top:2px;letter-spacing:0;text-transform:none;}.pv-hdr-right{text-align:right;}.pv-hf{font-size:11px;line-height:1.7;}.pv-hl{color:var(--text3);}
        .pv-sbar{display:flex;flex-wrap:wrap;background:#f4f8fc;border:1px solid #d6e3f0;border-radius:6px;margin-bottom:14px;overflow:hidden;}.pv-si{flex:1 1 auto;min-width:70px;padding:7px 8px;text-align:center;border-right:1px solid #d6e3f0;}.pv-si:last-child{border-right:none;}.pv-sl{display:block;font-size:7.5px;text-transform:uppercase;letter-spacing:.5px;color:var(--text3);font-weight:600;margin-bottom:1px;}.pv-sv{font-size:15px;font-weight:700;color:var(--accent-dark);font-family:var(--mono);}.pv-sv small{font-size:9px;color:var(--text3);font-weight:500;}
        .pv-sec{margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #eaeef3;}.pv-sec:last-of-type{border-bottom:none;}.pv-st{font-size:11px;font-weight:700;color:var(--accent-dark);margin-bottom:6px;display:flex;align-items:center;gap:5px;text-transform:uppercase;letter-spacing:.3px;}.pv-sn{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 4px;background:var(--accent);color:#fff;border-radius:10px;font-size:8px;font-family:var(--mono);flex-shrink:0;}.pv-si2{padding-bottom:6px;margin-bottom:6px;}.pv-si2 .pv-st{margin-bottom:3px;}
        .pv-score{font-family:var(--mono);font-weight:700;color:var(--accent-dark);}.pv-max{font-weight:400;color:var(--text3);font-size:10px;}
        .pv-mg{display:grid;grid-template-columns:1fr 1fr;gap:2px;}.pv-mr{display:flex;justify-content:space-between;align-items:center;padding:3px 8px;background:#f8f9fb;border-radius:2px;font-size:10.5px;}.pv-mt{grid-column:1/-1;background:#e8f0f8;font-weight:700;padding:5px 8px;}
        .pv-wt{margin-bottom:6px;}.pv-wth{display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;font-size:10.5px;}.pv-wts{font-family:var(--mono);font-weight:700;color:var(--green-dark);}.pv-wr{display:flex;flex-wrap:wrap;gap:3px;}.pv-w{padding:2px 7px;border-radius:3px;font-size:10.5px;background:#f3f4f6;color:#999;}.pv-wh{background:var(--green-light);color:var(--green-dark);font-weight:600;}.pv-wh sup{font-size:7px;font-weight:700;color:var(--green);margin-right:1px;}.pv-intr{font-size:9.5px;color:var(--red);margin-top:2px;font-style:italic;}
        .pv-bg{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}.pv-bi{display:flex;align-items:center;gap:3px;padding:2px 5px;border-radius:2px;font-size:10px;background:#f8f9fb;}.pv-bn{font-family:var(--mono);color:var(--text3);font-size:8px;min-width:14px;}.pv-bm{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.pv-bs{font-weight:700;font-family:var(--mono);min-width:12px;text-align:center;}.pv-bok{background:#e6f5ef;}.pv-bok .pv-bs{color:var(--green);}.pv-bco{background:#fef3e8;}.pv-bco .pv-bs{color:var(--orange);}.pv-ban{background:#fde8e8;}.pv-ban .pv-bs{color:var(--red);}.pv-bav{background:#ede8f5;}.pv-bav .pv-bs{color:#7c5cbf;}.pv-bao{background:#e4f0f5;}.pv-bao .pv-bs{color:#4a8fa8;}.pv-bt{display:flex;gap:16px;margin-top:4px;font-size:10.5px;color:var(--text2);}
        .pv-il{display:flex;flex-wrap:wrap;gap:14px;font-size:11px;}.pv-rct{padding:2px 8px;background:var(--green-light);border-radius:3px;color:var(--green-dark);}
        .pv-fr{display:grid;grid-template-columns:1fr 1fr;gap:10px;}.pv-fb{background:#f8f9fb;padding:6px 8px;border-radius:3px;}.pv-fh{display:flex;justify-content:space-between;margin-bottom:3px;font-size:10.5px;}.pv-fi{display:flex;gap:6px;font-size:10px;padding:1px 0;border-bottom:1px solid #eee;}.pv-fi:last-child{border-bottom:none;}.pv-fl{font-family:var(--mono);color:var(--text3);width:46px;flex-shrink:0;}
        .pv-pr{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px;}.pv-pi{padding:3px 10px;background:#f8f9fb;border-radius:3px;font-size:10.5px;}.pv-gr{display:flex;flex-wrap:wrap;gap:8px;font-size:10px;color:var(--text2);}
        .pv-pv{display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;font-size:10.5px;padding:3px 0;border-bottom:1px solid #f0f0f0;}.pv-pv:last-child{border-bottom:none;}.pv-pv em{flex:0 0 100%;font-size:10px;color:var(--text2);}
        .pv-tb{font-size:11px;white-space:pre-wrap;min-height:14px;padding:2px 0;}.pv-dg{display:flex;flex-direction:column;gap:3px;}.pv-dr{display:flex;gap:6px;font-size:10.5px;padding:3px 0;border-bottom:1px solid #f0f0f0;}.pv-dr:last-child{border-bottom:none;}.pv-dl{font-weight:700;color:var(--accent);min-width:80px;flex-shrink:0;text-transform:uppercase;font-size:9.5px;letter-spacing:.3px;}
        .pv-foot{margin-top:20px;padding-top:12px;border-top:1.5px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
        .pv-foot-wm{display:flex;align-items:center;}
        .pv-foot-logo{height:52px;width:auto;opacity:.7;}
        .pv-foot-meta{font-size:8px;color:var(--text3);text-align:right;}
        .pv-mem-table{border:1px solid #e0e0e0;border-radius:3px;overflow:hidden;font-size:10px;}.pv-mem-hdr{display:grid;grid-template-columns:70px repeat(5,1fr);background:#f0f4f8;padding:3px 0;text-align:center;font-weight:700;font-size:9px;color:var(--accent-dark);}.pv-mem-r{display:grid;grid-template-columns:70px repeat(5,1fr);border-top:1px solid #eee;text-align:center;padding:2px 0;}.pv-mem-r span:first-child{text-align:left;padding-left:6px;font-weight:600;font-size:9px;color:var(--text2);}.pv-mem-ok{color:var(--green);font-weight:700;}
        @media print{body,html{background:#fff!important;}.no-print{display:none!important;}.print-overlay{position:static;background:#fff;overflow:visible;}.print-page{width:100%;margin:0;padding:14px 18px;box-shadow:none;border-radius:0;}.pv-sec{break-inside:avoid;}.pv-hdr{break-after:avoid;}.pv-sbar{break-inside:avoid;}@page{margin:10mm 8mm 14mm 8mm;size:A4;@bottom-center{content:"Página " counter(page) " de " counter(pages);font-family:'DM Sans',sans-serif;font-size:8px;color:#8896a6;}}}
        @media(max-width:700px){.meem-grid{grid-template-columns:1fr;}.boston-grid{grid-template-columns:1fr;}.praxias-scores{grid-template-columns:repeat(3,1fr);}.fluency-grid{grid-template-columns:1fr;}.patient-bar{grid-template-columns:1fr;}.match-grid{grid-template-columns:repeat(2,1fr);}.dash-grid{grid-template-columns:1fr 1fr;}.gestures-grid{grid-template-columns:1fr 1fr;}.two-col{grid-template-columns:1fr;}.recog-grid{grid-template-columns:repeat(2,1fr);}.header-inner{flex-direction:column;align-items:flex-start;}.print-page{width:100%;padding:16px;}.pv-bg{grid-template-columns:repeat(2,1fr);}.moca-mem-header,.moca-mem-row{grid-template-columns:90px repeat(5,1fr);}}
      `), showPrint && /*#__PURE__*/React.createElement(PrintView, {
    data: data,
    computed: computed,
    onClose: () => setShowPrint(false)
  }), !showPrint && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "app-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-brand"
  }, /*#__PURE__*/React.createElement(CircuitBrainSVG, {
    className: "header-brain"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-text"
  }, /*#__PURE__*/React.createElement("h1", null, "Avalia\xE7\xE3o Neurocognitiva"), /*#__PURE__*/React.createElement("p", {
    className: "header-doc"
  }, "Dr. Hugo Ary Oliveira Silva \u2014 Neurologista Cogni\xE7\xE3o e Comportamento"), /*#__PURE__*/React.createElement("p", null, "CRM-DF 19610 \xB7 RQE 17996"))), /*#__PURE__*/React.createElement("div", {
    className: "header-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "test-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: `test-toggle-btn ${testType === "meem" ? "active" : ""}`,
    onClick: () => setTestType("meem")
  }, "MEEM"), /*#__PURE__*/React.createElement("button", {
    className: `test-toggle-btn ${testType === "moca" ? "active" : ""}`,
    onClick: () => setTestType("moca")
  }, "MoCA")), /*#__PURE__*/React.createElement("button", {
    className: "btn-save",
    onClick: saveToFile
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 21 17 13 7 13 7 21"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 3 7 8 15 8"
  })), "Salvar"), /*#__PURE__*/React.createElement("button", {
    className: "btn-load",
    onClick: () => fileInputRef.current.click()
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 8 12 3 7 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "3",
    x2: "12",
    y2: "15"
  })), "Carregar"), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: ".navcog,application/json",
    style: {
      display: "none"
    },
    onChange: handleLoadFile
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn-print",
    onClick: () => setShowPrint(true)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "14",
    width: "12",
    height: "8"
  })), "Imprimir")))), /*#__PURE__*/React.createElement("div", {
    className: "app-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "patient-bar"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nome Completo",
    className: "pb-wide"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.initials,
    onChange: e => set("initials", e.target.value),
    placeholder: "Nome completo do paciente"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Data da Avalia\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: data.date,
    onChange: e => set("date", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Data de Nascimento"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: data.birthdate,
    onChange: e => set("birthdate", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Sexo"
  }, /*#__PURE__*/React.createElement(CheckGroup, {
    options: ["M", "F"],
    value: data.gender,
    onChange: v => set("gender", v)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Escolaridade (anos)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stepper-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "stepper-btn",
    onClick: () => set("schooling", String(Math.max(0, (parseInt(data.schooling) || 0) - 1)))
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "30",
    value: data.schooling,
    onChange: e => set("schooling", e.target.value),
    className: "stepper-input"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "stepper-btn",
    onClick: () => set("schooling", String((parseInt(data.schooling) || 0) + 1))
  }, "+"))), /*#__PURE__*/React.createElement(Field, {
    label: "Domin\xE2ncia"
  }, /*#__PURE__*/React.createElement(CheckGroup, {
    options: ["Direita", "Esquerda"],
    value: data.dominance,
    onChange: v => set("dominance", v)
  }))), isMoCA ? /*#__PURE__*/React.createElement(MocaForm, {
    data: data,
    set: set
  }) : /*#__PURE__*/React.createElement(Section, {
    title: "Miniexame do Estado Mental (MEEM)",
    number: "4.1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meem-grid"
  }, MEEM_ITEMS.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    className: "meem-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "meem-item-label"
  }, it.label), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: it.max,
    value: data[it.key] || "",
    onChange: e => set(it.key, e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/", it.max)))), /*#__PURE__*/React.createElement("div", {
    className: "meem-total"
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "TOTAL MEEM",
    value: data.meem_total || "",
    onChange: () => {},
    max: 30,
    readOnly: true
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "Lista de Palavras",
    number: "4.2a"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      color: "var(--text3)",
      marginBottom: "12px"
    }
  }, "Clique nas palavras na ordem em que o paciente lembrou."), /*#__PURE__*/React.createElement(WordListTrial, {
    trialNum: 1,
    words: WORD_LIST,
    data: data,
    setData: setData
  }), /*#__PURE__*/React.createElement(WordListTrial, {
    trialNum: 2,
    words: WORD_LIST_ALT2,
    data: data,
    setData: setData
  }), /*#__PURE__*/React.createElement(WordListTrial, {
    trialNum: 3,
    words: WORD_LIST_ALT3,
    data: data,
    setData: setData
  })), /*#__PURE__*/React.createElement(Section, {
    title: "Boston Reduzido",
    number: "4.3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-dot correct"
  }), "\u2713 Acertou"), /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-dot coord"
  }), "C Erro coordenado"), /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-dot anomia"
  }), "A Anomia"), /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-dot agnvis"
  }), "AV Agnosia visual"), /*#__PURE__*/React.createElement("div", {
    className: "legend-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-dot apropt"
  }), "AO Apraxia \xF3ptica")), /*#__PURE__*/React.createElement("div", {
    className: "boston-grid"
  }, BOSTON_ITEMS.map((it, i) => /*#__PURE__*/React.createElement(BostonItem, {
    key: i,
    item: it,
    index: i,
    score: data.boston_scores[i] || "",
    onChange: v => setBos(i, v)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "boston-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "boston-summary-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Acertos (\u2713):"), /*#__PURE__*/React.createElement("span", {
    className: "value"
  }, bCheck, "/20")), /*#__PURE__*/React.createElement("div", {
    className: "boston-summary-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "C:"), /*#__PURE__*/React.createElement("span", {
    className: "value"
  }, bCoord)), /*#__PURE__*/React.createElement("div", {
    className: "boston-summary-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "A:"), /*#__PURE__*/React.createElement("span", {
    className: "value"
  }, bAnomia)), /*#__PURE__*/React.createElement("div", {
    className: "boston-summary-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "AV:"), /*#__PURE__*/React.createElement("span", {
    className: "value"
  }, bAgnVis)), /*#__PURE__*/React.createElement("div", {
    className: "boston-summary-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "AO:"), /*#__PURE__*/React.createElement("span", {
    className: "value"
  }, bAprOpt)))), /*#__PURE__*/React.createElement(Section, {
    title: "Digit Span",
    number: "4.4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "digit-row"
  }, /*#__PURE__*/React.createElement(ScoreField, {
    label: "Direto",
    value: data.digit_direct,
    onChange: v => set("digit_direct", v),
    max: 16
  }), /*#__PURE__*/React.createElement(ScoreField, {
    label: "Inverso",
    value: data.digit_inverse,
    onChange: v => set("digit_inverse", v),
    max: 14
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Lista de Palavras \u2014 Evoca\xE7\xE3o",
    number: "4.2b"
  }, /*#__PURE__*/React.createElement(WordListTrial, {
    trialNum: 4,
    words: WORD_LIST,
    data: data,
    setData: setData
  })), /*#__PURE__*/React.createElement(Section, {
    title: "Lista de Palavras \u2014 Reconhecimento",
    number: "4.2c"
  }, /*#__PURE__*/React.createElement("div", {
    className: "recog-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "recog-item"
  }, /*#__PURE__*/React.createElement("label", null, "Verdadeiro Positivo (VP)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "10",
    value: data.recog_vp,
    onChange: e => set("recog_vp", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "recog-item"
  }, /*#__PURE__*/React.createElement("label", null, "Verdadeiro Negativo (VN)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "10",
    value: data.recog_vn,
    onChange: e => set("recog_vn", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "recog-item"
  }, /*#__PURE__*/React.createElement("label", null, "Falso Positivo (FP)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "10",
    value: data.recog_fp,
    onChange: e => set("recog_fp", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "recog-item"
  }, /*#__PURE__*/React.createElement("label", null, "Falso Negativo (FN)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "10",
    value: data.recog_fn,
    onChange: e => set("recog_fn", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "recog-total"
  }, "VP + VN \u2212 10 = ", /*#__PURE__*/React.createElement("strong", null, recog), " /10"))), /*#__PURE__*/React.createElement(Section, {
    title: "Flu\xEAncia Verbal",
    number: "4.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fluency-grid"
  }, /*#__PURE__*/React.createElement(FlowTimer, {
    label: "Animais",
    data: data,
    setData: setData,
    prefix: "flu_anim"
  }), /*#__PURE__*/React.createElement(FlowTimer, {
    label: "Frutas",
    data: data,
    setData: setData,
    prefix: "flu_fruit"
  }))), !isMoCA && /*#__PURE__*/React.createElement(Section, {
    title: "Praxias",
    number: "4.6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "praxias-scores"
  }, PRAXIA_ITEMS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.key,
    className: "praxia-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: p.max,
    value: data[p.key] || "",
    onChange: e => set(p.key, e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/", p.max))))), /*#__PURE__*/React.createElement(Field, {
    label: `Gestos (total: ${Object.values(data.gestures).reduce((s, v) => s + (parseInt(v) || 0), 0)}/6)`
  }, /*#__PURE__*/React.createElement("div", {
    className: "gestures-grid"
  }, GESTURES.map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    className: "gesture-item"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "gesture-svg",
    viewBox: "0 0 50 50",
    width: "64",
    height: "64"
  }, GESTURE_SVG_PATHS[i]), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: g.max,
    value: data.gestures[g.id] || "",
    onChange: e => setGes(g.id, e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/", g.max))))))), /*#__PURE__*/React.createElement(Section, {
    title: "Mem\xF3ria Visual \u2014 Figura de Rey",
    number: "4.7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rey-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rey-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, "C\xF3pia"), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "12",
    value: data.rey_copy,
    onChange: e => set("rey_copy", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/12"))), /*#__PURE__*/React.createElement("div", {
    className: "rey-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, "Evoca\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "score-input-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "12",
    value: data.rey_evoc,
    onChange: e => set("rey_evoc", e.target.value),
    className: "score-input"
  }), /*#__PURE__*/React.createElement("span", {
    className: "score-max"
  }, "/12"))))), /*#__PURE__*/React.createElement(Section, {
    title: "Leitura e Compreens\xE3o",
    number: "4.8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "two-col"
  }, /*#__PURE__*/React.createElement(CheckGroup, {
    label: "Leitura:",
    options: ["Sim", "Não"],
    value: data.reading,
    onChange: v => set("reading", v)
  }), /*#__PURE__*/React.createElement(CheckGroup, {
    label: "Compreens\xE3o:",
    options: ["Sim", "Não"],
    value: data.comprehension,
    onChange: v => set("comprehension", v)
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Emparelhamento Figura-Palavra",
    number: "4.9"
  }, /*#__PURE__*/React.createElement("div", {
    className: "match-grid"
  }, ["relógio", "cama", "peso", "binóculo"].map(it => /*#__PURE__*/React.createElement("div", {
    key: it,
    className: "match-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, it), /*#__PURE__*/React.createElement(CheckGroup, {
    options: ["✓", "✗"],
    value: data[`match_${it}`] || "",
    onChange: v => set(`match_${it}`, v)
  }))))), /*#__PURE__*/React.createElement(Section, {
    title: "Pensamento Abstrato \u2014 Prov\xE9rbios",
    number: "4.10"
  }, PROVERBS.map((p, i) => /*#__PURE__*/React.createElement(ProverbSection, {
    key: i,
    proverb: p,
    index: i,
    data: data,
    setData: setData
  }))), /*#__PURE__*/React.createElement(DashboardTable, {
    rows: buildDashboardRows(data, testType, bCheck, recog),
    warn: N(data.schooling) === null
  }), /*#__PURE__*/React.createElement(Section, {
    title: "Diagn\xF3stico Neurocognitivo",
    number: "5"
  }, /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement("textarea", {
    value: data.neuro_diag,
    onChange: e => set("neuro_diag", e.target.value),
    placeholder: "Registrar diagn\xF3stico neurocognitivo...",
    rows: 4
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Impress\xE3o Diagn\xF3stica",
    number: "6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "diag-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "diag-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "diag-label"
  }, "Sindr\xF4mico"), /*#__PURE__*/React.createElement("textarea", {
    value: data.diag_sindromico,
    onChange: e => set("diag_sindromico", e.target.value),
    placeholder: "Diagn\xF3stico sindr\xF4mico..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "diag-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "diag-label"
  }, "Topogr\xE1fico"), /*#__PURE__*/React.createElement("textarea", {
    value: data.diag_topografico,
    onChange: e => set("diag_topografico", e.target.value),
    placeholder: "Diagn\xF3stico topogr\xE1fico..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "diag-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "diag-label"
  }, "Etiol\xF3gico"), /*#__PURE__*/React.createElement("textarea", {
    value: data.diag_etiologico,
    onChange: e => set("diag_etiologico", e.target.value),
    placeholder: "Diagn\xF3stico etiol\xF3gico..."
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "Condutas",
    number: "7"
  }, /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement("textarea", {
    value: data.condutas,
    onChange: e => set("condutas", e.target.value),
    placeholder: "Registrar condutas...",
    rows: 4
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "Examinador e Preceptoria",
    number: "8"
  }, /*#__PURE__*/React.createElement(Field, null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.examiner,
    onChange: e => set("examiner", e.target.value),
    placeholder: "Nome do examinador e preceptor..."
  }))), /*#__PURE__*/React.createElement(ReferencesSection, null), /*#__PURE__*/React.createElement("div", {
    className: "app-footer"
  }, /*#__PURE__*/React.createElement(CircuitBrainSVG, {
    className: "app-footer-logo",
    full: true
  })))));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(NeuroCogAssessment));
