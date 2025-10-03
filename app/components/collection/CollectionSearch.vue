<template>
  <div class="max-w-lg mx-auto mb-8">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search class="h-5 w-5 text-gray-50" />
      </div>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-12 pr-12 py-4 bg-white border border-gray-20 rounded-full text-gray-90 placeholder:text-gray-50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        @keydown.escape="$emit('update:modelValue', '')"
      />
      <button
        v-if="modelValue"
        @click="$emit('update:modelValue', '')"
        class="absolute inset-y-0 right-0 pr-4 flex items-center"
      >
        <X class="h-5 w-5 text-gray-50 hover:text-gray-90 transition-colors" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
}>(), {
  placeholder: 'Zoek naar een specifiek totem (bijv. Wolf, Dolfijn, Beer)...'
})

defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>
