function setMenu(open) {
  const menu = document.querySelector(".mb__menu");
  const btn = document.querySelector(".mb__menu__btn");
  const icon = document.querySelector(".icon");
  menu.classList.toggle("open", open);
  icon.src = open ? "./assets/img/exit-icon.svg" : "./assets/img/bar-icon.svg";
  // Leitores de tela precisam saber se o painel está aberto ou fechado.
  btn.setAttribute("aria-expanded", String(open));
  btn.setAttribute(
    "aria-label",
    open ? "Fechar menu de navegação" : "Abrir menu de navegação"
  );
}

function menuShow() {
  const menu = document.querySelector(".mb__menu");
  setMenu(!menu.classList.contains("open"));
}

function chooseSection() {
  setMenu(false);
}
