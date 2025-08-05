/** Определить текущую тему и пометить <html> классом dark, если тема тёмная */
(function () {
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = savedTheme === "dark" || (!savedTheme && systemTheme);

  if (dark) {
    document.documentElement.classList.add("dark");
  }
})();
