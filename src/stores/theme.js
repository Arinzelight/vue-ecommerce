import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  // Initialize theme
  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    isDark.value = savedTheme ? savedTheme === "dark" : systemPrefersDark;
    applyTheme();
  };

  // Apply theme to DOM
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
    applyTheme();
  };

  // Watch for system preference changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      isDark.value = e.matches;
      applyTheme();
    }
  });

  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    toggleTheme,
  };
});
