<script setup>
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShoppingCart,
  Heart,
  Truck,
  HelpCircle,
} from "lucide-vue-next";
</script>

<template>
  <footer class="bg-gray-900 text-white mt-16">
    <div
      class="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <!-- Brand -->
      <div>
        <h2 class="text-2xl font-bold mb-3 flex items-center gap-2">
          <ShoppingCart class="w-6 h-6 text-primary" />
          VueShop
        </h2>
        <p class="text-sm text-gray-400">
          Your one-stop shop for top-quality products and deals.
        </p>
      </div>

      <!-- Shop Links -->
      <div>
        <h3 class="text-lg font-semibold mb-3">Shop</h3>
        <ul class="space-y-2 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white">New Arrivals</a></li>
          <li><a href="#" class="hover:text-white">Popular</a></li>
          <li><a href="#" class="hover:text-white">Best Deals</a></li>
          <li><a href="#" class="hover:text-white">Gift Cards</a></li>
        </ul>
      </div>

      <!-- Help -->
      <div>
        <h3 class="text-lg font-semibold mb-3">Customer Support</h3>
        <ul class="space-y-2 text-sm text-gray-400">
          <li class="flex items-center gap-2">
            <Truck class="w-4 h-4" />
            <a href="#" class="hover:text-white">Shipping Info</a>
          </li>
          <li class="flex items-center gap-2">
            <Heart class="w-4 h-4" />
            <a href="#" class="hover:text-white">Wishlist</a>
          </li>
          <li class="flex items-center gap-2">
            <HelpCircle class="w-4 h-4" />
            <a href="#" class="hover:text-white">Help Center</a>
          </li>
        </ul>
      </div>

      <!-- Social -->
      <div>
        <h3 class="text-lg font-semibold mb-3">Connect with us</h3>
        <div class="flex space-x-4 text-gray-400">
          <a href="#" class="hover:text-white"><Facebook class="w-5 h-5" /></a>
          <a href="#" class="hover:text-white"><Twitter class="w-5 h-5" /></a>
          <a href="#" class="hover:text-white"><Instagram class="w-5 h-5" /></a>
          <a href="#" class="hover:text-white"><Youtube class="w-5 h-5" /></a>
        </div>
      </div>
    </div>

    <div
      class="border-t border-gray-700 text-center py-4 text-sm text-gray-500"
    >
      &copy; {{ new Date().getFullYear() }} ShopSmart. All rights reserved.
    </div>
  </footer>
</template>
