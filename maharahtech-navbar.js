// ==UserScript==
// @name         MaharaTech NavBar
// @namespace    http://tampermonkey.net/
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @version      0.1
// @description  Fix The Navbar Behaviour
// @author       You
// @match        https://maharatech.gov.eg/mod/hvp/*
// @icon         https://maharatech.gov.eg/pluginfile.php/1/theme_edumy/favicon/1647527130/iti-fav%20%281%29.png
// @grant        none
// ==/UserScript==

const onScrollListener = (_) => {
  const frameTop = $(".dashboard_main_content iframe")
    .get(0)
    .getBoundingClientRect().y;

  if (frameTop < $("header").height() + 25) {
    $("header").css("display", "none");
  } else {
    $("header").css("display", "block");
  }
};

const myfunc = function () {
  $(document).ready(() => {
    $(window).scroll(onScrollListener);
  });
};

setTimeout(myfunc, 2000);
