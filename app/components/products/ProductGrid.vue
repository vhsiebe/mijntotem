<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true
  }
})

defineEmits(['addToCart'])
</script> 

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      @addToCart="$emit('addToCart', $event)"
    />
  </div>
</template>

