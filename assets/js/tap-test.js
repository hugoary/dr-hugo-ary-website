const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

/* ═══ CONSTANTS ═══ */
const TINETTI_BALANCE = [{
  k: "b1",
  label: "Equilíbrio sentado",
  hint: "Sujeito sentado em cadeira rígida, sem braços",
  opts: [{
    v: 0,
    t: "Inclina-se ou desliza"
  }, {
    v: 1,
    t: "Estável, seguro"
  }]
}, {
  k: "b2",
  label: "Levanta-se da cadeira",
  opts: [{
    v: 0,
    t: "Incapaz sem ajuda"
  }, {
    v: 1,
    t: "Usa membros superiores"
  }, {
    v: 2,
    t: "Sem usar membros superiores"
  }]
}, {
  k: "b3",
  label: "Tentativas para se levantar",
  opts: [{
    v: 0,
    t: "Incapaz sem ajuda"
  }, {
    v: 1,
    t: "Mais de uma tentativa"
  }, {
    v: 2,
    t: "Uma tentativa"
  }]
}, {
  k: "b4",
  label: "Equilíbrio de pé imediato (primeiros 5s)",
  opts: [{
    v: 0,
    t: "Instável"
  }, {
    v: 1,
    t: "Estável c/ dispositivo"
  }, {
    v: 2,
    t: "Estável sem dispositivo"
  }]
}, {
  k: "b5",
  label: "Equilíbrio de pé",
  opts: [{
    v: 0,
    t: "Instável"
  }, {
    v: 1,
    t: "Base ampliada / dispositivo"
  }, {
    v: 2,
    t: "Base reduzida sem dispositivo"
  }]
}, {
  k: "b6",
  label: "Desequilíbrio no esterno",
  hint: "Examinador empurra o esterno 3× com a palma",
  opts: [{
    v: 0,
    t: "Começa a cair"
  }, {
    v: 1,
    t: "Cambaleia, se agarra"
  }, {
    v: 2,
    t: "Estável"
  }]
}, {
  k: "b7",
  label: "Olhos fechados",
  opts: [{
    v: 0,
    t: "Instável"
  }, {
    v: 1,
    t: "Estável"
  }]
}, {
  k: "b8",
  label: "Girar 360°",
  opts: [{
    v: 0,
    t: "Instabilidade"
  }, {
    v: 1,
    t: "Passos descontínuos"
  }, {
    v: 2,
    t: "Continuidade"
  }]
}, {
  k: "b9",
  label: "Sentar-se",
  opts: [{
    v: 0,
    t: "Inseguro / cai"
  }, {
    v: 1,
    t: "Usa os braços"
  }, {
    v: 2,
    t: "Seguro, movimentos suaves"
  }]
}];
const TINETTI_GAIT = [{
  k: "g1",
  label: "Iniciação da marcha",
  opts: [{
    v: 0,
    t: "Hesitação / múltiplas tentativas"
  }, {
    v: 1,
    t: "Sem hesitação"
  }]
}, {
  k: "g2a",
  label: "Perna D – passa o membro E",
  opts: [{
    v: 0,
    t: "Não passa"
  }, {
    v: 1,
    t: "Passa"
  }]
}, {
  k: "g2b",
  label: "Perna D – afasta do solo",
  opts: [{
    v: 0,
    t: "Não afasta completamente"
  }, {
    v: 1,
    t: "Afasta completamente"
  }]
}, {
  k: "g2c",
  label: "Perna E – passa o membro D",
  opts: [{
    v: 0,
    t: "Não passa"
  }, {
    v: 1,
    t: "Passa"
  }]
}, {
  k: "g2d",
  label: "Perna E – afasta do solo",
  opts: [{
    v: 0,
    t: "Não afasta completamente"
  }, {
    v: 1,
    t: "Afasta completamente"
  }]
}, {
  k: "g3",
  label: "Simetria do passo",
  opts: [{
    v: 0,
    t: "Passos desiguais"
  }, {
    v: 1,
    t: "Passos iguais"
  }]
}, {
  k: "g4",
  label: "Continuidade do passo",
  opts: [{
    v: 0,
    t: "Parada / descontinuidade"
  }, {
    v: 1,
    t: "Passos contínuos"
  }]
}, {
  k: "g5",
  label: "Desvio da linha reta (≈ 3m × 30cm)",
  opts: [{
    v: 0,
    t: "Desvio marcado"
  }, {
    v: 1,
    t: "Desvio leve ou dispositivo"
  }, {
    v: 2,
    t: "Linha reta sem dispositivo"
  }]
}, {
  k: "g6",
  label: "Tronco",
  opts: [{
    v: 0,
    t: "Oscilação / dispositivo"
  }, {
    v: 1,
    t: "Flexão joelhos/dor ou afasta braços"
  }, {
    v: 2,
    t: "Sem oscilação ou flexão"
  }]
}, {
  k: "g7",
  label: "Base de apoio",
  opts: [{
    v: 0,
    t: "Calcanhares afastados"
  }, {
    v: 1,
    t: "Calcanhares quase tocando"
  }]
}];
const BAL_MAX = 16,
  GAIT_MAX = 12,
  TIN_MAX = 28;
