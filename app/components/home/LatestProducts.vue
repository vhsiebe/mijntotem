<template>
  <section class="px-5 py-10 md:px-20 md:py-32 xl:max-w-screen-2xl mx-auto">
    <div class="space-y-16">
      <!-- Header -->
      <div class="text-center space-y-6">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
          <div class="w-4 h-4 bg-primary-50 rounded-full relative">
            <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
          </div>
          <span class="text-primary-50 font-medium">Nieuwste producten</span>
        </div>

        <!-- Title and Description -->
        <div class="space-y-6">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">
            Ontdek onze nieuwste totems
          </h2>
          <p class="text-lg lg:text-xl text-gray-60 leading-relaxed max-w-3xl mx-auto">
            Elke maand voegen we nieuwe totems toe aan onze collectie. Ontdek de nieuwste designs 
            en vind jouw perfecte totem-kleding.
          </p>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="product in latestProducts"
          :key="product.id"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Product Image -->
          <div class="relative aspect-square overflow-hidden">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <!-- Overlay on hover -->
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <nuxt-link :to="`/product/${product.handle}`" class="bg-white text-gray-90 px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Bekijk product
                <ArrowUpRight class="w-4 h-4" />
              </nuxt-link>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-6 space-y-4">
            <!-- Title and Category -->
            <div class="space-y-2">
              <h3 class="text-xl font-semibold text-gray-90 line-clamp-2 group-hover:text-primary transition-colors">
                {{ product.title }}
              </h3>
            </div>

            <!-- Colors -->
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-60">Kleuren:</span>
              <div class="flex -space-x-2">
                <div
                  v-for="color in product.colors?.slice(0, 4)"
                  :key="color"
                  class="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-200"
                  :style="{ backgroundColor: getColorValue(color) }"
                  :title="color"
                />
                <div
                  v-if="product.colors?.length > 4"
                  class="w-8 h-8 rounded-full bg-gray-40 flex items-center justify-center text-sm text-gray-60 border-2 border-white shadow-md hover:scale-110 transition-transform duration-200"
                  :title="`+${product.colors.length - 4} meer`"
                >
                  +
                </div>
              </div>
            </div>

            <!-- Price -->
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <div class="text-2xl font-bold text-gray-90">
                  €{{ product.price }}
                </div>
                <div v-if="product.originalPrice !== product.price" class="text-sm text-gray-60 line-through">
                  €{{ product.originalPrice }}
                </div>
              </div>
              <nuxt-link :to="`/product/${product.handle}`" class="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Bekijk
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center">
        <nuxt-link to="/collectie" class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-70 transition-colors">
          Alle producten bekijken
          <ArrowUpRight class="w-5 h-5" />
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

const { data: latestProducts } = await useFetch('/api/latest-products')


const formatPrice = (price) => {
  return (price).toFixed(2)
}

const getColorValue = (colorName) => {
  const colorMap = {
    'black': '#000000',
    'bordeaux': '#7f1d1d',
    'forest': '#223829',
    'asphalt': '#3F4349',
    'creme': '#EBE1D2',
    'navy': '#232347',
    'fog': '#BDCDCF',
    'white': '#ffffff',
  }
  
  return colorMap[colorName.toLowerCase()] || '#6b7280'
}

// Make functions available in template
defineExpose({
  formatPrice,
  getColorValue
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>