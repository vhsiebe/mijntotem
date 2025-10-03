<template>
  <div class="animate-pulse">
    <!-- Hero Section Skeleton -->
    <section class="px-5 py-10 md:px-20 md:py-20">
      <div class="text-center space-y-6 mb-16">
        <!-- Badge Skeleton -->
        <div class="flex justify-center">
          <div class="bg-gray-20 h-8 w-24 rounded-full"></div>
        </div>
        
        <!-- Title Skeleton -->
        <div class="space-y-4">
          <div class="bg-gray-20 h-12 w-80 rounded mx-auto"></div>
          <div class="bg-gray-20 h-12 w-60 rounded mx-auto"></div>
        </div>
        
        <!-- Description Skeleton -->
        <div class="space-y-2 max-w-3xl mx-auto">
          <div class="bg-gray-10 h-5 w-full rounded"></div>
          <div class="bg-gray-10 h-5 w-4/5 rounded mx-auto"></div>
        </div>
      </div>

      <!-- Search Field Skeleton -->
      <div class="max-w-lg mx-auto mb-8">
        <div class="bg-gray-20 h-14 w-full rounded-full"></div>
      </div>

      <!-- Filters Skeleton -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <div v-for="n in 5" :key="n" class="bg-gray-20 h-12 w-28 rounded-full"></div>
      </div>

      <!-- Products Grid Skeleton -->
      <ProductGridSkeleton :count="6" />
    </section>
  </div>
</template>

<script setup lang="ts">
// No props needed
</script>