const REFERENCES = ["Hakim S, Adams RD. The special clinical problem of symptomatic hydrocephalus with normal cerebrospinal fluid pressure. J Neurol Sci. 1965;2(4):307-327.", "Evans WA. An encephalographic ratio for estimating ventricular enlargement and cerebral atrophy. Arch Neurol Psychiatr. 1942;47:931-937. (Índice de Evans — valor de referência > 0,33 utilizado neste serviço)", "Tinetti ME. Performance-oriented assessment of mobility problems in elderly patients. J Am Geriatr Soc. 1986;34(2):119-126.", "Podsiadlo D, Richardson S. The Timed \"Up & Go\": a test of basic functional mobility for frail elderly persons. J Am Geriatr Soc. 1991;39(2):142-148.", "Relkin N, Marmarou A, Klinge P, Bergsneider M, Black PM. Diagnosing idiopathic normal-pressure hydrocephalus. Neurosurgery. 2005;57(3 Suppl):S4-S16.", "Marmarou A, Bergsneider M, Klinge P, Relkin N, Black PM. The value of supplemental prognostic tests for the preoperative assessment of idiopathic normal-pressure hydrocephalus. Neurosurgery. 2005;57(3 Suppl):S17-S28.", "Mori E, Ishikawa M, Kato T, et al. Guidelines for management of idiopathic normal pressure hydrocephalus: second edition. Neurol Med Chir (Tokyo). 2012;52(11):775-809. (Critérios de resposta ao TAP TEST: melhora ≥ 20% no TUG ou ≥ 10% no Tinetti)", "Wikkelsø C, Hellström P, Klinge PM, Tans JT; European iNPH Multicentre Study Group. The European iNPH Multicentre Study on the predictive values of resistance to CSF outflow and the CSF Tap Test in patients with idiopathic normal pressure hydrocephalus. J Neurol Neurosurg Psychiatry. 2013;84(5):562-568.", "Hashimoto M, Ishikawa M, Mori E, Kuwana N; SINPHONI. Diagnosis of idiopathic normal pressure hydrocephalus is supported by MRI-based scheme: a prospective cohort study. Cerebrospinal Fluid Res. 2010;7:18. (DESH — Disproportionately Enlarged Subarachnoid-space Hydrocephalus)", "Fazekas F, Chawluk JB, Alavi A, Hurtig HI, Zimmerman RA. MR signal abnormalities at 1.5 T in Alzheimer's dementia and normal aging. AJR Am J Roentgenol. 1987;149(2):351-356. (Escala Fazekas — hiperintensidades da substância branca)", "Scheltens P, Leys D, Barkhof F, et al. Atrophy of medial temporal lobes on MRI in \"probable\" Alzheimer's disease and normal ageing. J Neurol Neurosurg Psychiatry. 1992;55(10):967-972. (Escala MTA — Medial Temporal Atrophy)", "Ishii K, Kanda T, Harada A, et al. Clinical impact of the callosal angle in the diagnosis of idiopathic normal pressure hydrocephalus. Eur Radiol. 2008;18(11):2678-2683. (Ângulo do corpo caloso)", "Pressão de abertura liquórica de referência neste serviço: limite superior de 26 cmH₂O. Valores acima sugerem reavaliação do diagnóstico de HPN idiopática."];
const INITIAL_DATA = {
  initials: "",
  birthdate: "",
  age: "",
  gender: "",
  schooling: "",
  requestingDoctor: "",
  indication: "Suspeita de HPN",
  evalDate: new Date().toISOString().split("T")[0],
  location: "",
  comorbidities: "",
  medications: "",
  companion: "",
  triad_gait_time: "",
  triad_sphincter_time: "",
  triad_cognitive_time: "",
  mri_date: "",
  mri_mta: "",
  mri_fazekas: "",
  mri_callosal: "",
  mri_desh: "",
  mri_evans: "",
  mri_notes: "",
  pre_tug: "",
  pos_tug: "",
  pre_bal: {},
  pre_gait: {},
  pos_bal: {},
  pos_gait: {},
  pl_space: "L3-L4",
  pl_needle: "22G",
  pl_attempts: "1",
  pl_aspect: "Água de rocha",
  pl_pressure: "",
  pl_volume: "",
  pl_anesthesia: "Lidocaína 2% sem vasoconstritor (2ml)",
  pl_notes: "",
  conclusion: "",
  conclusion_manual: false,
  examiner: "Dr. Hugo Ary Oliveira Silva — Neurologista, Especialidade Cognição e Comportamento — CRM-DF 19610 — RQE 17.996"
};

/* ═══ HELPERS ═══ */
const N = v => {
  const x = parseFloat(v);
  return isNaN(x) ? null : x;
};
const V = v => v || v === 0 ? v : "—";
function calcAge(birthdate, refDate) {
  if (!birthdate) return "";
  const b = new Date(birthdate),
    r = refDate ? new Date(refDate) : new Date();
  if (isNaN(b.getTime())) return "";
  let age = r.getFullYear() - b.getFullYear();
  const m = r.getMonth() - b.getMonth();
  if (m < 0 || m === 0 && r.getDate() < b.getDate()) age--;
  return age >= 0 ? String(age) : "";
}
function sumScores(obj, list) {
  return list.reduce((acc, it) => {
    const v = obj[it.k];
    return acc + (typeof v === "number" ? v : 0);
  }, 0);
}
function filledCount(obj, list) {
  return list.reduce((acc, it) => acc + (typeof obj[it.k] === "number" ? 1 : 0), 0);
}
function fmtDate(d) {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}
function pct(pre, pos) {
  if (pre === null || pos === null || pre === 0) return null;
  return (pre - pos) / pre * 100;
}
function classifyResponse(pre_tug, pos_tug, pre_tin, pos_tin) {
  const tugDelta = pre_tug !== null && pos_tug !== null ? pre_tug - pos_tug : null;
  const tugPct = pct(pre_tug, pos_tug);
  const tinDelta = pre_tin !== null && pos_tin !== null ? pos_tin - pre_tin : null;
  const tinPct = pre_tin !== null && pos_tin !== null && pre_tin > 0 ? (pos_tin - pre_tin) / pre_tin * 100 : null;
  const hasTUG = tugDelta !== null;
  const hasTIN = tinDelta !== null;
  if (!hasTUG && !hasTIN) return {
    verdict: "empty",
    label: "Preencha pré e pós para gerar classificação",
    tugDelta,
    tugPct,
    tinDelta,
    tinPct
  };
  // Critérios (Mori 2012 / Wikkelsø 2013):
  // TUG: melhora ≥ 20% OU redução ≥ 5 segundos
  // Tinetti: ganho ≥ 2 pontos OU ≥ 10%
  const tugPositive = hasTUG && (tugPct >= 20 || tugDelta >= 5);
  const tinPositive = hasTIN && (tinDelta >= 2 || tinPct !== null && tinPct >= 10);
  const tugLimit = hasTUG && !tugPositive && (tugPct >= 10 || tugDelta >= 2);
  const tinLimit = hasTIN && !tinPositive && tinDelta >= 1;
  if (tugPositive || tinPositive) return {
    verdict: "positive",
    label: "TAP TEST — RESPONDEDOR",
    tugDelta,
    tugPct,
    tinDelta,
    tinPct
  };
  if (tugLimit || tinLimit) return {
    verdict: "indet",
    label: "TAP TEST — RESPOSTA LIMÍTROFE",
    tugDelta,
    tugPct,
    tinDelta,
    tinPct
  };
  return {
    verdict: "negative",
    label: "TAP TEST — NÃO RESPONDEDOR",
    tugDelta,
    tugPct,
    tinDelta,
    tinPct
  };
}

