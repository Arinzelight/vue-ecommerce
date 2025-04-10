<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/products/ProductCard.vue";

const productStore = useProductStore();
const favoriteProducts = computed(() => productStore.favorites.slice(0, 5));
</script>

<template>
  <section
    v-if="favoriteProducts.length"
    class="bg-white p-4 sm:p-6 rounded-xl border border-gray-100"
  >
    <div class="flex justify-between items-center mb-4 sm:mb-6">
      <h2
        class="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
        Your Favorites
      </h2>
      <router-link
        to="/favorites"
        class="text-sm text-primary-600 hover:text-primary-800 flex items-center"
      >
        View All
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </router-link>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3 sm:gap-4"
    >
      <ProductCard
        v-for="product in favoriteProducts"
        :key="'fav-' + product.id"
        :product="product"
        class="transform hover:-translate-y-1 transition-transform"
      />
    </div>
  </section>
</template>
