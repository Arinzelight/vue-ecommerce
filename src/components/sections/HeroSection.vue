<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

import image1 from "@/assets/images/hero-image1.jpeg";
import image2 from "@/assets/images/hero-image2.jpeg";
import image3 from "@/assets/images/hero-image3.jpeg";

const slides = [
  {
    image: image1,
    title: "Explore Beautiful Destinations",
    description: "Find the perfect spot for your next journey.",
  },
  {
    image: image2,
    title: "Unforgettable Experiences",
    description: "Make memories that last a lifetime.",
  },
  {
    image: image3,
    title: "Adventure Awaits",
    description: "Take the leap into your next story.",
  },
];

const currentIndex = ref(0);
let interval = null;

const startSlider = () => {
  interval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopSlider = () => {
  clearInterval(interval);
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

onMounted(() => {
  startSlider();
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchend", handleTouchEnd);
});

onUnmounted(() => {
  stopSlider();
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchend", handleTouchEnd);
});

// Swipe support
let startX = 0;
const handleTouchStart = (e) => {
  startX = e.changedTouches[0].screenX;
};
const handleTouchEnd = (e) => {
  const endX = e.changedTouches[0].screenX;
  const deltaX = endX - startX;

  if (Math.abs(deltaX) > 50) {
    deltaX > 0 ? prevSlide() : nextSlide();
  }
};
</script>

<template>
  <section
    class="relative rounded-md h-[500px] md:h-[600px] w-full overflow-hidden mb-12"
  >
    <!-- Backgrounds -->
    <div class="absolute inset-0">
      <transition-group name="fade" tag="div">
        <div
          v-for="(slide, index) in slides"
          v-show="currentIndex === index"
          :key="index"
          class="absolute inset-0 transition-all duration-100 ease-in-out bg-cover bg-center"
          :style="{
            backgroundImage: `url(${slide.image})`,
            transform: 'scale(1.05)',
          }"
        >
          <div class="absolute inset-0 bg-black/50"></div>
        </div>
      </transition-group>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-4"
    >
      <h1 class="text-3xl md:text-5xl font-extrabold drop-shadow-lg max-w-3xl">
        {{ slides[currentIndex].title }}
      </h1>
      <p class="mt-4 text-base md:text-xl max-w-xl drop-shadow-md">
        {{ slides[currentIndex].description }}
      </p>
      <router-link
        to="/categories"
        class="mt-6 inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Get Started
      </router-link>
    </div>

    <!-- Indicators -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      <button
        v-for="index in slides"
        :key="index"
        class="h-1.5 w-8 rounded-sm transition-all duration-300"
        :class="currentIndex === index ? 'bg-white' : 'bg-white/40'"
        @click="goToSlide(index)"
      ></button>
    </div>

    <!-- Arrows with Lucide Icons -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
    >
      <ChevronRight class="w-5 h-5" />
    </button>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
