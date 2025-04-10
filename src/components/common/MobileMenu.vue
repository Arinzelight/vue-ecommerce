<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { Heart, X } from "lucide-vue-next";

defineProps({ isOpen: Boolean });
const productStore = useProductStore();
const favoritesCount = computed(() => productStore.favorites.length);
</script>

<template>
  <div
    v-if="isOpen"
    class="md:hidden absolute top-0 left-0 w-full bg-primary text-white z-50 p-6"
  >
    <div class="flex justify-between items-center">
      <router-link
        to="/"
        class="text-2xl font-bold tracking-tight font-display"
      >
        VueShop
      </router-link>
      <button @click="$emit('close')" class="text-white">
        <X class="w-6 h-6" />
      </button>
    </div>
    <nav class="mt-6">
      <router-link
        to="/categories"
        class="block py-2 text-lg"
        @click="$emit('close')"
      >
        Categories
      </router-link>
      <router-link
        to="/favorites"
        class="block py-2 text-lg flex items-center"
        @click="$emit('close')"
      >
        <Heart class="w-5 h-5 mr-2" />
        Favorites
        <span
          v-if="favoritesCount > 0"
          class="ml-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full"
        >
          {{ favoritesCount }}
        </span>
      </router-link>
    </nav>
  </div>
</template>
