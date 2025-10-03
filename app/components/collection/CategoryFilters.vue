<template>
  <div class="flex flex-wrap justify-center gap-4 mb-12">
    <button 
      v-for="category in categories" 
      :key="category.id"
      @click="$emit('update:active', category.id)"
      :class="[
        'px-6 py-3 rounded-full font-medium transition-colors',
        active === category.id 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-white text-primary-50 hover:bg-accent'
      ]"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Category { id: string; name: string }

defineProps<{ categories: Category[]; active: string }>()

defineEmits<{ (e: 'update:active', value: string): void }>()
</script>
