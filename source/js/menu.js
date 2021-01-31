
  var navList = document.querySelector(".main-nav__list");
  var listToggle = document.querySelector(".main-nav__menu-toggle");

  navList.classList.remove("main-nav__list--nojs");
  listToggle.classList.remove("main-nav__menu-toggle--nojs")

  listToggle.addEventListener("click", function() {
    if (navList.classList.contains("main-nav__list--closed")) {
      navList.classList.remove("main-nav__list--closed");
      listToggle.classList.add("main-nav__menu-toggle--active");
    } else {
      navList.classList.add("main-nav__list--closed");
      listToggle.classList.remove("main-nav__menu-toggle--active");
    }
  });
