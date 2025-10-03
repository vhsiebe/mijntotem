<script setup>
import { Heart, ShoppingBag } from 'lucide-vue-next'

const props = defineProps({ totem: Object, productsCount: Number })

const categories = {
  mammals: 'Zoogdieren',
  birds: 'Vogels',
  reptiles: 'Reptielen',
  insects: 'Insecten',
  aquatic: 'Waterdieren'
}

const category = computed(() => categories[props.totem.categoryId])

defineEmits(['toggleFavorite', 'viewProducts'])
</script>

<template>
  <section class="px-5 md:px-20 py-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      <div class="relative">
        <div 
          class="w-full h-80 md:h-96 lg:h-[500px] bg-cover bg-center rounded-3xl shadow-2xl"
          :style="{ backgroundImage: `url(${totem.picture})` }"
        >
          <button 
            @click="$emit('toggleFavorite')"
            class="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <Heart :class="['w-6 h-6 transition-colors', totem.isFavorite ? 'text-red-500 fill-current' : 'text-gray-50']" />
          </button>
        </div>
      </div>
      <div class="space-y-8">
        <div>
          <div class="inline-flex items-center gap-2 bg-accent rounded-full px-4 py-2 mb-4">
            <div class="w-3 h-3 bg-primary rounded-full"></div>
            <span class="text-primary font-medium text-sm">{{ category }}</span>
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-90 mb-4">{{ totem.title }}</h1>
          <p class="text-xl md:text-2xl text-primary-60 font-medium">{{ totem.other_names }}</p>
        </div>
        <p class="text-lg text-gray-70 leading-relaxed">{{ totem.description }}</p>
        <div>
          <h3 class="text-lg font-semibold text-gray-90 mb-3">Eigenschappen</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="trait in totem.traits" :key="trait" class="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">{{ trait }}</span>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <button @click="$emit('viewProducts')" class="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-80 transition-colors flex items-center justify-center gap-2">
            <ShoppingBag class="w-5 h-5" />
            Bekijk producten ({{ productsCount }})
          </button>
          <NuxtLink to="/totems" class="bg-gray-10 text-gray-90 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-20 transition-colors text-center">Andere totems</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>