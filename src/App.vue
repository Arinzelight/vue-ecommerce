<script setup>
import { RouterView } from "vue-router";
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <RouterView />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
