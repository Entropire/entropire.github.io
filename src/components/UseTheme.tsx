import { useEffect, useState } from "react";

export function useTheme() {
  const [manualTheme, setManualTheme] = useState<"light" | "dark" | null>(null);

  const [systemPrefersDark, setSystemPrefersDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const theme = systemPrefersDark ? "dark" : "light";

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", manualTheme || theme);
  }, [theme, manualTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setManualTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme: manualTheme || theme, toggleTheme };
}
