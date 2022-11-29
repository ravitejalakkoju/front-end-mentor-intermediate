const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function loadThemeIcon(isLight = true) {
  document.getElementById('js-theme-icon').setAttribute('src', isLight ? './images/icon-moon.svg' : './images/icon-sun.svg');
}

function loadSystemTheme() {
  if (prefersDarkScheme.matches) {
    loadThemeIcon(false);
    document.body.classList.add("dark-theme");
  } else {
    loadThemeIcon();
    document.body.classList.remove("dark-theme");
  }
}

function loadDarkTheme() {
  loadThemeIcon(false);
  document.body.classList.add("dark-theme");
}

const themeToggle = document.getElementById("js-theme-toggle");
const currentTheme = localStorage.getItem("theme");

if(!currentTheme) loadSystemTheme();
else if (currentTheme == "dark") loadDarkTheme();
else loadThemeIcon();

themeToggle.addEventListener("click", function() {
  document.body.classList.toggle("dark-theme");
  
  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }

  loadThemeIcon(theme == "light");

  localStorage.setItem("theme", theme);
});