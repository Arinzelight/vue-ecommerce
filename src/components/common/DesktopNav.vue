<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { Heart } from "lucide-vue-next";
import ThemeToggle from "@/components/common/ThemeToggle.vue";

const productStore = useProductStore();
const favoritesCount = computed(() => productStore.favorites.length);
</script>

<template>
  <nav class="hidden md:flex items-center space-x-6">
    <router-link
      to="/categories"
      class="hover:text-accent-300 transition-colors"
    >
      Categories
    </router-link>
    <router-link
      to="/favorites"
      class="hover:text-accent-300 transition-colors flex items-center relative"
    >
      <Heart class="w-5 h-5 mr-1" />
      <span>Favorites</span>
      <span
        v-if="favoritesCount > 0"
        class="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full"
      >
        {{ favoritesCount }}
      </span>
    </router-link>
    <ThemeToggle />
  </nav>
</template>
