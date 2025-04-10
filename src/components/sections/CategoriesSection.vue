<script setup>
import { ref, onMounted, watch } from "vue";
import apiService from "@/services/apiService";
import CategoryCard from "@/components/products/CategoryCard.vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const categories = ref([]);
const isLoading = ref(false);
const error = ref(null);
const containerRef = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

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
  updateScrollStatus();
});

// Watch for scroll events to update button visibility
const updateScrollStatus = () => {
  if (!containerRef.value) return;

  containerRef.value.addEventListener("scroll", () => {
    const container = containerRef.value;
    isAtStart.value = container.scrollLeft === 0;
    isAtEnd.value =
      container.scrollLeft === container.scrollWidth - container.clientWidth;
  });
};

const scrollLeft = () => {
  if (containerRef.value) {
    containerRef.value.scrollLeft -= 300;
  }
};

const scrollRight = () => {
  if (containerRef.value) {
    containerRef.value.scrollLeft += 300;
  }
};
</script>

<template>
  <section class="mb-10">
    <h2 class="text-3xl font-semibold text-gray-900 mb-6">Shop by Category</h2>

    <!-- Error & Loading States -->
    <div
      v-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
    >
      <p>{{ error }}</p>
    </div>

    <!-- Scrollable Categories with buttons -->
    <div class="relative">
      <div
        ref="containerRef"
        class="flex overflow-x-auto gap-6 py-4 scroll-smooth"
      >
        <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :category="category"
          class="flex-shrink-0 w-48"
        />
      </div>

      <!-- Left Scroll Button using Lucide ChevronLeft -->
      <button
        @click="scrollLeft"
        :class="{
          'opacity-50 cursor-not-allowed': isAtStart,
          'opacity-100': !isAtStart,
        }"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-opacity"
        :disabled="isAtStart"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>

      <!-- Right Scroll Button using Lucide ChevronRight -->
      <button
        @click="scrollRight"
        :class="{
          'opacity-50 cursor-not-allowed': isAtEnd,
          'opacity-100': !isAtEnd,
        }"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full transition-opacity"
        :disabled="isAtEnd"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Scrollable Container Styles */
.scroll-smooth {
  scroll-behavior: smooth;
  overflow-x: auto;
  white-space: nowrap;
}

/* Custom Scroll Button Styles */
button {
  z-index: 10;
  transition: background-color 0.3s ease, opacity 0.3s ease;
}

button:hover {
  background-color: #4b5563;
}

button svg {
  width: 24px;
  height: 24px;
}
</style>
