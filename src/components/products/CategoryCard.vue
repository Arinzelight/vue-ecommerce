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
    class="cursor-pointer bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105"
  >
    <img
      :src="category?.image"
      :alt="category.name"
      class="h-40 w-full object-cover"
      loading="lazy"
    />
    <div class="p-4 text-center">
      <h3 class="text-lg font-semibold capitalize truncate">
        {{ category.name }}
      </h3>
    </div>
  </div>
</template>
