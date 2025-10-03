<template>
  <div>
    <!-- Loading indicator -->
    <div class="text-center mb-8">
      <LoaderSpinner 
        size="lg" 
        color="primary" 
        text="Producten laden..."
        container-class="py-4"
      />
    </div>

    <!-- Skeleton Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProductCardSkeleton v-for="n in count" :key="n" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 6
})
</script>
