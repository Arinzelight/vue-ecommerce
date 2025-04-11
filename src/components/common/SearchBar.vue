<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useDebounce } from "@/composables/useDebounce";
import { Search } from "lucide-vue-next";
import apiService from "@/services/apiService";

const router = useRouter();
const searchQuery = ref("");
const suggestions = ref([]);
const containerRef = ref(null);

const fetchSuggestions = async (query) => {
  if (!query.trim()) return (suggestions.value = []);
  try {
    const allProducts = await apiService.getAllProducts();
    suggestions.value = allProducts
      .filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      .map((p) => p.title)
      .slice(0, 5);
  } catch (e) {
    console.error("Suggestion error:", e);
    suggestions.value = [];
  }
};

const debouncedFetch = useDebounce(fetchSuggestions, 300);

watch(searchQuery, (newQuery) => debouncedFetch(newQuery));

const onSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "products", query: { search: searchQuery.value } });
    searchQuery.value = "";
    suggestions.value = [];
  }
};

const selectSuggestion = (title) => {
  searchQuery.value = title;
  onSearch();
};

// Click outside to close suggestions
const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    suggestions.value = [];
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="containerRef" class="w-full max-w-xl mx-auto md:mx-0 relative">
    <div class="relative">
      <input
        v-model="searchQuery"
        @keyup.enter="onSearch"
        type="text"
        placeholder="Search products..."
        class="w-full py-2 px-4 pr-10 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-accent-50 focus:outline-none transition-all duration-100 shadow-sm focus:shadow-md"
      />
      <button
        @click="onSearch"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 p-3 rounded-full"
      >
        <Search class="w-6 h-6" />
      </button>
    </div>

    <ul
      v-if="suggestions.length"
      class="absolute z-50 bg-white w-full mt-1 rounded shadow text-gray-800"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>
