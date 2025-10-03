<script setup>
import { computed, defineProps } from 'vue'

const {
    size = 'md',
    color = 'primary',
    text = '',
    containerClass = 'py-8'
} = defineProps()
  
const sizeClasses = computed(() => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8', 
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    }
    return sizes[size]
  })
  
  const textClasses = computed(() => {
    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg'
    }
    return textSizes[size]
  })
  </script>
  

<template>
    <div class="flex items-center justify-center" :class="containerClass">
      <div class="relative">
        <!-- Spinning loader -->
        <div 
          class="animate-spin rounded-full border-4 border-gray-20"
          :class="[
            sizeClasses,
            `border-t-${color}`
          ]"
        ></div>
        
        <!-- Optional text -->
        <div class="mt-4 text-center">
          <p class="text-gray-60 text-sm" :class="textClasses">{{ text }}</p>
        </div>
      </div>
    </div>
  </template>
  