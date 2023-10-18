// ==UserScript==
// @name         MaharaTech UI edit
// @namespace    http://tampermonkey.net/
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @version      0.2
// @description  Add Scroll Behaviour, and Nav buttons
// @author       You
// @match        https://maharatech.gov.eg/mod/hvp/*
// @icon         https://maharatech.gov.eg/pluginfile.php/1/theme_edumy/favicon/1647527130/iti-fav%20%281%29.png
// @grant        none
// ==/UserScript==

(function () {
  $(document).ready(() => {
    setTimeout(() => {
      fixNav();

      fixBottomNavButtons();

      counter();

      highlightLesson();
    }, 5000);
  });
})();

function counter() {
  const lessons = document.querySelectorAll(".autocompletion")?.length;
  const completedLessons = document.querySelectorAll(
    '[src$="completion-auto-y"]'
  )?.length;

  $("h2.ccnMdlHeading").prepend(`
  <div style="display:flex;gap:1rem;align-items: center;"font-size:1rem;">
  <progress id="file" max="100" value="${(
    (completedLessons * 100) /
    lessons
  ).toFixed(0)}"> ${((completedLessons * 100) / lessons).toFixed(
    0
  )}% </progress>
  <span dir="ltr" style="font-size:1rem;">
   ${completedLessons} of ${lessons}
  </span>
  </div>
  `);
}

function fixNav() {
  const target = document.querySelector(".dashboard_main_content iframe");
  const config = { attributes: true, childList: true, subtree: true };
  let time;
  const observer = new MutationObserver((...params) => {
    clearTimeout(time);

    time = setTimeout(() => {
      $(".dashboard_sidebar .simplebar-content").animate(
        {
          scrollTop:
            $(`.instancename:contains("${$("h2").html()}")`)
              .first()
              .offset().top - $(".dashboard_main_content iframe").offset().top,
        },
        "slow"
      );
      $(`.activityinstance`)
        .has(`.instancename:contains("${$("h2").html()}")`)
        .first()
        .css({
          background: `linear-gradient(to ${
            $("html").attr("dir") == "rtl" ? "right" : "left"
          }, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 28%)`,
        });
      $(`.instancename:contains("${$("h2").html()}")`)
        .first()
        .css({
          "font-weight": "bold",
          color: "white",
        });
      observer.disconnect();
    }, 2000);
  });
  observer.observe(target, config);
}

function fixBottomNavButtons() {
  const prevBtn = document.querySelector("#prev-activity-link");
  const nxtBtn = document.querySelector("#next-activity-link");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        prevBtn.className =
          "btn btn-outline-danger btn-link text-dark text-decoration-none";
        nxtBtn.className =
          "btn btn-danger btn-link text-dark fw-bold text-decoration-none";
        nxtBtn.setAttribute("style", "color: black !important");
        $(".bg-danger");

        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(prevBtn);
}

function highlightLesson() {
  $(document).scroll((_) => {
    if (
      $(".dashboard_main_content iframe").get(0).getBoundingClientRect().y <
      $("header").height() + 25
    ) {
      $("header").css("display", "none");
    } else {
      $("header").css("display", "block");
    }
  });
}
