<script setup>
import { RouterView } from "vue-router";
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";
// import { useProductStore } from "@/stores/productStore";

// const productStore = useProductStore();
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

<style>
/* Page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
