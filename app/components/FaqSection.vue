<template>
  <section class="px-5 py-10 md:px-20 md:py-32">
    <!-- Header Section -->
    <div class="text-center mb-10 space-y-6">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
        <div class="w-4 h-4 bg-primary-50 rounded-full relative">
          <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
        </div>
        <span class="text-primary-50 font-medium">FAQs</span>
      </div>

      <!-- Title and Description -->
      <div class="space-y-6">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">
          Still Have Questions?
        </h2>
        <p class="text-lg text-gray-60 leading-relaxed max-w-2xl mx-auto">
          Check out our FAQ section for quick answers to help you plan your adventure with confidence.
        </p>
      </div>
    </div>

    <!-- FAQ List -->
    <div class="space-y-6 max-w-4xl mx-auto">
      <!-- FAQ 1 - Open by default -->
      <div class="bg-background border border-gray-20 rounded-xl">
        <button
          class="w-full flex items-center justify-between p-4 md:p-6 text-left"
          @click="toggleFaq(0)"
        >
          <h3 class="text-lg md:text-2xl font-semibold text-gray-80 flex-1 pr-4">
            What hiking trails do you offer?
          </h3>
          <ChevronUp v-if="openFaq === 0" class="w-6 h-6 md:w-8 md:h-8 text-gray-90 flex-shrink-0" />
          <ChevronDown v-else class="w-6 h-6 md:w-8 md:h-8 text-gray-90 flex-shrink-0" />
        </button>
        <div v-if="openFaq === 0" class="px-4 md:px-6 pb-4 md:pb-6">
          <p class="text-gray-60 leading-relaxed">
            At Thrilliz, we offer a diverse range of hiking trails suitable for all experience levels. From serene beginner paths to challenging mountain treks, explore breathtaking locations across the globe like the Himalayas, Rocky Mountains, and the beautiful trails of Lombok, Indonesia.
          </p>
        </div>
      </div>

      <!-- FAQ 2 -->
      <div class="bg-gray-20 border border-gray-30 rounded-xl">
        <button
          class="w-full flex items-center justify-between p-4 md:p-6 text-left"
          @click="toggleFaq(1)"
        >
          <h3 class="text-lg md:text-2xl font-semibold text-gray-80 flex-1 pr-4">
            Do I need to be an experienced hiker to join?
          </h3>
          <ChevronDown class="w-6 h-6 md:w-8 md:h-8 text-gray-90 flex-shrink-0" />
        </button>
        <div v-if="openFaq === 1" class="px-4 md:px-6 pb-4 md:pb-6">
          <p class="text-gray-60 leading-relaxed">
            Absolutely not! We have hikes for everyone, from beginners looking for scenic routes to experienced adventurers seeking a thrilling challenge. Our guides will ensure you have the best experience based on your skill level.
          </p>
        </div>
      </div>

      <!-- FAQ 3 -->
      <div class="bg-gray-20 border border-gray-30 rounded-xl">
        <button
          class="w-full flex items-center justify-between p-4 md:p-6 text-left"
          @click="toggleFaq(2)"
        >
          <h3 class="text-lg md:text-2xl font-semibold text-gray-80 flex-1 pr-4">
            What gear do I need for a hike?
          </h3>
          <ChevronDown class="w-6 h-6 md:w-8 md:h-8 text-gray-90 flex-shrink-0" />
        </button>
        <div v-if="openFaq === 2" class="px-4 md:px-6 pb-4 md:pb-6">
          <p class="text-gray-60 leading-relaxed">
            For most hikes, we recommend comfortable hiking boots, a water bottle, sun protection, and a lightweight backpack. For more advanced treks, we'll provide a detailed gear checklist beforehand.
          </p>
        </div>
      </div>

      <!-- FAQ 4 -->
      <div class="bg-gray-20 border border-gray-30 rounded-xl">
        <button
          class="w-full flex items-center justify-between p-4 md:p-6 text-left"
          @click="toggleFaq(3)"
        >
          <h3 class="text-lg md:text-2xl font-semibold text-gray-80 flex-1 pr-4">
            Are guides provided on every hike?
          </h3>
          <ChevronDown class="w-6 h-6 md:w-8 md:h-8 text-gray-90 flex-shrink-0" />
        </button>
        <div v-if="openFaq === 3" class="px-4 md:px-6 pb-4 md:pb-6">
          <p class="text-gray-60 leading-relaxed">
            Yes! Every hike is led by our knowledgeable and certified guides who ensure your safety and enhance your experience with local insights and hiking tips.
          </p>
        </div>
      </div>

      <!-- FAQ 5 -->
      <div class="bg-gray-20 border border-gray-30 rounded-xl">
        <button
          class="w-full flex items-center justify-between p-4 md:p-6 text-left"
          @click="toggleFaq(4)"
        >
          <h3 class="text-lg md:text-2xl font-semibold text-gray-80 flex-1 pr-4">
            Can I book group or private hikes?
          </h3>
          <ChevronDown class="w-6 h-6 md:w-8 md:h-8 text-gray-90 flex-shrink-0" />
        </button>
        <div v-if="openFaq === 4" class="px-4 md:px-6 pb-4 md:pb-6">
          <p class="text-gray-60 leading-relaxed">
            Definitely! You can choose from scheduled group hikes or opt for a private hike for a more personalized adventure. Group hikes are a great way to meet fellow outdoor enthusiasts, while private hikes offer tailored experiences.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'

const openFaq = ref(0)

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? -1 : index
}
</script>