/* ═══ UI COMPONENTS ═══ */
function Section({
  number,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-hdr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sec-num"
  }, number), /*#__PURE__*/React.createElement("h2", {
    className: "sec-title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "sec-body"
  }, children));
}
function Field({
  label,
  children,
  wide
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `field ${wide ? "field-wide" : ""}`
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "field-label"
  }, label), children);
}
function Chips({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o,
    type: "button",
    className: `chip ${value === o ? "active" : ""}`,
    onClick: () => onChange(value === o ? "" : o)
  }, o)));
}
function TinettiBlock({
  items,
  values,
  onChange,
  label,
  max
}) {
  const filled = filledCount(values, items);
  const score = sumScores(values, items);
  return /*#__PURE__*/React.createElement("div", null, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.k,
    className: "tin-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tin-label"
  }, /*#__PURE__*/React.createElement("b", null, it.label), it.hint && /*#__PURE__*/React.createElement("small", null, it.hint)), /*#__PURE__*/React.createElement("div", {
    className: "tin-btns"
  }, it.opts.map(op => /*#__PURE__*/React.createElement("button", {
    key: op.v,
    type: "button",
    title: op.t,
    className: `tin-btn ${values[it.k] === op.v ? "active" : ""}`,
    onClick: () => onChange(it.k, values[it.k] === op.v ? undefined : op.v)
  }, op.v))))), /*#__PURE__*/React.createElement("div", {
    className: "tin-total"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tin-total-label"
  }, label, " \u2014 ", filled, "/", items.length, " itens"), /*#__PURE__*/React.createElement("span", {
    className: "tin-total-val"
  }, score, " / ", max)));
}
const WaterDropIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5c-.4 0-.77.2-.99.53C9.1 5.8 4.5 12.6 4.5 16.5c0 4.14 3.36 7.5 7.5 7.5s7.5-3.36 7.5-7.5c0-3.9-4.6-10.7-6.51-13.47A1.19 1.19 0 0 0 12 2.5Zm0 18c-2.21 0-4-1.79-4-4 0-.55.45-1 1-1s1 .45 1 1c0 1.1.9 2 2 2 .55 0 1 .45 1 1s-.45 1-1 1Z"
}));

