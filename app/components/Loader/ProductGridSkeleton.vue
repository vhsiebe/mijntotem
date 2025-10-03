<template>
    <div>
      <!-- Skeleton Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LoaderProductCardSkeleton v-for="n in count" :key="n" />
      </div>
    </div>
  </template>
  
  <script setup>
 const props = defineProps({
    count: {
      type: Number,
      default: 6
    }
  })
  
  const { count } = props
  </script>
  