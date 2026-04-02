function menuShow() {
  const showMenu = document.querySelector(".mb__menu");
  if (showMenu.classList.contains("open")) {
    showMenu.classList.remove("open");
    document.querySelector(".icon").src = "./assets/img/bar-icon.svg";
  } else {
    showMenu.classList.add("open");
    document.querySelector(".icon").src = "./assets/img/exit-icon.svg";
  }
}

function chooseSection() {
  const menuMobile = document.querySelector(".mb__menu");
  menuMobile.classList.remove("open");
  document.querySelector(".icon").src = "./assets/img/bar-icon.svg";
}