/* ═══ MAIN APP ═══ */
function TapTestApp() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("tap_test_draft");
      if (saved) return {
        ...INITIAL_DATA,
        ...JSON.parse(saved)
      };
    } catch (e) {}
    return INITIAL_DATA;
  });
  const [showPrint, setShowPrint] = useState(false);
  const fileInputRef = useRef(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("tap_test_draft", JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  // Auto-calculate age
  useEffect(() => {
    const age = calcAge(data.birthdate, data.evalDate);
    if (age !== data.age) setData(p => ({
      ...p,
      age
    }));
    // eslint-disable-next-line
  }, [data.birthdate, data.evalDate]);
  const set = (k, v) => setData(p => ({
    ...p,
    [k]: v
  }));
  const setNested = (group, k, v) => setData(p => {
    const n = {
      ...p[group]
    };
    if (v === undefined) delete n[k];else n[k] = v;
    return {
      ...p,
      [group]: n
    };
  });

  // Computed scores
  const preBal = sumScores(data.pre_bal, TINETTI_BALANCE);
  const preGait = sumScores(data.pre_gait, TINETTI_GAIT);
  const preTin = preBal + preGait;
  const posBal = sumScores(data.pos_bal, TINETTI_BALANCE);
  const posGait = sumScores(data.pos_gait, TINETTI_GAIT);
  const posTin = posBal + posGait;
  const preTUG = N(data.pre_tug);
  const posTUG = N(data.pos_tug);
  const preFilled = filledCount(data.pre_bal, TINETTI_BALANCE) + filledCount(data.pre_gait, TINETTI_GAIT);
  const posFilled = filledCount(data.pos_bal, TINETTI_BALANCE) + filledCount(data.pos_gait, TINETTI_GAIT);
  const hasPre = preFilled > 0 || preTUG !== null;
  const hasPos = posFilled > 0 || posTUG !== null;
  const resp = classifyResponse(preTUG, posTUG, preFilled > 0 ? preTin : null, posFilled > 0 ? posTin : null);

  // Alert flags (imaging/PL)
  const evansNum = N(data.mri_evans);
  const evansAlert = evansNum !== null && evansNum > 0.33;
  const pressureNum = N(data.pl_pressure);
  const pressureAlert = pressureNum !== null && pressureNum > 26;
  const deshPresent = data.mri_desh === "Presente";

  // Auto-generate conclusion
  useEffect(() => {
    if (data.conclusion_manual) return;
    let text = "";
    if (hasPre || hasPos) {
      const volTxt = data.pl_volume ? `${data.pl_volume} ml` : "do líquor";
      text += `Através deste TAP TEST foi observado que após a retirada de ${volTxt} de líquor `;
      if (resp.verdict === "positive") {
        text += "houve melhora clínica significativa nos testes de marcha e equilíbrio, compatível com resposta positiva à punção lombar.\n\n";
        text += "TAP TEST — RESPONDEDOR";
      } else if (resp.verdict === "negative") {
        text += "não houve melhora limítrofe significativa dos testes de marcha e equilíbrio após a punção lombar.\n\n";
        text += "TAP TEST — NÃO RESPONDEDOR";
      } else if (resp.verdict === "indet") {
        text += "houve melhora marginal dos parâmetros de marcha e equilíbrio, sem atingir os critérios clássicos de resposta ao TAP TEST.\n\n";
        text += "TAP TEST — RESPOSTA LIMÍTROFE";
      }
    }
    if (text !== data.conclusion) setData(p => ({
      ...p,
      conclusion: text
    }));
    // eslint-disable-next-line
  }, [resp.verdict, data.pl_volume, hasPre, hasPos]);
  function doPrint() {
    setShowPrint(true);
  }
  function clearAll() {
    if (confirm("Limpar todos os campos? Esta ação não pode ser desfeita.")) {
      setData({
        ...INITIAL_DATA,
        evalDate: new Date().toISOString().split("T")[0]
      });
    }
  }
  function saveJSON() {
    const name = data.initials ? data.initials.trim().replace(/\s+/g, "_") : "tap_test";
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_${data.evalDate || "rascunho"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function loadJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const loaded = JSON.parse(ev.target.result);
        setData({
          ...INITIAL_DATA,
          ...loaded
        });
      } catch (err) {
        alert("Arquivo inválido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }
  function copyReport() {
    const txt = buildPlainReport(data, {
      preBal,
      preGait,
      preTin,
      posBal,
      posGait,
      posTin,
      preTUG,
      posTUG,
      resp
    });
    navigator.clipboard.writeText(txt).then(() => alert("Relatório copiado para a área de transferência."));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "hdr no-print"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hdr-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hdr-brand"
  }, /*#__PURE__*/React.createElement(WaterDropIcon, {
    className: "hdr-icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hdr-text"
  }, /*#__PURE__*/React.createElement("h1", null, "TAP TEST"), /*#__PURE__*/React.createElement("p", null, "AVALIA\xC7\xC3O DE RESPOSTA \xC0 PUN\xC7\xC3O LOMBAR"), /*#__PURE__*/React.createElement("p", {
    className: "hdr-doc"
  }, "Dr. Hugo Ary Oliveira Silva \xB7 CRM-DF 19610 \xB7 RQE 17996"))), /*#__PURE__*/React.createElement("div", {
    className: "hdr-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "./index.html",
    className: "btn btn-ghost",
    style: {
      textDecoration: "none"
    }
  }, "\u2190 In\xEDcio"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: loadJSON,
    style: {
      display: "none"
    },
    accept: ".json"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => fileInputRef.current.click()
  }, "Carregar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success",
    onClick: saveJSON
  }, "Salvar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: doPrint
  }, "Imprimir"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    onClick: clearAll,
    title: "Limpar todos os campos"
  }, "Limpar")))), /*#__PURE__*/React.createElement("main", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Section, {
    number: "1",
    title: "Identifica\xE7\xE3o do Paciente"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nome / Iniciais"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.initials,
    onChange: e => set("initials", e.target.value),
    placeholder: "Ex.: R.A.R."
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Data de Nascimento"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: data.birthdate,
    onChange: e => set("birthdate", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Idade"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.age,
    readOnly: true,
    style: {
      background: "var(--surface2)"
    },
    placeholder: "(autom\xE1tico)"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Sexo"
  }, /*#__PURE__*/React.createElement(Chips, {
    options: ["Feminino", "Masculino", "Outro"],
    value: data.gender,
    onChange: v => set("gender", v)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Escolaridade"
  }, /*#__PURE__*/React.createElement("select", {
    value: data.schooling,
    onChange: e => set("schooling", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecionar..."), /*#__PURE__*/React.createElement("option", null, "Analfabeto"), /*#__PURE__*/React.createElement("option", null, "Ensino Fundamental Incompleto"), /*#__PURE__*/React.createElement("option", null, "Ensino Fundamental Completo"), /*#__PURE__*/React.createElement("option", null, "Ensino M\xE9dio Incompleto"), /*#__PURE__*/React.createElement("option", null, "Ensino M\xE9dio Completo"), /*#__PURE__*/React.createElement("option", null, "Ensino Superior Incompleto"), /*#__PURE__*/React.createElement("option", null, "Ensino Superior Completo"), /*#__PURE__*/React.createElement("option", null, "P\xF3s-gradua\xE7\xE3o"))), /*#__PURE__*/React.createElement(Field, {
    label: "Data da Avalia\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: data.evalDate,
    onChange: e => set("evalDate", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "M\xE9dico Solicitante"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.requestingDoctor,
    onChange: e => set("requestingDoctor", e.target.value),
    placeholder: "Nome do m\xE9dico"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Indica\xE7\xE3o"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.indication,
    onChange: e => set("indication", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Local"
  }, /*#__PURE__*/React.createElement("select", {
    value: data.location,
    onChange: e => set("location", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecionar..."), /*#__PURE__*/React.createElement("option", null, "Neurostart"), /*#__PURE__*/React.createElement("option", null, "Centro de Aneurisma Cerebral"), /*#__PURE__*/React.createElement("option", null, "Centro M\xE9dico Santa Luzia"), /*#__PURE__*/React.createElement("option", null, "Hospital DF Star"), /*#__PURE__*/React.createElement("option", null, "Outro"))), /*#__PURE__*/React.createElement(Field, {
    label: "Comorbidades",
    wide: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.comorbidities,
    onChange: e => set("comorbidities", e.target.value),
    placeholder: "Ex.: DM, HAS, depress\xE3o"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Medica\xE7\xF5es em uso",
    wide: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.medications,
    onChange: e => set("medications", e.target.value),
    placeholder: "Ex.: levotiroxina, quetiapina 200mg, trazodona 50mg"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Acompanhante",
    wide: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.companion,
    onChange: e => set("companion", e.target.value),
    placeholder: "Ex.: irm\xE3, filho, c\xF4njuge"
  })))), /*#__PURE__*/React.createElement(Section, {
    number: "2",
    title: "Tr\xEDade de Hakim-Adams"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Altera\xE7\xE3o da marcha \u2014 sintoma e tempo",
    wide: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.triad_gait_time,
    onChange: e => set("triad_gait_time", e.target.value),
    placeholder: "Ex.: marcha magn\xE9tica h\xE1 3 anos"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Altera\xE7\xE3o esfincteriana \u2014 sintoma e tempo",
    wide: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.triad_sphincter_time,
    onChange: e => set("triad_sphincter_time", e.target.value),
    placeholder: "Ex.: urgeincontin\xEAncia h\xE1 10 anos com melhora ap\xF3s spasmex"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "D\xE9ficit cognitivo amn\xE9stico \u2014 sintoma e tempo",
    wide: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.triad_cognitive_time,
    onChange: e => set("triad_cognitive_time", e.target.value),
    placeholder: "Ex.: sem queixa consistente de decl\xEDnio cognitivo"
  })))), /*#__PURE__*/React.createElement(Section, {
    number: "3",
    title: "Neuroimagem"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Data da RM"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: data.mri_date,
    onChange: e => set("mri_date", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "MTA (0\u20134) \u2014 Scheltens"
  }, /*#__PURE__*/React.createElement("select", {
    value: data.mri_mta,
    onChange: e => set("mri_mta", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014"), /*#__PURE__*/React.createElement("option", null, "0"), /*#__PURE__*/React.createElement("option", null, "1"), /*#__PURE__*/React.createElement("option", null, "2"), /*#__PURE__*/React.createElement("option", null, "3"), /*#__PURE__*/React.createElement("option", null, "4"))), /*#__PURE__*/React.createElement(Field, {
    label: "Fazekas (0\u20133)"
  }, /*#__PURE__*/React.createElement("select", {
    value: data.mri_fazekas,
    onChange: e => set("mri_fazekas", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014"), /*#__PURE__*/React.createElement("option", null, "0"), /*#__PURE__*/React.createElement("option", null, "1"), /*#__PURE__*/React.createElement("option", null, "2"), /*#__PURE__*/React.createElement("option", null, "3"))), /*#__PURE__*/React.createElement(Field, {
    label: "\xC2ngulo do corpo caloso (graus)"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: data.mri_callosal,
    onChange: e => set("mri_callosal", e.target.value),
    placeholder: "Ex.: 96"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "DESH"
  }, /*#__PURE__*/React.createElement("select", {
    value: data.mri_desh,
    onChange: e => set("mri_desh", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014"), /*#__PURE__*/React.createElement("option", null, "Presente"), /*#__PURE__*/React.createElement("option", null, "Ausente"), /*#__PURE__*/React.createElement("option", null, "Indefinido"))), /*#__PURE__*/React.createElement(Field, {
    label: "\xCDndice de Evans"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    value: data.mri_evans,
    onChange: e => set("mri_evans", e.target.value),
    placeholder: "Ex.: 0.36"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Observa\xE7\xF5es de imagem",
    wide: true
  }, /*#__PURE__*/React.createElement("textarea", {
    value: data.mri_notes,
    onChange: e => set("mri_notes", e.target.value),
    placeholder: "Ex.: laudo n\xE3o menciona DESH, mas padr\xE3o presente na avalia\xE7\xE3o visual..."
  }))), evansAlert && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-warn"
  }, "\u26A0 \xCDndice de Evans > 0,33 \u2014 crit\xE9rio de ventriculomegalia compat\xEDvel com HPN."), deshPresent && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-warn"
  }, "\u26A0 Padr\xE3o DESH presente \u2014 refor\xE7a suspeita de HPN idiop\xE1tica.")), /*#__PURE__*/React.createElement(Section, {
    number: "4",
    title: "Avalia\xE7\xE3o Funcional \u2014 PR\xC9 Pun\xE7\xE3o Lombar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Timed Up and Go (TUG) \u2014 pr\xE9 PL"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: data.pre_tug,
    onChange: e => set("pre_tug", e.target.value),
    placeholder: "segundos"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text3)",
      fontSize: 13
    }
  }, "s (andar 10 m)"))), /*#__PURE__*/React.createElement(Field, {
    label: "Escore Tinetti pr\xE9 \u2014 parcial"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px",
      background: "var(--surface2)",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--mono)",
      fontWeight: 700,
      color: "var(--accent-dark)"
    }
  }, preTin, " / ", TIN_MAX, "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text3)",
      fontWeight: 400,
      marginLeft: 8
    }
  }, "(Eq: ", preBal, "/", BAL_MAX, " \xB7 Marcha: ", preGait, "/", GAIT_MAX, ")")))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--accent-dark)",
      textTransform: "uppercase",
      letterSpacing: ".5px",
      margin: "16px 0 8px"
    }
  }, "Tinetti \u2014 Equil\xEDbrio (m\xE1x. 16)"), /*#__PURE__*/React.createElement(TinettiBlock, {
    items: TINETTI_BALANCE,
    values: data.pre_bal,
    onChange: (k, v) => setNested("pre_bal", k, v),
    label: "Escore Equil\xEDbrio",
    max: BAL_MAX
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--accent-dark)",
      textTransform: "uppercase",
      letterSpacing: ".5px",
      margin: "16px 0 8px"
    }
  }, "Tinetti \u2014 Marcha (m\xE1x. 12)"), /*#__PURE__*/React.createElement(TinettiBlock, {
    items: TINETTI_GAIT,
    values: data.pre_gait,
    onChange: (k, v) => setNested("pre_gait", k, v),
    label: "Escore Marcha",
    max: GAIT_MAX
  })), /*#__PURE__*/React.createElement(Section, {
    number: "5",
    title: "Pun\xE7\xE3o Lombar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Espa\xE7o"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.pl_space,
    onChange: e => set("pl_space", e.target.value),
    placeholder: "L3-L4"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Agulha"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.pl_needle,
    onChange: e => set("pl_needle", e.target.value),
    placeholder: "22G"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Tentativas"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: data.pl_attempts,
    onChange: e => set("pl_attempts", e.target.value),
    placeholder: "1"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Aspecto do l\xEDquor"
  }, /*#__PURE__*/React.createElement("select", {
    value: data.pl_aspect,
    onChange: e => set("pl_aspect", e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "\xC1gua de rocha"), /*#__PURE__*/React.createElement("option", null, "L\xEDmpido"), /*#__PURE__*/React.createElement("option", null, "Turvo"), /*#__PURE__*/React.createElement("option", null, "Xantocr\xF4mico"), /*#__PURE__*/React.createElement("option", null, "Hemorr\xE1gico"))), /*#__PURE__*/React.createElement(Field, {
    label: "Press\xE3o de abertura (cmH\u2082O)"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: data.pl_pressure,
    onChange: e => set("pl_pressure", e.target.value),
    placeholder: "Ex.: 17"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Volume coletado (ml)"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: data.pl_volume,
    onChange: e => set("pl_volume", e.target.value),
    placeholder: "Ex.: 30"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Anestesia local",
    wide: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.pl_anesthesia,
    onChange: e => set("pl_anesthesia", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Observa\xE7\xF5es do procedimento",
    wide: true
  }, /*#__PURE__*/React.createElement("textarea", {
    value: data.pl_notes,
    onChange: e => set("pl_notes", e.target.value),
    placeholder: "Ex.: posicionamento em DLE, antissepsia adequada, l\xEDquor enviado em 3 frascos..."
  }))), pressureAlert && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger"
  }, "\u26A0 Press\xE3o de abertura > 26 cmH\u2082O \u2014 valor acima do limite superior de refer\xEAncia deste servi\xE7o. Reavaliar hip\xF3tese de HPN idiop\xE1tica."), pressureNum !== null && !pressureAlert && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-ok"
  }, "\u2713 Press\xE3o de abertura dentro do limite de refer\xEAncia (\u2264 26 cmH\u2082O).")), /*#__PURE__*/React.createElement(Section, {
    number: "6",
    title: "Avalia\xE7\xE3o Funcional \u2014 P\xD3S Pun\xE7\xE3o Lombar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Timed Up and Go (TUG) \u2014 p\xF3s PL"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: data.pos_tug,
    onChange: e => set("pos_tug", e.target.value),
    placeholder: "segundos"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text3)",
      fontSize: 13
    }
  }, "s (andar 10 m)"))), /*#__PURE__*/React.createElement(Field, {
    label: "Escore Tinetti p\xF3s \u2014 parcial"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px",
      background: "var(--surface2)",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--mono)",
      fontWeight: 700,
      color: "var(--accent-dark)"
    }
  }, posTin, " / ", TIN_MAX, "  ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text3)",
      fontWeight: 400,
      marginLeft: 8
    }
  }, "(Eq: ", posBal, "/", BAL_MAX, " \xB7 Marcha: ", posGait, "/", GAIT_MAX, ")")))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--accent-dark)",
      textTransform: "uppercase",
      letterSpacing: ".5px",
      margin: "16px 0 8px"
    }
  }, "Tinetti \u2014 Equil\xEDbrio (m\xE1x. 16)"), /*#__PURE__*/React.createElement(TinettiBlock, {
    items: TINETTI_BALANCE,
    values: data.pos_bal,
    onChange: (k, v) => setNested("pos_bal", k, v),
    label: "Escore Equil\xEDbrio",
    max: BAL_MAX
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--accent-dark)",
      textTransform: "uppercase",
      letterSpacing: ".5px",
      margin: "16px 0 8px"
    }
  }, "Tinetti \u2014 Marcha (m\xE1x. 12)"), /*#__PURE__*/React.createElement(TinettiBlock, {
    items: TINETTI_GAIT,
    values: data.pos_gait,
    onChange: (k, v) => setNested("pos_gait", k, v),
    label: "Escore Marcha",
    max: GAIT_MAX
  })), /*#__PURE__*/React.createElement("div", {
    className: "dash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dash-hdr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dash-title"
  }, "\u03A3 Dashboard \u2014 Resposta ao TAP TEST")), /*#__PURE__*/React.createElement("div", {
    className: "dash-body"
  }, /*#__PURE__*/React.createElement("table", {
    className: "dash-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Par\xE2metro"), /*#__PURE__*/React.createElement("th", {
    className: "center"
  }, "Pr\xE9 PL"), /*#__PURE__*/React.createElement("th", {
    className: "center"
  }, "P\xF3s PL"), /*#__PURE__*/React.createElement("th", {
    className: "center"
  }, "\u0394 absoluto"), /*#__PURE__*/React.createElement("th", {
    className: "center"
  }, "\u0394 %"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Timed Up and Go (TUG)"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text3)"
    }
  }, "segundos \u2014 10 m")), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, preTUG !== null ? preTUG.toFixed(1) + " s" : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, posTUG !== null ? posTUG.toFixed(1) + " s" : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, resp.tugDelta !== null ? `${resp.tugDelta > 0 ? "−" : "+"}${Math.abs(resp.tugDelta).toFixed(1)} s` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, resp.tugPct !== null ? `${resp.tugPct > 0 ? "−" : "+"}${Math.abs(resp.tugPct).toFixed(1)}%` : "—")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Tinetti \u2014 Equil\xEDbrio"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text3)"
    }
  }, "m\xE1x. ", BAL_MAX)), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, preFilled > 0 ? `${preBal}/${BAL_MAX}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, posFilled > 0 ? `${posBal}/${BAL_MAX}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, preFilled > 0 && posFilled > 0 ? `${posBal - preBal >= 0 ? "+" : ""}${posBal - preBal}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, "\u2014")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Tinetti \u2014 Marcha"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text3)"
    }
  }, "m\xE1x. ", GAIT_MAX)), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, preFilled > 0 ? `${preGait}/${GAIT_MAX}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, posFilled > 0 ? `${posGait}/${GAIT_MAX}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, preFilled > 0 && posFilled > 0 ? `${posGait - preGait >= 0 ? "+" : ""}${posGait - preGait}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, "\u2014")), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--accent-light)"
    }
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Tinetti \u2014 TOTAL"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text3)"
    }
  }, "m\xE1x. ", TIN_MAX)), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, preFilled > 0 ? `${preTin}/${TIN_MAX}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, posFilled > 0 ? `${posTin}/${TIN_MAX}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, resp.tinDelta !== null ? `${resp.tinDelta >= 0 ? "+" : ""}${resp.tinDelta}` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center mono"
  }, resp.tinPct !== null ? `${resp.tinPct >= 0 ? "+" : ""}${resp.tinPct.toFixed(1)}%` : "—")))), /*#__PURE__*/React.createElement("div", {
    className: `dash-verdict ${resp.verdict}`
  }, resp.label), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--text3)",
      marginTop: 10,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("b", null, "Crit\xE9rios de resposta (Mori 2012 / Wikkels\xF8 2013):"), " RESPONDEDOR quando TUG melhora \u2265 20% ou \u2265 5s, OU Tinetti ganha \u2265 2 pontos / \u2265 10%. LIM\xCDTROFE com melhora menor. N\xC3O RESPONDEDOR sem melhora significativa."))), /*#__PURE__*/React.createElement(Section, {
    number: "7",
    title: "Conclus\xE3o"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Texto da conclus\xE3o (edit\xE1vel)",
    wide: true
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: 6,
    value: data.conclusion,
    onChange: e => setData(p => ({
      ...p,
      conclusion: e.target.value,
      conclusion_manual: true
    })),
    placeholder: "Texto gerado automaticamente a partir dos resultados..."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      flexWrap: "wrap",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: "var(--text2)",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !data.conclusion_manual,
    onChange: e => setData(p => ({
      ...p,
      conclusion_manual: !e.target.checked
    })),
    style: {
      width: "auto"
    }
  }), "Atualizar automaticamente com base nos escores"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: copyReport
  }, "Copiar relat\xF3rio completo")), /*#__PURE__*/React.createElement(Field, {
    label: "Assinatura / Examinador",
    wide: true
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    value: data.examiner,
    onChange: e => set("examiner", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "refs"
  }, /*#__PURE__*/React.createElement("h3", null, "Refer\xEAncias Bibliogr\xE1ficas"), /*#__PURE__*/React.createElement("ol", null, REFERENCES.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, r))))), showPrint && /*#__PURE__*/React.createElement(PrintPreview, {
    data: data,
    computed: {
      preBal,
      preGait,
      preTin,
      posBal,
      posGait,
      posTin,
      preTUG,
      posTUG,
      resp
    },
    onClose: () => setShowPrint(false)
  }));
}

