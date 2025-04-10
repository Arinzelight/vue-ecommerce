<!-- components/sections/RecentlyViewedSection.vue -->
<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/products/ProductCard.vue";

const productStore = useProductStore();
const recentProducts = computed(() => productStore.lastVisited.slice(0, 5));
console.log(recentProducts.value);
</script>

<template>
  <section
    v-if="recentProducts.length"
    class="bg-white p-4 sm:p-6 mb-[4rem] rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div class="flex justify-between items-center mb-4 sm:mb-6">
      <h2
        class="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2 text-primary-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clip-rule="evenodd"
          />
        </svg>
        Recently Viewed
      </h2>
      <router-link
        to="/products"
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
        v-for="product in recentProducts"
        :key="'recent-' + product.id"
        :product="product"
        class="transform hover:-translate-y-1 transition-transform"
      />
    </div>
  </section>
</template>
