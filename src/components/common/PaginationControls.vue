<script setup>
import { computed, toRefs } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});
const emit = defineEmits(["page-change"]);

const { currentPage, totalPages } = toRefs(props);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("page-change", page);
  }
};

const visiblePages = computed(() => {
  const range = 2;
  const start = Math.max(1, currentPage.value - range);
  const end = Math.min(totalPages.value, currentPage.value + range);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (start > 1) {
    if (start > 2) {
      pages.unshift("...");
    }
    pages.unshift(1);
  }

  if (end < totalPages.value) {
    if (end < totalPages.value - 1) {
      pages.push("...");
    }
    pages.push(totalPages.value);
  }

  return pages;
});
</script>

<template>
  <div class="flex items-center justify-center space-x-1">
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Previous page"
    >
      &lt;
    </button>

    <!-- Page Numbers -->
    <template v-for="page in visiblePages" :key="page">
      <button v-if="page === '...'" class="px-3 py-1" disabled>
        {{ page }}
      </button>
      <button
        v-else
        @click="goToPage(page)"
        :class="{
          'bg-primary dark:bg-gray-900 text-white': page === currentPage,
          'hover:bg-gray-100 dark:hover:bg-gray-900': page !== currentPage,
        }"
        class="px-3 py-1 rounded-md border border-gray-300 cursor-pointer"
        :aria-label="`Go to page ${page}`"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Next page"
    >
      &gt;
    </button>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease;
  min-width: 2.5rem;
}
</style>
