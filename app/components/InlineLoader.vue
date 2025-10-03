<template>
  <div class="flex items-center gap-2" :class="containerClass">
    <!-- Dots Animation -->
    <div v-if="type === 'dots'" class="flex gap-1">
      <div 
        v-for="i in 3" 
        :key="i"
        class="w-2 h-2 rounded-full animate-pulse"
        :class="[
          dotColorClass,
          `animation-delay-${(i - 1) * 200}ms`
        ]"
        :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
      ></div>
    </div>

    <!-- Spinner Animation -->
    <div v-else-if="type === 'spinner'" class="animate-spin rounded-full border-2" :class="spinnerClasses"></div>

    <!-- Pulse Animation -->
    <div v-else-if="type === 'pulse'" class="animate-pulse rounded-full" :class="pulseClasses"></div>

    <!-- Text -->
    <span v-if="text" class="text-sm" :class="textColorClass">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'dots' | 'spinner' | 'pulse'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'gray'
  text?: string
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'dots',
  size: 'md',
  color: 'primary',
  text: '',
  containerClass: ''
})

const dotColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary-60',
    gray: 'bg-gray-50'
  }
  return colors[props.color]
})

const textColorClass = computed(() => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary-60',
    gray: 'text-gray-60'
  }
  return colors[props.color]
})

const spinnerClasses = computed(() => {
  const sizes = {
    sm: 'w-4 h-4 border-gray-20 border-t-primary',
    md: 'w-5 h-5 border-gray-20 border-t-primary',
    lg: 'w-6 h-6 border-gray-20 border-t-primary'
  }
  
  const colorMap = {
    primary: sizes[props.size].replace('border-t-primary', 'border-t-primary'),
    secondary: sizes[props.size].replace('border-t-primary', 'border-t-secondary-60'),
    gray: sizes[props.size].replace('border-t-primary', 'border-t-gray-60')
  }
  
  return colorMap[props.color]
})

const pulseClasses = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary-60',
    gray: 'bg-gray-50'
  }
  
  return `${sizes[props.size]} ${colors[props.color]}`
})
</script>

<style scoped>
@keyframes pulse-delay {
  0%, 80%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}

.animate-pulse-delay-1 { animation: pulse-delay 1.4s infinite 0.2s; }
.animate-pulse-delay-2 { animation: pulse-delay 1.4s infinite 0.4s; }
</style>
