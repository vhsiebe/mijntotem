<script setup>
import { Heart } from 'lucide-vue-next'

const props = defineProps({ totem: Object })

const categories = {
  mammals: 'Zoogdieren',
  birds: 'Vogels',
  reptiles: 'Reptielen',
  insects: 'Insecten',
  aquatic: 'Waterdieren'
}

const category = computed(() => categories[props.totem.categoryId])

defineEmits(['toggleFavorite'])
</script>

<template>
  <NuxtLink :to="`/totem/${totem.title?.toLowerCase()}`" class="group cursor-pointer">
    <div class="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
      <div class="relative mb-4">
        <div
          class="w-full aspect-square bg-contain bg-no-repeat bg-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          :style="{ backgroundImage: `url(${totem.image})` }"
        >
          <button
            @click.prevent.stop="$emit('toggleFavorite', totem.id)"
            class="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart
              :class="[
                'w-4 h-4 transition-colors',
                totem.isFavorite ? 'text-red-500 fill-current' : 'text-gray-50'
              ]"
            />
          </button>
        </div>
      </div>
      <div class="text-center space-y-2">
        <h3 class="text-lg md:text-xl font-semibold text-gray-90 group-hover:text-primary transition-colors">{{ totem.title }}</h3>
        <div class="flex items-center justify-center gap-1">
          <span class="text-xs text-primary-50 bg-accent px-2 py-1 rounded-full">{{ category }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>