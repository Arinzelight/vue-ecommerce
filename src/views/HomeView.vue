<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import apiService from "@/services/apiService";
import ProductCard from "@/components/products/ProductCard.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import CategoriesSection from "@/components/sections/CategoriesSection.vue";
import RecentlyViewedSection from "@/components/sections/RecentlyViewedSection.vue";
import FavoritesSection from "@/components/sections/FavoritesSection.vue";

const categories = ref([]);

const error = ref(null);
const isLoading = ref(false);

const fetchCategories = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    categories.value = await apiService.getCategories();
  } catch (err) {
    error.value = "Failed to load categories. Please try again later.";
    console.error("Failed to fetch categories:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container mx-auto sm:px-3 px-0">
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"
      ></div>
    </div>

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
