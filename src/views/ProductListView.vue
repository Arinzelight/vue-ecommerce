<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import apiService from "@/services/apiService";
import { useProductStore } from "@/stores/productStore";
import ProductTable from "@/components/products/ProductTable.vue";
import PaginationControls from "@/components/common/PaginationControls.vue";
import ProductSort from "@/components/products/ProductSort.vue";

const route = useRoute();
const productStore = useProductStore();
const products = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(7);

// Sorting
const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];
const selectedSort = ref("default");

const filteredProducts = computed(() => {
  let result = [...products.value];

  if (route.params.category) {
    result = result.filter(
      (p) =>
        p.category.name.toLowerCase() === route.params.category.toLowerCase()
    );
  }

  return result;
});

const sortedProducts = computed(() => {
  const productsToSort = [...filteredProducts.value];

  switch (selectedSort.value) {
    case "name-asc":
      return productsToSort.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return productsToSort.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return productsToSort.sort((a, b) => a.price - b.price);
    case "price-desc":
      return productsToSort.sort((a, b) => b.price - a.price);
    default:
      return productsToSort;
  }
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedProducts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage.value);
});

// Reset to first page when sorting changes
watch(selectedSort, () => {
  currentPage.value = 1;
});

const fetchProducts = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await apiService.getAllProducts();
    products.value = response;
  } catch (err) {
    error.value = err.message || "Failed to fetch products";
    console.error("Fetch error:", error.value);
  } finally {
    isLoading.value = false;
  }
};

const fetchCategoryProducts = async (category) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await apiService.getProductsByCategory(category);
    products.value = response;
  } catch (err) {
    error.value =
      err.message || `Failed to fetch products for category ${category}`;
    console.error("Category fetch error:", error.value);
  } finally {
    isLoading.value = false;
  }
};

// watcher for both initial load and route changes
watch(
  () => route.params.category,
  (newCategory, oldCategory) => {
    if (newCategory === oldCategory) return;

    if (newCategory) {
      fetchCategoryProducts(newCategory);
    } else {
      fetchProducts();
    }
    currentPage.value = 1;
  },
  { immediate: true }
);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-display font-bold text-gray-900 mb-6">
      {{
        route.params.category
          ? `${route.params.category} Products`
          : "All Products"
      }}
    </h1>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
    >
      {{ error }}
    </div>

    <template v-else>
      <div
        class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <p class="text-gray-600">
          Showing {{ paginatedProducts.length }} of
          {{ sortedProducts.length }} products
        </p>

        <ProductSort v-model="selectedSort" :options="sortOptions" />
      </div>

      <div v-if="sortedProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500">No products found</p>
      </div>

      <template v-else>
        <ProductTable
          :products="paginatedProducts"
          @toggle-favorite="productStore.toggleFavorite"
          @visit="productStore.addLastVisited"
        />

        <PaginationControls
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="(page) => (currentPage = page)"
          class="mt-8"
        />
      </template>
    </template>
  </div>
</template>
