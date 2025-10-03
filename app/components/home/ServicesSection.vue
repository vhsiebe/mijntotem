<template>
  <section class="px-5 py-10 md:px-20 md:py-20">
    <!-- Header Section -->
    <div class="text-center mb-10 space-y-6">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
        <div class="w-4 h-4 bg-primary-50 rounded-full relative">
          <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
        </div>
        <span class="text-primary-50 font-medium">Services</span>
      </div>

      <!-- Title and Description -->
      <div class="space-y-6 lg:max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">
          Explore, Equip, and Elevate Your Adventure
        </h2>
        <p class="text-lg text-gray-60 leading-relaxed max-w-2xl mx-auto">
          Find expert tips, top resources, and quality gear for safe, unforgettable adventures.
        </p>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="flex flex-col gap-10 md:gap-8 xl:max-w-screen-2xl mx-auto">
      <!-- Service 1 - Active/Featured -->
      <div class="p-6 md:p-8 bg-secondary-30 rounded-xl md:rounded-3xl">
        <div class="flex items-start gap-4 md:gap-6">
          <div class="bg-primary-90 p-2 rounded-lg flex-shrink-0">
            <Flag class="w-8 h-8 md:w-10 md:h-10 text-primary-30" />
          </div>
          <div class="space-y-4 flex-1">
            <h3 class="text-lg md:text-xl font-semibold text-gray-80">Trail Guides & Planning</h3>
            <p class="text-gray-60">
              Explore trails for all skill levels with expert tips and personalized suggestions.
            </p>
          </div>
        </div>
      </div>

      <!-- Service 2 -->
      <div class="p-6 md:p-8 bg-background rounded-xl md:rounded-3xl">
        <div class="flex items-start gap-4 md:gap-6">
          <div class="bg-primary-90 p-2 rounded-lg flex-shrink-0">
            <Backpack class="w-8 h-8 md:w-10 md:h-10 text-primary-30" />
          </div>
          <div class="space-y-4 flex-1">
            <h3 class="text-lg md:text-xl font-semibold text-gray-80">Gear Recommendations</h3>
            <p class="text-gray-60">
              Find top gear recommendations to build up your experience and stay prepared.
            </p>
          </div>
        </div>
      </div>

      <!-- Service 3 -->
      <div class="p-6 md:p-8 bg-background rounded-xl md:rounded-3xl">
        <div class="flex items-start gap-4 md:gap-6">
          <div class="bg-primary-90 p-2 rounded-lg flex-shrink-0">
            <Tent class="w-8 h-8 md:w-10 md:h-10 text-primary-30" />
          </div>
          <div class="space-y-4 flex-1">
            <h3 class="text-lg md:text-xl font-semibold text-gray-80">Community Events</h3>
            <p class="text-gray-60">
              Join outdoor events and all fun hiking challenges connecting adventure lovers.
            </p>
          </div>
        </div>
      </div>

      <!-- Service 4 -->
      <div class="p-6 md:p-8 bg-background rounded-xl md:rounded-3xl">
        <div class="flex items-start gap-4 md:gap-6">
          <div class="bg-primary-90 p-2 rounded-lg flex-shrink-0">
            <Compass class="w-8 h-8 md:w-10 md:h-10 text-primary-30" />
          </div>
          <div class="space-y-4 flex-1">
            <h3 class="text-lg md:text-xl font-semibold text-gray-80">Adventure Tips</h3>
            <p class="text-gray-60">
              Learn key survival, fitness, and safety skills for secure, thrilling adventures.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Flag, Backpack, Tent, Compass } from 'lucide-vue-next'
</script>
