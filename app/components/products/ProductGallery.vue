<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  },
  badge: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['update:modelValue'])

// Slider state
const currentIndex = ref(0)
const isTransitioning = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)
const sliderRef = ref(null)

// Computed
const currentImage = computed(() => {
  return props.images[currentIndex.value] || props.images[0]
})

const hasMultipleImages = computed(() => {
  return props.images && props.images.length > 1
})

// Methods
const goToSlide = (index) => {
  if (isTransitioning.value || index === currentIndex.value) return
  
  isTransitioning.value = true
  currentIndex.value = index
  emit('update:modelValue', props.images[index])
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}


const nextSlide = () => {
  if (!hasMultipleImages.value) return
  const nextIndex = (currentIndex.value + 1) % props.images.length
  goToSlide(nextIndex)
}

const prevSlide = () => {
  if (!hasMultipleImages.value) return
  const prevIndex = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
  goToSlide(prevIndex)
}

// Touch handlers
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].clientX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

// Watch for modelValue changes to update currentIndex
watch(() => props.modelValue, (newImage) => {
  if (newImage && props.images) {
    const index = props.images.findIndex(img => img.url === newImage.url)
    if (index !== -1) {
      currentIndex.value = index
    }
  }
}, { immediate: true })

// Initialize current index based on modelValue
onMounted(() => {
  if (props.modelValue && props.images) {
    const index = props.images.findIndex(img => img.url === props.modelValue.url)
    if (index !== -1) {
      currentIndex.value = index
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative">
    <!-- Desktop Layout: Thumbnails left, main image right -->
    <div class="hidden lg:flex gap-4">
      <!-- Thumbnail Navigation (Desktop) -->
      <div v-if="hasMultipleImages" class="flex-shrink-0">
        <div class="flex flex-col gap-3 max-h-96 overflow-y-auto scrollbar-hide">
          <button 
            v-for="(img, i) in images" 
            :key="i" 
            @click="goToSlide(i)"
            :disabled="isTransitioning"
            :class="[
              'w-20 h-20 bg-cover bg-center rounded-lg flex-shrink-0 border-2 transition-all duration-200 hover:scale-105 disabled:opacity-50',
              currentIndex === i 
                ? 'border-primary ring-2 ring-primary/20' 
                : 'border-gray-20 hover:border-gray-40'
            ]" 
            :style="{ backgroundImage: `url(${img.url})` }" 
          />
        </div>
      </div>

      <!-- Main Image (Desktop) -->
      <div class="flex-1">
        <div 
          ref="sliderRef"
          class="relative aspect-square w-full bg-contain bg-center rounded-2xl overflow-hidden group"
          :style="{ backgroundImage: `url(${currentImage?.url})` }"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <!-- Badge -->
          <div v-if="badge" class="absolute top-6 left-6 z-10">
            <span class="bg-secondary-60 text-primary text-sm px-4 py-2 rounded-full font-medium shadow-lg">
              {{ badge }}
            </span>
          </div>
          
          <!-- Favorite Button -->

          <!-- Navigation Arrows -->
          <template v-if="hasMultipleImages">
            <!-- Previous Button -->
            <button 
              @click="prevSlide"
              :disabled="isTransitioning"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
            >
              <ChevronLeft class="w-5 h-5 text-gray-90" />
            </button>

            <!-- Next Button -->
            <button 
              @click="nextSlide"
              :disabled="isTransitioning"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
            >
              <ChevronRight class="w-5 h-5 text-gray-90" />
            </button>
          </template>

          <!-- Image Counter -->
          <div v-if="hasMultipleImages" class="absolute bottom-4 right-4 bg-black/50 backdrop-blur text-white text-sm px-3 py-1 rounded-full z-10">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Layout: Main image top, thumbnails bottom -->
    <div class="lg:hidden mx-auto">
      <!-- Main Image Slider -->
      <div 
        ref="sliderRef"
        class="relative aspect-square bg-contain bg-center rounded-2xl overflow-hidden group"
        :style="{ backgroundImage: `url(${currentImage?.url})` }"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <!-- Badge -->
        <div v-if="badge" class="absolute top-6 left-6 z-10">
          <span class="bg-secondary-60 text-primary text-sm px-4 py-2 rounded-full font-medium shadow-lg">
            {{ badge }}
          </span>
        </div>
        
        <!-- Favorite Button -->

        <!-- Navigation Arrows -->
        <template v-if="hasMultipleImages">
          <!-- Previous Button -->
          <button 
            @click="prevSlide"
            :disabled="isTransitioning"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
          >
            <ChevronLeft class="w-5 h-5 text-gray-90" />
          </button>

          <!-- Next Button -->
          <button 
            @click="nextSlide"
            :disabled="isTransitioning"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
          >
            <ChevronRight class="w-5 h-5 text-gray-90" />
          </button>
        </template>

        <!-- Image Counter -->
        <div v-if="hasMultipleImages" class="absolute bottom-4 right-4 bg-black/50 backdrop-blur text-white text-sm px-3 py-1 rounded-full z-10">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <!-- Thumbnail Navigation (Mobile) -->
      <div v-if="hasMultipleImages" class="mt-4">
        <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            v-for="(img, i) in images" 
            :key="i" 
            @click="goToSlide(i)"
            :disabled="isTransitioning"
            :class="[
              'w-16 h-16 bg-cover bg-center rounded-lg flex-shrink-0 border-2 transition-all duration-200 hover:scale-105 disabled:opacity-50',
              currentIndex === i 
                ? 'border-primary ring-2 ring-primary/20' 
                : 'border-gray-20 hover:border-gray-40'
            ]" 
            :style="{ backgroundImage: `url(${img.url})` }" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>