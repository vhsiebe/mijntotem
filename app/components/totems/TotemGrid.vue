<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
    <TotemCard
      v-for="t in totems"
      :key="t.id"
      :totem="t"
      @toggleFavorite="$emit('toggleFavorite', $event)"
    />
  </div>
</template>

<script setup>
import totems from '@/data/totems.json'
import TotemCard from './TotemCard.vue'

defineEmits(['toggleFavorite'])
</script>
