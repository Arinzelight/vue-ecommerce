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
const itemsPerPage = ref(10);

// Sorting
const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];
const selectedSort = ref("default");

// Computed: Filter by category first
const categoryFilteredProducts = computed(() => {
  if (!route.params.category) return [...products.value];

  return products.value.filter(
    (p) => p.category.name.toLowerCase() === route.params.category.toLowerCase()
  );
});

// Computed: Filter by search query
const searchFilteredProducts = computed(() => {
  const searchTerm = route.query.search?.toLowerCase();
  if (!searchTerm) return categoryFilteredProducts.value;

  return categoryFilteredProducts.value.filter((p) =>
    p.title.toLowerCase().includes(searchTerm)
  );
});

const searchTerm = computed(() => route.query.search || "");

// Computed: Sorting
const sortedProducts = computed(() => {
  const toSort = [...searchFilteredProducts.value];
  switch (selectedSort.value) {
    case "name-asc":
      return toSort.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return toSort.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return toSort.sort((a, b) => a.price - b.price);
    case "price-desc":
      return toSort.sort((a, b) => b.price - a.price);
    default:
      return toSort;
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

// Reset to first page when sorting or search changes
watch([selectedSort, () => route.query.search], () => {
  currentPage.value = 1;
});

// Fetch all products
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

// Fetch by category when route param changes
watch(
  () => route.params.category,
  (newCategory) => {
    fetchProducts();
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
      <span v-if="searchTerm">
        for "<small>{{ searchTerm }}</small
        >"</span
      >
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
