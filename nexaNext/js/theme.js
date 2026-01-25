const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

const sunIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <circle cx="12" cy="12" r="5"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="12" y1="1" x2="12" y2="4"/>
    <line x1="12" y1="20" x2="12" y2="23"/>
    <line x1="1" y1="12" x2="4" y2="12"/>
    <line x1="20" y1="12" x2="23" y2="12"/>
    <line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/>
    <line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/>
    <line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/>
    <line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/>
  </g>
</svg>
`;

const moonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
</svg>
`;

function setTheme(theme) {
  const isDark = theme === "dark";

  if (isDark) {
    root.setAttribute("data-theme", "dark");
    toggleBtn.innerHTML = sunIcon;
    toggleBtn.setAttribute("aria-label", "Switch to light theme");
  } else {
    root.removeAttribute("data-theme");
    toggleBtn.innerHTML = moonIcon;
    toggleBtn.setAttribute("aria-label", "Switch to dark theme");
  }

  localStorage.setItem("theme", theme);
}


function getSavedTheme() {
  return localStorage.getItem("theme") || "light";
}

setTheme(getSavedTheme());

toggleBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});
