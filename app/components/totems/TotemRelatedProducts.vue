<script setup>
import { ShoppingBag, Plus, Star } from 'lucide-vue-next'
import ProductGridSkeleton from '../../components/ProductGridSkeleton.vue'

defineProps({
  title: String,
  description: String,
  active: String,
  products: Array,
  loading: Boolean
})

const sectionEl = ref(null)

defineEmits(['update:active', 'quickAdd'])

defineExpose({ sectionEl })
</script>

<template>
  <section ref="sectionEl" class="px-5 md:px-20 py-16 bg-accent">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-90 mb-4">{{ title }}</h2>
        <p class="text-lg text-gray-60 max-w-2xl mx-auto">{{ description }}</p>
      </div>

      <ProductGridSkeleton v-if="loading" :count="6" />

      <div v-else-if="products.length === 0" class="text-center py-16">
        <ShoppingBag class="w-16 h-16 text-gray-40 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-80 mb-2">Geen producten beschikbaar</h3>
        <p class="text-gray-60 mb-6">Er zijn momenteel geen {{ active === 'all' ? '' : filters.find(f => f.id === active)?.name.toLowerCase() + ' ' }}producten beschikbaar.</p>
        <slot name="empty-cta" />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink v-for="p in products" :key="p.id" :to="`/product/${p.handle}`" class="group cursor-pointer">
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
            <div class="relative overflow-hidden">
              <img :src="p.thumbnail" :alt="p.title" class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="p-6 space-y-3">
              <h3 class="text-lg font-semibold text-gray-90 group-hover:text-primary transition-colors">{{ p.title }}</h3>
              <div class="flex items-center gap-2">
                <span class="text-xl font-bold text-primary">€{{ p.variants[0].calculated_price.calculated_amount }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="products.length > 0" class="text-center mt-12">
        <slot name="view-all" />
      </div>
    </div>
  </section>
</template>

