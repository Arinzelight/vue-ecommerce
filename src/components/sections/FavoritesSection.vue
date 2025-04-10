<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/products/ProductCard.vue";
import { Heart, ArrowRight } from "lucide-vue-next";

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
        <Heart class="h-5 w-5 mr-2 text-red-500 fill-rose-500" />
        Your Favorites
      </h2>
      <router-link
        to="/favorites"
        class="text-sm text-primary-600 hover:text-primary-800 flex items-center"
      >
        View All
        <ArrowRight class="h-4 w-4 ml-1" />
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
