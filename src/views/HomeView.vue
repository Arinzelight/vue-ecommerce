<script setup>
import HeroSection from "@/components/sections/HeroSection.vue";
import CategoriesSection from "@/components/sections/CategoriesSection.vue";
import RecentlyViewedSection from "@/components/sections/RecentlyViewedSection.vue";
import FavoritesSection from "@/components/sections/FavoritesSection.vue";
</script>

<template>
  <div class="container mx-auto sm:px-3 px-0">
    <!-- Hero Section -->

    <HeroSection />

    <!-- Categories Section -->

    <CategoriesSection />

    <!-- Recently Viewed -->
    <RecentlyViewedSection />

    <!-- Favorites -->
    <FavoritesSection />
  </div>
</template>
