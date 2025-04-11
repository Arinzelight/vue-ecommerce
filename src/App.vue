<script setup>
import { RouterView } from "vue-router";
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
import { useThemeStore } from "@/stores/theme";

const theme = useThemeStore();
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-grow container mx-auto sm:px-4 px-1 py-8">
      <RouterView />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