/* ═══ PRINT PREVIEW ═══ */
function PrintPreview({
  data,
  computed,
  onClose
}) {
  const {
    preBal,
    preGait,
    preTin,
    posBal,
    posGait,
    posTin,
    preTUG,
    posTUG,
    resp
  } = computed;
  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  const doPrint = () => setTimeout(() => window.print(), 100);
  const renderTinettiRows = (items, pre, pos) => items.map(it => /*#__PURE__*/React.createElement("tr", {
    key: it.k
  }, /*#__PURE__*/React.createElement("td", null, it.label), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, typeof pre[it.k] === "number" ? pre[it.k] : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, typeof pos[it.k] === "number" ? pos[it.k] : "—")));
  return /*#__PURE__*/React.createElement("div", {
    className: "pv-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-bar no-print"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onClose
  }, "\u2190 Voltar ao formul\xE1rio"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text2)"
    }
  }, "Pr\xE9-visualiza\xE7\xE3o do Relat\xF3rio"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: doPrint
  }, "Imprimir / Salvar PDF")), /*#__PURE__*/React.createElement("div", {
    className: "pv-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-title"
  }, "Relat\xF3rio \u2013 TAP TEST"), /*#__PURE__*/React.createElement("table", {
    className: "pv-table",
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    colSpan: "4"
  }, "TAP TEST")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("b", null, "Nome:"), " ", V(data.initials))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Data Nasc."), /*#__PURE__*/React.createElement("br", null), fmtDate(data.birthdate)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Idade:"), /*#__PURE__*/React.createElement("br", null), V(data.age), " ", data.age ? "anos" : ""), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Sexo:"), /*#__PURE__*/React.createElement("br", null), V(data.gender)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Escolaridade:"), /*#__PURE__*/React.createElement("br", null), V(data.schooling))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("b", null, "M\xE9dico solicitante:"), " ", V(data.requestingDoctor))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("b", null, "Indica\xE7\xE3o:"), " ", V(data.indication))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/React.createElement("b", null, "Data da Avalia\xE7\xE3o:"), " ", fmtDate(data.evalDate)), /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/React.createElement("b", null, "Local:"), " ", V(data.location))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("b", null, "Comorbidades:"), " ", V(data.comorbidities))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("b", null, "Medica\xE7\xF5es em uso:"), " ", V(data.medications))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "4"
  }, /*#__PURE__*/React.createElement("b", null, "Hist\xF3ria Cl\xEDnica:"), /*#__PURE__*/React.createElement("br", null), data.companion && /*#__PURE__*/React.createElement(React.Fragment, null, "Acompanhante \u2014 ", data.companion, /*#__PURE__*/React.createElement("br", null)), data.triad_gait_time && /*#__PURE__*/React.createElement(React.Fragment, null, "Altera\xE7\xE3o de marcha \u2014 ", data.triad_gait_time, /*#__PURE__*/React.createElement("br", null)), data.triad_sphincter_time && /*#__PURE__*/React.createElement(React.Fragment, null, "Altera\xE7\xE3o esfincteriana \u2014 ", data.triad_sphincter_time, /*#__PURE__*/React.createElement("br", null)), data.triad_cognitive_time && /*#__PURE__*/React.createElement(React.Fragment, null, "D\xE9ficit cognitivo \u2014 ", data.triad_cognitive_time))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-sec-h"
  }, "Teste de Marcha e Equil\xEDbrio"), /*#__PURE__*/React.createElement("table", {
    className: "pv-table",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "3"
  }, /*#__PURE__*/React.createElement("b", null, "Timed Up and Go Test"), " \u2014 Observa\xE7\xE3o do tempo que o paciente leva para andar 10 metros")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Antes da PL:"), " ", preTUG !== null ? `${preTUG} segundos` : "—"), /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/React.createElement("b", null, "P\xF3s PL:"), " ", posTUG !== null ? `${posTUG} segundos` : "—"))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("table", {
    className: "pv-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Teste de Tinetti \u2014 Equil\xEDbrio"), /*#__PURE__*/React.createElement("th", null, "Pr\xE9 PL"), /*#__PURE__*/React.createElement("th", null, "P\xF3s PL"))), /*#__PURE__*/React.createElement("tbody", null, renderTinettiRows(TINETTI_BALANCE, data.pre_bal, data.pos_bal), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "#f0f0f0",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("td", null, "Escore de equil\xEDbrio"), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, preBal, "/", BAL_MAX), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, posBal, "/", BAL_MAX))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("table", {
    className: "pv-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Teste de Tinetti \u2014 Marcha"), /*#__PURE__*/React.createElement("th", null, "Pr\xE9 PL"), /*#__PURE__*/React.createElement("th", null, "P\xF3s PL"))), /*#__PURE__*/React.createElement("tbody", null, renderTinettiRows(TINETTI_GAIT, data.pre_gait, data.pos_gait), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "#f0f0f0",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("td", null, "Escore de marcha"), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, preGait, "/", GAIT_MAX), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, posGait, "/", GAIT_MAX)), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "#f0f0f0",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("td", null, "Escore Total Tinetti"), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, preTin, "/", TIN_MAX), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, posTin, "/", TIN_MAX))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("table", {
    className: "pv-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Refer\xEAncia"), /*#__PURE__*/React.createElement("th", null, "Tempo"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Altera\xE7\xE3o de Marcha"), /*#__PURE__*/React.createElement("td", null, V(data.triad_gait_time))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Altera\xE7\xE3o esfincteriana"), /*#__PURE__*/React.createElement("td", null, V(data.triad_sphincter_time))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "D\xE9ficit Cognitivo Amn\xE9stico"), /*#__PURE__*/React.createElement("td", null, V(data.triad_cognitive_time)))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-sec-h"
  }, "Neuroimagem"), /*#__PURE__*/React.createElement("table", {
    className: "pv-table",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, /*#__PURE__*/React.createElement("b", null, "RM de cr\xE2nio"), " ", data.mri_date && `— ${fmtDate(data.mri_date)}`, ": MTA ", V(data.mri_mta), " \xB7 Fazekas ", V(data.mri_fazekas))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "\xC2ngulo do corpo caloso"), /*#__PURE__*/React.createElement("td", null, V(data.mri_callosal), " ", data.mri_callosal && "graus")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "DESH"), /*#__PURE__*/React.createElement("td", null, V(data.mri_desh))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "\xCDndice de Evans"), /*#__PURE__*/React.createElement("td", null, V(data.mri_evans))), data.mri_notes && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "2"
  }, data.mri_notes))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("table", {
    className: "pv-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "RESUMO AVALIA\xC7\xC3O"), /*#__PURE__*/React.createElement("th", null, "Pr\xE9 Pun\xE7\xE3o Lombar"), /*#__PURE__*/React.createElement("th", null, "P\xF3s Pun\xE7\xE3o Lombar"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Timed Up and Go Test (TUG)")), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, preTUG !== null ? `${preTUG} segundos` : "—"), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, posTUG !== null ? `${posTUG} segundos` : "—")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Escore de Tinetti")), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, preTin, "/", TIN_MAX), /*#__PURE__*/React.createElement("td", {
    className: "center"
  }, posTin, "/", TIN_MAX))))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-sec-h"
  }, "Pun\xE7\xE3o Lombar"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #333",
      borderTop: 0,
      padding: "8px 10px",
      fontSize: "11.5px",
      lineHeight: 1.6
    }
  }, "Foi realizada pun\xE7\xE3o lombar ap\xF3s antissepsia adequada e anestesia local com ", data.pl_anesthesia || "lidocaína 2% sem vasoconstritor", ", paciente posicionado em DLE e puncionado espa\xE7o entre ", data.pl_space || "L3-L4", " com agulha de PL n\xBA", data.pl_needle || "22G", ", em ", data.pl_attempts || "1", "\xAA tentativa com sucesso. L\xEDquor aspecto ", (data.pl_aspect || "água de rocha").toLowerCase(), ". Press\xE3o de abertura de ", V(data.pl_pressure), data.pl_pressure && "cmH₂O", " com raquiman\xF4metro. Coletado ", V(data.pl_volume), data.pl_volume && " ml", " de l\xEDquor", data.pl_volume && " em 3 frascos e enviado para análise", ".", data.pl_notes && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), data.pl_notes))), /*#__PURE__*/React.createElement("div", {
    className: "pv-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-sec-h"
  }, "Conclus\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #333",
      borderTop: 0,
      padding: "10px 12px",
      fontSize: "11.5px",
      lineHeight: 1.7,
      whiteSpace: "pre-wrap"
    }
  }, data.conclusion || "—")), /*#__PURE__*/React.createElement("div", {
    className: "pv-foot"
  }, /*#__PURE__*/React.createElement("p", null, "\xC0 disposi\xE7\xE3o,"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      whiteSpace: "pre-wrap"
    }
  }, data.examiner), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12
    }
  }, "Bras\xEDlia, ", fmtDate(data.evalDate)))));
}

