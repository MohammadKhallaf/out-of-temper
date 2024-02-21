// ==UserScript==
// @name         Get access token
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get access token in the dev mode to the clipboard
// @author       Mohammed Khallaf
// @match        http://localhost:*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  document.addEventListener("keydown", function (event) {
    // Check for the key combination: Ctrl + Shift + C
    if (event.ctrlKey && event.shiftKey && event.code === "KeyC") {
      // Copy the access token to the clipboard
      const accessToken = localStorage.getItem("access-token"); // Replace with the actual access token
      navigator.clipboard
        .writeText(accessToken)
        .then(function () {
          alert("Access token copied to clipboard!");
        })
        .catch(function (error) {
          console.error("Failed to copy access token:", error);
        });
    }
  });
})();
