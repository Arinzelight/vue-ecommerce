<template>
  <div class="flex items-center justify-between w-full md:w-auto">
    <router-link to="/" class="text-2xl font-bold tracking-tight font-display">
      <div class="text-2xl font-bold mb-3 flex items-center gap-2">
        <ShoppingCart class="w-6 h-6 text-white" />
        VueShop
      </div>
    </router-link>
    <button class="md:hidden p-2 text-white" @click="$emit('toggle')">
      <AlignRight class="w-7 h-7" />
    </button>
  </div>
</template>

<script setup>
import { ShoppingCart, AlignRight } from "lucide-vue-next";
</script>
