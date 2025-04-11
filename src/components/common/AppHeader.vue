<script setup>
import { ref } from "vue";
import Logo from "@/components/common/Logo.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import DesktopNav from "@/components/common/DesktopNav.vue";
import MobileMenu from "@/components/common/MobileMenu.vue";

const isMobileMenuOpen = ref(false);
</script>

<template>
  <header class="bg-primary text-white shadow-md dark:bg-gray-900">
    <div class="container mx-auto px-4 py-4">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <Logo @toggle="isMobileMenuOpen = !isMobileMenuOpen" />
        <SearchBar />
        <div class="flex items-center gap-4">
          <DesktopNav />
        </div>
      </div>
      <MobileMenu
        :isOpen="isMobileMenuOpen"
        @close="isMobileMenuOpen = false"
      />
    </div>
  </header>
</template>
