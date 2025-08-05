/** Переключить тему */
export const toggleTheme = (): "dark" | "light" => {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  const nextTheme = isDark ? "dark" : "light";
  localStorage.setItem("theme", nextTheme);
  return nextTheme;
};
