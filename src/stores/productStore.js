import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", () => {
  const favorites = ref([]);
  const lastVisited = ref([]);

  // Load from localStorage on initialization
  if (localStorage.getItem("favorites")) {
    favorites.value = JSON.parse(localStorage.getItem("favorites"));
  }

  if (localStorage.getItem("lastVisited")) {
    lastVisited.value = JSON.parse(localStorage.getItem("lastVisited"));
  }

  const addFavorite = (product) => {
    if (!favorites.value.some((p) => p.id === product.id)) {
      favorites.value.push(product);
      persistFavorites();
    }
  };

  const removeFavorite = (productId) => {
    favorites.value = favorites.value.filter((p) => p.id !== productId);
    persistFavorites();
  };

  const toggleFavorite = (product) => {
    if (favorites.value.some((p) => p.id === product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const addLastVisited = (product) => {
    // Avoid duplicates
    lastVisited.value = lastVisited.value.filter((p) => p.id !== product.id);
    lastVisited.value.unshift(product);
    // Keep only last 5
    if (lastVisited.value.length > 5) {
      lastVisited.value.pop();
    }
    persistLastVisited();
  };

  const persistFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const persistLastVisited = () => {
    localStorage.setItem("lastVisited", JSON.stringify(lastVisited.value));
  };

  return {
    favorites,
    lastVisited,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    addLastVisited,
  };
});
