<script setup>
import { Sun, Moon } from "lucide-vue-next";
import { useThemeStore } from "@/stores/theme";

const theme = useThemeStore();
</script>

<template>
  <button
    @click="theme.toggleTheme"
    class="p-2 rounded-full transition-colors cursor-pointer duration-300 border border-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
    :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <component
      :is="theme.isDark ? Sun : Moon"
      class="w-6 h-6"
      :class="theme.isDark ? 'text-yellow-300' : 'text-primary-100'"
    />
  </button>
</template>
