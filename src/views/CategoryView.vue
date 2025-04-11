<script setup>
import { ref, onMounted } from "vue";
import apiService from "@/services/apiService";
import CategoryCard from "@/components/products/CategoryCard.vue";
import { Loader2 } from "lucide-vue-next";

const categories = ref([]);
const isLoading = ref(false);
const error = ref(null);

const fetchCategories = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    categories.value = await apiService.getCategories();
  } catch (err) {
    error.value = "Failed to load categories. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container mx-auto py-8 mb-8">
    <h1 class="text-3xl font-bold">Product Categories</h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <Loader2 class="h-12 w-12 text-primary-500 animate-spin" />
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
    >
      {{ error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="categories.length === 0" class="text-center py-12">
      <p class="text-gray-500">No categories found.</p>
    </div>

    <!-- Categories List -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 mt-10 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        class=""
      />
    </div>
  </div>
</template>
