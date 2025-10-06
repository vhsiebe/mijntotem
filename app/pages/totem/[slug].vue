
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, ArrowRight } from 'lucide-vue-next'
import Breadcrumbs from '../../components/common/Breadcrumbs.vue'
import TotemHero from '../../components/totems/TotemHero.vue'
import TotemStats from '../../components/totems/TotemStats.vue'
import TotemRelatedProducts from '../../components/totems/TotemRelatedProducts.vue'
import totems from '../../../data/totems.json'

const route = useRoute()
const loading = ref(true)
const productsLoading = ref(true)
const activeProductFilter = ref('all')
const productsSection = ref(null)


const productFilters = [
  { id: 'all', name: 'Alle' },
  { id: 'tshirts', name: 'T-Shirts' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'accessories', name: 'Accessoires' }
]

const totemSlug = computed(() => route.params.slug)

const { data: relatedProducts, loading: relatedProductsLoading } = await useFetch(`/api/totems/${totemSlug.value}/products`)

const totem = computed(() => totems[totemSlug.value.toLowerCase()])

// Filter products based on active filter
const filteredRelatedProducts = computed(() => {
  if (activeProductFilter.value === 'all') {
    return relatedProducts.value?.products || []
  }
  return (relatedProducts.value?.products || []).filter(product => product.categoryId === activeProductFilter.value)
})

const scrollToProducts = () => {
  if (productsSection.value) {
    // Get the DOM element from the Vue component ref
    const element = productsSection.value.$el || productsSection.value
    if (element && element.scrollIntoView) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Load data
onMounted(async () => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 500)
  
  setTimeout(() => {
    productsLoading.value = false
  }, 800)
})

// SEO
useHead({
  title: computed(() => totem.value ? `${totem.value.title} Totem | MijnTotem` : 'Totem Details - MijnTotem'),
  meta: [
    { 
      name: 'description', 
      content: computed(() => totem.value ? `Ontdek alles over de ${totem.value.title.toLowerCase()} totem. ${totem.value.description} Bekijk onze ${totem.value.title.toLowerCase()} producten.` : 'Totem details bij MijnTotem')
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Loading State -->
    <div v-if="loading" class="px-5 py-20 md:px-20">
      <LoaderSpinner size="lg" text="Totem informatie laden..." container-class="py-16" />
    </div>

    <!-- Totem Not Found -->
    <div v-else-if="!totem" class="px-5 py-20 md:px-20">
      <div class="text-center max-w-md mx-auto">
        <div class="w-16 h-16 bg-gray-20 rounded-lg mx-auto mb-6 flex items-center justify-center">
          <Search class="w-8 h-8 text-gray-40" />
        </div>
        <h1 class="text-2xl font-bold text-gray-90 mb-3">Totem niet gevonden</h1>
        <p class="text-gray-60 mb-6">De totem die je zoekt bestaat niet of is niet beschikbaar.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink 
            to="/totems"
            class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-80 transition-colors"
          >
            Alle totems bekijken
          </NuxtLink>
          <NuxtLink 
            to="/collectie"
            class="bg-gray-10 text-gray-90 px-6 py-3 rounded-lg font-medium hover:bg-gray-20 transition-colors"
          >
            Naar collectie
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Totem Detail Content -->
    <div v-else>
      <!-- Breadcrumb -->
      <div class="px-5 md:px-20 pt-8 max-w-screen-2xl mx-auto" >
        <Breadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Totems', to: '/totems' }, { label: totem.title }]" />
      </div>

      <TotemHero :totem="totem" :productsCount="relatedProductsLoading ? 0 : relatedProducts?.total || 0" @toggleFavorite="toggleFavorite" @viewProducts="scrollToProducts" />

      <TotemStats :name="totem.title" />

      <TotemRelatedProducts
        v-if="relatedProducts?.products"
        ref="productsSection"
        :title="`${totem.title} Producten`"
        :description="`Ontdek onze collectie van ${totem.title.toLowerCase()} geïnspireerde producten. Van kleding tot accessoires - alles wat je nodig hebt om jouw totem te eren.`"
        :active="activeProductFilter"
        :products="filteredRelatedProducts"
        :loading="relatedProductsLoading"
        @update:active="val => activeProductFilter = val"
      >
        <template #empty-cta>
          <NuxtLink to="/collectie" class="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-80 transition-colors">Bekijk alle producten</NuxtLink>
        </template>
        <template #view-all>
          <NuxtLink :to="`/collectie?q=${totem.title}`" class="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-80 transition-colors inline-flex items-center gap-2">
            Alle {{ totem.title.toLowerCase() }} producten bekijken
            <ArrowRight class="w-5 h-5" />
          </NuxtLink>
        </template>
      </TotemRelatedProducts>
    </div>
  </div>
</template>