/* ═══ PLAIN-TEXT REPORT (for clipboard copy) ═══ */
function buildPlainReport(data, c) {
  const {
    preBal,
    preGait,
    preTin,
    posBal,
    posGait,
    posTin,
    preTUG,
    posTUG,
    resp
  } = c;
  const L = [];
  L.push("RELATÓRIO – TAP TEST");
  L.push("");
  L.push(`Nome: ${V(data.initials)}`);
  L.push(`Data Nasc.: ${fmtDate(data.birthdate)}  |  Idade: ${V(data.age)}  |  Sexo: ${V(data.gender)}  |  Escolaridade: ${V(data.schooling)}`);
  L.push(`Médico solicitante: ${V(data.requestingDoctor)}`);
  L.push(`Indicação: ${V(data.indication)}`);
  L.push(`Data da Avaliação: ${fmtDate(data.evalDate)}  |  Local: ${V(data.location)}`);
  L.push(`Comorbidades: ${V(data.comorbidities)}`);
  L.push(`Medicações em uso: ${V(data.medications)}`);
  L.push("");
  L.push("TIMED UP AND GO (10 m):");
  L.push(`  Pré PL: ${preTUG !== null ? preTUG + " s" : "—"}     Pós PL: ${posTUG !== null ? posTUG + " s" : "—"}`);
  L.push("");
  L.push(`TINETTI — Equilíbrio:  Pré ${preBal}/${BAL_MAX}   Pós ${posBal}/${BAL_MAX}`);
  L.push(`TINETTI — Marcha:      Pré ${preGait}/${GAIT_MAX}   Pós ${posGait}/${GAIT_MAX}`);
  L.push(`TINETTI — TOTAL:       Pré ${preTin}/${TIN_MAX}   Pós ${posTin}/${TIN_MAX}`);
  L.push("");
  L.push("NEUROIMAGEM:");
  L.push(`  RM ${fmtDate(data.mri_date)} — MTA ${V(data.mri_mta)} · Fazekas ${V(data.mri_fazekas)}`);
  L.push(`  Ângulo do corpo caloso: ${V(data.mri_callosal)}°`);
  L.push(`  DESH: ${V(data.mri_desh)}`);
  L.push(`  Índice de Evans: ${V(data.mri_evans)}`);
  L.push("");
  L.push("PUNÇÃO LOMBAR:");
  L.push(`  Espaço ${data.pl_space || "—"} · Agulha ${data.pl_needle || "—"} · Tentativas ${data.pl_attempts || "—"}`);
  L.push(`  Aspecto: ${data.pl_aspect || "—"} · Pressão de abertura: ${V(data.pl_pressure)} cmH₂O · Volume: ${V(data.pl_volume)} ml`);
  L.push("");
  L.push(`CONCLUSÃO: ${resp.label}`);
  L.push("");
  L.push(data.conclusion || "");
  L.push("");
  L.push(data.examiner);
  return L.join("\n");
}

/* ═══ MOUNT ═══ */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(TapTestApp, null));
