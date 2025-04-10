<script setup>
import { useProductStore } from "@/stores/productStore";
import ProductTable from "@/components/products/ProductTable.vue";
import { Heart } from "lucide-vue-next";

const productStore = useProductStore();
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Your Favorite Products</h1>

    <div v-if="productStore.favorites.length === 0" class="text-center py-12">
      <Heart class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
      <p class="mt-1 text-gray-500">
        Start adding some products to your favorites!
      </p>
    </div>

    <ProductTable
      v-else
      :products="productStore.favorites"
      :show-remove="true"
      @toggle-favorite="productStore.toggleFavorite"
    />
  </div>
</template>
