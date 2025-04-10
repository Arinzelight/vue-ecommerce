<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const navigateToCategory = () => {
  router.push({
    name: "category-products",
    params: { category: props.category.slug },
  });
};
</script>

<template>
  <div
    @click="navigateToCategory"
    class="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 bg-white"
  >
    <img
      :src="category.image || 'https://placehold.co/400'"
      :alt="category.name"
      class="h-40 w-full object-cover"
      loading="lazy"
    />
    <div class="p-4 text-center">
      <h3 class="text-lg font-semibold text-gray-800 capitalize truncate">
        {{ category.name }}
      </h3>
    </div>
  </div>
</template>
