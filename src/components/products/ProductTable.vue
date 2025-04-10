<script setup>
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { Heart } from "lucide-vue-next";
const props = defineProps({
  products: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["toggle-favorite", "visit"]);

const router = useRouter();
const productStore = useProductStore();

const isFavorite = (product) => {
  return productStore.favorites.some((p) => p.id === product.id);
};

const visitProduct = (product) => {
  emit("visit", product);
  router.push(`/products/${product.id}`);
};

const handleToggleFavorite = (e, product) => {
  e.stopPropagation();
  emit("toggle-favorite", product);
};

console.log("ProductTable products:", props.products);
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Image
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Category
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="product in products"
          :key="product.id"
          @click="visitProduct(product)"
          class="hover:bg-gray-50 cursor-pointer"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex-shrink-0 h-10 w-10">
              <img
                :src="product.images?.[0]"
                :alt="product.title"
                loading="lazy"
                class="h-10 w-10 object-contain"
              />
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">
              {{ product.title }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${{ product.price }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-secondary-700"
            >
              {{ product.category?.name || "Uncategorized" }}
            </span>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
          >
            <button
              @click.stop="handleToggleFavorite($event, product)"
              class="text-xl focus:outline-none mr-2 cursor-pointer"
              aria-label="Toggle favorite"
            >
              <Heart
                :class="{
                  'fill-rose-500 stroke-rose-600 ': isFavorite(product),
                  'stroke-gray-400 fill-white': !isFavorite(product),
                }"
                class="h-5 w-5 transition-all"
                :stroke-width="isFavorite(product) ? 1.5 : 2"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
