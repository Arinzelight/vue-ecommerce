<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(
        (option) =>
          typeof option === "object" && "value" in option && "label" in option
      );
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleChange = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="flex items-center gap-2">
    <label for="sort" class="text-gray-600 dark:text-white whitespace-nowrap"
      >Sort by:</label
    >
    <select
      id="sort"
      :value="modelValue"
      @change="handleChange"
      class="border border-gray-300 dark:bg-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
