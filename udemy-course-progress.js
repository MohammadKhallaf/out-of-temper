// ==UserScript==
// @name         Udemy Percentage
// @namespace    http://tampermonkey.net/
// @version      2024-04-17
// @description  show the course progress in percentage and header colors
// @author       Mohammed Khallaf
// @match        https://www.udemy.com/course/*/learn/lecture/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=udemy.com
// @grant        none
// ==/UserScript==

const config = { attributes: true, childList: true, subtree: true };
const regex = /(\d+)\s+of\s+(\d+)/; // match the digits

(function () {
  "use strict";
  const progressPopoverText = document.querySelector(
    '[class="ud-main-content"]'
  );
  const targetNode = document.querySelector(".ud-main-content");
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        const progressPopoverText = document.querySelector(
          "[data-purpose=progress-popover-text]"
        );
        if (!progressPopoverText) return;
        const numbersContainer = progressPopoverText.innerText;
        // Extract the numbers from the container
        const matches = numbersContainer.match(regex);

        if (matches) {
          const currentNumber = parseInt(matches[1]);
          if (!currentNumber) return;
          const totalNumber = parseInt(matches[2]);
          const newText = `${currentNumber} of ${totalNumber} <i style='color: #401b9c;font-size:0.7rem;'> ( ${(
            (currentNumber / totalNumber) *
            100
          ).toFixed(0)}% ) </i> <br/> Remaining ${totalNumber - currentNumber}`;
          progressPopoverText.innerHTML = newText;
          document.querySelector(
            "[class*=app--header]"
          ).style.backgroundImage = `linear-gradient(90deg, var(--color-purple-500) ${(
            (currentNumber / totalNumber) *
            100
          ).toFixed(0)}%, black ${(
            (currentNumber / totalNumber) * 100 +
            2.5
          ).toFixed(0)}%)`;
          if (!!currentNumber) observer.disconnect();
        } else return;
      } else return;
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
})();
