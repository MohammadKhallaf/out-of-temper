// ==UserScript==
// @name         FrontendMaster Counter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Mohammed Khallaf
// @match        https://frontendmasters.com/courses/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=frontendmasters.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let lessonList;
  const doneSpan = document.createElement("span");
  let allLessons = 0;
  let completedLessons = 0;

  const listObserver = new MutationObserver((_, observer) => {
    allLessons = document.querySelectorAll(".lesson").length;
    const completed = document.querySelectorAll(".lesson.completed").length;
    if (completedLessons == completed) {
      return;
    }
    completedLessons = completed;
    const videoContainer = document.querySelector("video");
    doneSpan.innerHTML = `<b>${completedLessons}</b> of ${allLessons}`;
    doneSpan.style.position = "absolute";
    doneSpan.style.top = "1rem";
    doneSpan.style.right = "1rem";
    doneSpan.style.cssText = `position:absolute;top:1rem;right:1rem;background:black;padding:0.3rem;box-shadow:black 4px 6px 13px -3px;border-radius:1rem;`;
    videoContainer.after(doneSpan);
  });

  const DOMobserver = new MutationObserver((_, observer) => {
    if (document.querySelector("[data-id='lessonList']")) {
      observer.disconnect();
      lessonList = document.querySelector("[data-id='lessonList']");
      listObserver.observe(lessonList, {
        subtree: true,
        attributes: true,
      });
    }
  });

  DOMobserver.observe(document, {
    subtree: true,
    attributes: true,
  });
})();
