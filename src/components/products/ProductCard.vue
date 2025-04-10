<script setup>
import { Heart, Eye, X } from "lucide-vue-next";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  showRemove: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["visit", "remove"]);
const router = useRouter();
const productStore = useProductStore();

const isFavorite = computed(() => {
  return productStore.favorites.some((p) => p.id === props.product.id);
});

const handleClick = () => {
  emit("visit", props.product);
  router.push(`/products/${props.product.id}`);
};

const toggleFavorite = (e) => {
  e.stopPropagation();
  productStore.toggleFavorite(props.product);
};

const removeFavorite = (e) => {
  e.stopPropagation();
  emit("remove", props.product.id);
};

const handleImageError = (e) => {
  e.target.src = "https://placehold.co/400";
  e.target.classList.replace("object-cover", "object-contain");
};
</script>

<template>
  <div
    @click="handleClick"
    class="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
  >
    <!-- Favorite Button -->
    <button
      @click.stop="toggleFavorite"
      class="absolute cursor-pointer top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
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

    <!-- Product Image -->
    <div class="relative pt-[100%] bg-gray-50 overflow-hidden">
      <img
        :src="product.images?.[0] || 'https://placehold.co/400'"
        :alt="product.title"
        class="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError"
      />

      <!-- Quick View Overlay -->
      <div
        class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <div
          class="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium"
        >
          <Eye class="w-4 h-4" />
          <span>Quick View</span>
        </div>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <div class="flex justify-between items-start gap-2">
        <h3 class="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base">
          {{ product.title }}
        </h3>
      </div>

      <!-- Price & Category -->
      <div class="mt-2 flex items-center justify-between">
        <p class="text-lg font-semibold text-gray-900">
          ${{ product.price?.toFixed(2) }}
        </p>
        <span
          v-if="product.category?.name"
          class="inline-block px-2.5 py-1 text-xs font-medium bg-primary-50 text-gray-800 rounded-full"
        >
          {{ product.category.name }}
        </span>
      </div>

      <!-- Remove Button (Conditional) -->
      <button
        v-if="showRemove"
        @click.stop="removeFavorite"
        class="mt-3 w-full flex items-center justify-center gap-1 py-1.5 text-sm font-medium text-rose-600 hover:text-rose-800 border border-rose-200 hover:border-rose-300 rounded-md transition-colors"
      >
        <X class="w-4 h-4" />
        <span>Remove</span>
      </button>
    </div>

    <!-- Sale Badge -->
    <div
      v-if="product.price < 50"
      class="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center"
    >
      <span class="relative top-px">SALE</span>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
