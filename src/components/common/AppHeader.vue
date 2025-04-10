<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { AlignRight, Search, Heart, X, ShoppingCart } from "lucide-vue-next";

const router = useRouter();
const productStore = useProductStore();
const searchQuery = ref("");
const isMobileMenuOpen = ref(false);

const searchProducts = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "products", query: { search: searchQuery.value } });
    searchQuery.value = "";
  }
};

// Toggle the mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header class="bg-primary text-white shadow-md">
    <div class="container mx-auto px-4 py-4">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <!-- Logo and Mobile Menu Toggle -->
        <div class="flex items-center justify-between w-full md:w-auto">
          <router-link
            to="/"
            class="text-2xl font-bold tracking-tight font-display"
          >
            <h2 class="text-2xl font-bold mb-3 flex items-center gap-2">
              <ShoppingCart class="w-6 h-6 text-white" />
              VueShop
            </h2>
          </router-link>
          <button class="md:hidden p-2 text-white" @click="toggleMobileMenu">
            <AlignRight class="w-7 h-7" />
          </button>
        </div>

        <!-- Search Bar -->
        <div class="w-full max-w-xl mx-auto md:mx-0">
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="searchProducts"
              type="text"
              placeholder="Search products..."
              class="w-full py-2 px-4 pr-10 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            />
            <button
              @click="searchProducts"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600"
            >
              <Search class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Navigation Links (Desktop) -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link
            to="/categories"
            class="hover:text-accent-300 transition-colors"
          >
            Categories
          </router-link>

          <router-link
            to="/favorites"
            class="hover:text-accent-300 transition-colors flex items-center relative"
          >
            <Heart class="w-5 h-5 mr-1" />
            <span>Favorites</span>
            <span
              v-if="productStore.favorites.length > 0"
              class="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full"
            >
              {{ productStore.favorites.length }}
            </span>
          </router-link>
        </nav>
      </div>

      <!-- Mobile Menu (Visible when isMobileMenuOpen is true) -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-0 left-0 w-full bg-primary text-white z-50 p-6"
      >
        <div class="flex justify-between items-center">
          <router-link
            to="/"
            class="text-2xl font-bold tracking-tight font-display"
          >
            VueShop
          </router-link>
          <button @click="toggleMobileMenu" class="text-white">
            <X class="w-6 h-6" />
          </button>
        </div>
        <nav class="mt-6">
          <router-link
            to="/categories"
            class="block py-2 text-lg"
            @click="toggleMobileMenu"
          >
            Categories
          </router-link>
          <router-link
            to="/favorites"
            class="block py-2 text-lg flex items-center"
            @click="toggleMobileMenu"
          >
            <Heart class="w-5 h-5 mr-2" />
            Favorites
            <span
              v-if="productStore.favorites.length > 0"
              class="ml-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full"
            >
              {{ productStore.favorites.length }}
            </span>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Search Bar Styling */
input {
  border-radius: 8px;
  padding-left: 1rem;
  padding-right: 3rem;
  font-size: 1rem;
  color: #4a4a4a;
  transition: all 0.3s ease;
}

input:focus {
  background-color: #f0f9ff;
  border-color: #34d399;
}

button {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

button:hover {
  color: #34d399;
}
</style>
