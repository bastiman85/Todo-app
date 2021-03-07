var body = [document.getElementsByTagName("BODY")[0]];
var header = [document.getElementsByTagName("header")[0]];

var nodesToTransition = body.concat(header);

const toggleSwitch = document.getElementById("dark-mode");
let span = toggleSwitch.querySelector("span");
let icon = toggleSwitch.querySelector("i");

toggleSwitch.addEventListener("click", setDark, false);

function setDark(e) {
   span.classList.add("active");
   setTimeout(function () {
      span.classList.remove("active");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); //Ta bort detta om webbläsaren alltid ska bestämma
      transitionColor();
      icon.classList.remove("icon-moon");
      icon.classList.add("icon-sun");
      if (icon.classList.contains("icon-sun")) {
         toggleSwitch.removeEventListener("click", setDark);
         toggleSwitch.addEventListener("click", setLight, false);
      }
   }, 250);
}

function setLight(e) {
   span.classList.add("active");
   setTimeout(function () {
      span.classList.remove("active");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); //Ta bort detta om webbläsaren alltid ska bestämma
      transitionColor();
      icon.classList.add("icon-moon");
      icon.classList.remove("icon-sun");
      if (icon.classList.contains("icon-moon")) {
         toggleSwitch.removeEventListener("click", setLight);
         toggleSwitch.addEventListener("click", setDark, false);
      }
   }, 250);
}

const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

if (currentTheme) {
   document.documentElement.setAttribute("data-theme", currentTheme);

   if (currentTheme === "dark") {
      icon.classList.remove("icon-moon");
      icon.classList.add("icon-sun");
      toggleSwitch.removeEventListener("click", setDark);
      toggleSwitch.addEventListener("click", setLight, false);
   }
}

// Cred: Ananya Neogi https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8

// /* Används om man inte vill spara läget till nästa besök */
// const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// if (darkModeMediaQuery.matches === true) {
//    document.documentElement.setAttribute("data-theme", "dark");
//    toggleSwitch.checked = true;
// }

// Cred: Thomas Steiner https://web.dev/prefers-color-scheme/#dark-mode-but-add-an-opt-out

function transitionColor() {
   for (i = 0; i < nodesToTransition.length; i++) {
      nodesToTransition[i].style.transition = "color 250ms linear, background-color 250ms linear";
   }
}
