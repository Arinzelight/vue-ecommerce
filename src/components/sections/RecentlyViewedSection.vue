<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/products/ProductCard.vue";
import { Clock3, ArrowRight } from "lucide-vue-next";

const productStore = useProductStore();
const recentProducts = computed(() => productStore.lastVisited.slice(0, 5));
</script>

<template>
  <section
    v-if="recentProducts.length"
    class="bg-white dark:bg-gray-900 p-4 sm:p-6 mb-[2rem] rounded-xl"
  >
    <div class="flex justify-between items-center mb-4 sm:mb-6">
      <h2 class="text-xl sm:text-2xl font-semibold flex items-center">
        <Clock3 class="w-5 h-5 mr-2 text-primary" />
        Recently Viewed
      </h2>
      <router-link
        to="/products"
        class="text-sm text-primary hover:text-primary-700 flex items-center"
      >
        View All
        <ArrowRight class="w-4 h-4 ml-1" />
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
