<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import apiService from "@/services/apiService";
import { useProductStore } from "@/stores/productStore";
import { Heart, Loader2 } from "lucide-vue-next";

const route = useRoute();
const productStore = useProductStore();
const product = ref(null);
const isLoading = ref(false);
const error = ref(null);

const fetchProduct = async (id) => {
  isLoading.value = true;
  error.value = null;
  try {
    product.value = await apiService.getProductById(id);
    productStore.addLastVisited(product.value);
  } catch (err) {
    error.value = err.message || `Failed to fetch product with id ${id}`;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProduct(parseInt(route.params.id));
});

watch(
  () => route.params.id,
  (newId) => {
    fetchProduct(parseInt(newId));
  }
);

const isFavorite = computed(() => {
  return product.value
    ? productStore.favorites.some((p) => p.id === product.value.id)
    : false;
});

const toggleFavorite = () => {
  if (product.value) {
    productStore.toggleFavorite(product.value);
  }
};
</script>

<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <Loader2 class="h-12 w-12 text-primary-500 animate-spin" />
      </div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      {{ error }}
    </div>

    <div v-else-if="product" class="grid md:grid-cols-2 gap-8">
      <div class="rounded-lg overflow-hidden">
        <img
          :src="product.images?.[0]"
          :alt="product.category.title"
          class="w-full h-96 object-cover rounded-2xl"
          loading="lazy"
        />
      </div>

      <div>
        <div class="flex justify-between items-start">
          <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>
          <button
            @click="toggleFavorite"
            class="text-2xl focus:outline-none cursor-pointer"
            aria-label="Toggle favorite"
          >
            <Heart
              :class="{
                'fill-rose-500 stroke-rose-600': isFavorite,
                'stroke-gray-400 fill-white': !isFavorite,
              }"
              class="h-5 w-5 transition-all"
              :stroke-width="isFavorite ? 1.5 : 2"
            />
          </button>
        </div>

        <div class="mb-4">
          <span class="text-2xl font-semibold">${{ product.price }}</span>
          <span
            class="ml-2 px-2 py-1 bg-blue-100 text-secondary-700 text-sm rounded-full"
          >
            {{ product.category.name }}
          </span>
        </div>

        <p class="text-gray-700 dark:text-gray-200 mb-6">
          {{ product.description }}
        </p>

        <div class="flex space-x-4">
          <button
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <button
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
