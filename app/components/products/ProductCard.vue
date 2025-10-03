<script setup>
import { Heart, Eye, Star, ShoppingCart } from 'lucide-vue-next'

const props = defineProps({ product: Object })

const link = computed(() => `/product/${props.product.slug || props.product.name.toLowerCase().replace(/\s+/g, '-')}`)

defineEmits(['addToCart'])
</script>


<template>
  <NuxtLink :to="link" class="group cursor-pointer block">
    <div class="relative overflow-hidden rounded-2xl mb-4">
      <div 
        class="w-full h-80 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        :style="{ backgroundImage: `url(${product.image})` }"
      >
        <div v-if="product.badge" class="absolute top-4 left-4">
          <span class="bg-secondary-60 text-primary text-sm px-3 py-1 rounded-full font-medium">
            {{ product.badge }}
          </span>
        </div>
        <button class="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart class="w-5 h-5 text-primary" />
        </button>
        <div class="absolute inset-0 bg-primary-90/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div class="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button class="bg-white text-primary px-4 py-2 rounded-full font-medium flex items-center gap-2">
              <Eye class="w-4 h-4" />
              Bekijk
            </button>
            <button
              @click.stop="$emit('addToCart', product)"
              class="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium flex items-center gap-2"
            >
              <ShoppingCart class="w-4 h-4" />
              Bestellen
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="text-lg font-semibold text-gray-90 group-hover:text-primary transition-colors">
        {{ product.name }}
      </h3>
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-primary">€{{ product.price }}</span>
        <span v-if="product.originalPrice" class="text-sm text-gray-50 line-through">
          €{{ product.originalPrice }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>