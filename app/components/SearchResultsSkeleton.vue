<template>
  <div class="animate-pulse">
    <!-- Search Results Count Skeleton -->
    <div class="mb-6">
      <div class="bg-gray-20 h-5 w-48 rounded mx-auto"></div>
    </div>

    <!-- Products Grid Skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCardSkeleton v-for="n in count" :key="n" />
    </div>

    <!-- Load More Button Skeleton -->
    <div v-if="showLoadMore" class="mt-12 text-center">
      <div class="bg-gray-20 h-12 w-40 rounded-lg mx-auto"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number
  showLoadMore?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  count: 6,
  showLoadMore: true
})
</script>
