<script setup>
import { Star } from 'lucide-vue-next'

const { data: reviewsData } = await useFetch('/api/reviews')

const displayedReviews = computed(() => {
  return reviewsData?.value?.reviews?.slice(0, 3) || []
})

// Computed property for total reviews count
const totalReviews = computed(() => {
  return reviewsData?.value?.total || 0
})
</script>

<template>
  <section class="px-5 py-10 md:px-20 md:py-32">
    <!-- Header Section -->
    <div class="text-center mb-10 space-y-6">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
        <div class="w-4 h-4 bg-primary-50 rounded-full relative">
          <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
        </div>
        <span class="text-primary-50 font-medium">Reviews</span>
      </div>

      <!-- Title and Description -->
      <div class="space-y-6">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">
          Wat scouts over ons zeggen
        </h2>
        <p class="text-lg text-gray-60 leading-relaxed max-w-2xl mx-auto">
          Lees hoe scouts en groepen hun totem met trots uitdragen dankzij onze kledij.
        </p>
      </div>
    </div>

    <!-- Testimonials Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
      <a :href="review.link" target="_blank" 
        v-for="(review, index) in displayedReviews" 
        :key="review.id"
        class="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
        :class="{
          'md:col-span-2 lg:col-span-1': index === 2
        }"
      >
        <!-- Quote Icon -->
        <div class="mb-6">
          <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
        </div>

        <!-- Rating Stars -->
        <div class="flex items-center gap-1 mb-4">
          <div class="flex">
            <Star v-for="i in review.rating" :key="i" class="w-5 h-5 text-yellow-400 fill-current" />
          </div>
          <span class="text-sm text-gray-500 ml-2">{{ review.rating }}.0</span>
        </div>

        <!-- Testimonial Text -->
        <blockquote class="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
          "{{ review.text }}"
        </blockquote>

        <!-- User Info -->
        <div class="flex items-center gap-4">
          <div class="relative">
            <img 
              :src="review.avatar" 
              :alt="review.name"
              class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div v-if="review.verified" class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div class="font-semibold text-gray-900 text-base md:text-lg">{{ review.name }}</div>
            <div class="text-sm text-gray-500">{{ review.role }}, {{ review.location }}</div>
          </div>
        </div>
      </a>
    </div>

    <!-- See More Button 
    <div class="flex justify-center mt-12">
      <button class="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        Bekijk meer reviews
        <ArrowUpRight class="w-5 h-5" />
      </button>
    </div>
    -->
  </section>
</template>
