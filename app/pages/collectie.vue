<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Heart, Eye, Star, Search, X } from 'lucide-vue-next'

// Nuxt composables voor URL management
const route = useRoute()
const router = useRouter()

const limit = ref(9)
const allProducts = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const totalProducts = ref(0)

// Reactive data - initialiseer vanuit URL parameters
const activeCategory = ref(route.query.category || 'all')
const searchQuery = ref(route.query.q || '')
const searchInput = ref(null)
const debouncedSearchQuery = ref(route.query.q || '')

const categories = [
  { id: 'all', name: 'Alle producten' },
  { id: 'shirts', name: 'T-shirts', categoryId: 'pcat_01JS3WXX6K7PMG6SH2H5D2PN8Z' },
  { id: 'hoodies', name: 'Hoodies', categoryId: 'pcat_01JS3WXX6NKBSMSXXA95436H4X' },
  { id: 'sweaters', name: 'Sweaters', categoryId: 'pcat_01JS3WXX6SE1W8PM7ZGFN6F1YG' },
]

// Functie om URL bij te werken
const updateURL = () => {
  const query = {}

  if (activeCategory.value !== 'all') {
    query.category = activeCategory.value
  }

  if (debouncedSearchQuery.value) {
    query.q = debouncedSearchQuery.value
  }

  // Update URL zonder page reload
  router.replace({
    path: route.path,
    query: Object.keys(query).length > 0 ? query : {}
  })
}

// Debounce search query
let searchTimeout
watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    debouncedSearchQuery.value = newQuery
  }, 500) // 500ms debounce
})

const mappedProducts = computed(() => 
  allProducts.value.map(product => ({
    ...product,
    price: product.variants[0].calculated_price.calculated_amount
  }))
)

// Load products for specific page
const loadProducts = async (page = 1, reset = false) => {
  if (loading.value) return

  loading.value = true

  try {
    // Build query parameters
    const queryParams = {
      offset: (page - 1) * limit.value,
      limit: limit.value,
    }

    // Add search query if exists
    if (debouncedSearchQuery.value) {
      queryParams.q = debouncedSearchQuery.value
    }

    // Add category filter if not 'all'
    if (activeCategory.value !== 'all') {
      queryParams.category_id = categories.find(category => category.id === activeCategory.value).categoryId
    }

    const response = await $fetch('/api/products', {
      query: queryParams
    })

    if (response.products && response.products.length > 0) {
      allProducts.value = response.products
      totalProducts.value = response.total || response.products.length
      totalPages.value = Math.ceil(totalProducts.value / limit.value)
      currentPage.value = page
    } else {
      allProducts.value = []
      totalProducts.value = 0
      totalPages.value = 1
      currentPage.value = 1
    }
  } catch (error) {
    console.error('Error loading products:', error)
    allProducts.value = []
    totalProducts.value = 0
    totalPages.value = 1
    currentPage.value = 1
  } finally {
    loading.value = false
  }
}

// Pagination functions
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    loadProducts(page)
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1)
  }
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

// Get visible page numbers for pagination
const getVisiblePages = () => {
  const pages = []
  const current = currentPage.value
  const total = totalPages.value
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show pages around current page
    const start = Math.max(1, current - 2)
    const end = Math.min(total, current + 2)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
}

// Watch for filter changes and reset products
watch([debouncedSearchQuery, activeCategory], () => {
  currentPage.value = 1
  loadProducts(1, true)
  updateURL() // Update URL wanneer filters veranderen
}, { deep: true })

// Watch voor URL changes (browser back/forward)
watch(() => route.query, (newQuery) => {
  // Update filters vanuit URL
  activeCategory.value = newQuery.category || 'all'
  searchQuery.value = newQuery.q || ''
  debouncedSearchQuery.value = newQuery.q || ''
}, { immediate: false })

// Initial load
onMounted(() => {
  loadProducts(1)
})

// Methods
const resetFilters = () => {
  searchQuery.value = ''
  debouncedSearchQuery.value = ''
  activeCategory.value = 'all'
  // Reset URL naar basis state
  router.replace({ path: route.path })
}

// Meta tags
useHead({
  title: 'Collectie - MijnTotem',
  meta: [
    { name: 'description', content: 'Ontdek onze unieke collectie totemkledij voor scouts en gidsen. Van shirts tot hoodies, vind het perfecte kledingstuk voor jouw totem.' }
  ]
})
</script>

<template>

  <!-- Collection Hero Section -->
  <section class="px-5 py-10 md:px-20 md:py-20 xl:max-w-screen-2xl mx-auto">
    <div class="text-center space-y-6 mb-16">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
        <div class="w-4 h-4 bg-primary-50 rounded-full relative">
          <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
        </div>
        <span class="text-primary-50 font-medium">Collectie</span>
      </div>

      <!-- Title and Description -->
      <div class="space-y-6">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-primary-80">
          <span class="text-primary">Ontdek onze</span>
          <span class="text-primary-80"> collectie</span>
        </h1>
        <p class="text-lg text-primary-50 leading-relaxed max-w-3xl mx-auto">
          Van klassieke totemshirts tot trendy hoodies - vind het perfecte kledingstuk dat jouw unieke persoonlijkheid
          en totem tot leven brengt.
        </p>
      </div>
    </div>

    <!-- Search Field -->
    <div class="max-w-lg mx-auto mb-8">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-gray-50" />
        </div>
        <input ref="searchInput" v-model="searchQuery" type="text"
          placeholder="Zoek naar een specifiek totem (bijv. Wolf, Dolfijn, Beer)..."
          class="w-full pl-12 pr-12 py-4 bg-white border border-gray-20 rounded-full text-gray-90 placeholder:text-gray-50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
          @keydown.escape="searchQuery = ''" />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-0 pr-4 flex items-center">
          <X class="h-5 w-5 text-gray-50 hover:text-gray-90 transition-colors" />
        </button>
      </div>

      <!-- Search Results Count -->
      <div v-if="debouncedSearchQuery" class="text-center mt-4">
        <p class="text-sm text-gray-60">
          <span v-if="loading && allProducts.length === 0">Zoeken...</span>
          <span v-else>
            {{ mappedProducts.length }} {{ mappedProducts.length === 1 ? 'product gevonden' : 'producten gevonden'
            }}
            voor "<span class="font-medium text-primary">{{ debouncedSearchQuery }}</span>"
          </span>
        </p>
      </div>

    </div>

    <!-- Filters -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      <button v-for="category in categories" :key="category.id" @click="activeCategory = category.id" :class="[
        'px-6 py-3 rounded-full font-medium transition-colors',
        activeCategory === category.id
          ? 'bg-primary text-primary-foreground'
          : 'bg-white text-primary-50 hover:bg-accent'
      ]">
        {{ category.name }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <LoaderProductGridSkeleton :count="6" />
    </div>
    <!-- No Results Message -->
    <div v-else-if="mappedProducts?.length === 0" class="text-center py-16">
      <div class="max-w-md mx-auto">
        <Search class="w-16 h-16 text-gray-40 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-80 mb-2">Geen producten gevonden</h3>
        <p class="text-gray-60 mb-6">
          <span v-if="debouncedSearchQuery">We konden geen producten vinden voor "<span class="font-medium">{{
              debouncedSearchQuery }}</span>".</span>
          <span v-else>Er zijn geen producten beschikbaar in deze categorie.</span>
        </p>
        <button v-if="debouncedSearchQuery || activeCategory !== 'all'" @click="resetFilters"
          class="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-70 transition-colors">
          Alle producten tonen
        </button>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      <NuxtLink v-for="product in mappedProducts" :key="product.id"
        :to="`/product/${product.slug || product.title.toLowerCase().replace(/\s+/g, '-')}`"
        class="group cursor-pointer block">
        <!-- Product Image -->
        <div class="relative overflow-hidden rounded-2xl mb-4">
          <div class="w-full aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            :style="{ backgroundImage: `url(${product.thumbnail})` }">
            <!-- Badge -->
            <div v-if="product.badge" class="absolute top-4 left-4">
              <span class="bg-secondary-60 text-primary text-sm px-3 py-1 rounded-full font-medium">
                {{ product.badge }}
              </span>
            </div>

            <!-- Favorite Button -->
            <button
              class="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Heart class="w-5 h-5 text-primary" />
            </button>

            <!-- Quick View on Hover -->
            <div
              class="absolute inset-0 bg-primary-90/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                class="bg-white text-primary px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Eye class="w-5 h-5" />
                Bekijk product
              </button>
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-90 group-hover:text-primary transition-colors">
            {{ product.title }}
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-xl font-bold text-primary">€{{
              product.price?.toFixed(2) }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1 && mappedProducts.length > 0" class="flex justify-center items-center gap-2 mt-12">
      <!-- Previous Button -->
      <button 
        @click="goToPreviousPage" 
        :disabled="currentPage === 1 || loading"
        class="px-4 py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="currentPage === 1 || loading 
          ? 'bg-gray-20 text-gray-50' 
          : 'bg-white text-primary hover:bg-accent border border-gray-20'"
      >
        Vorige
      </button>

      <!-- Page Numbers -->
      <div class="flex gap-1">
        <!-- First page -->
        <button 
          v-if="currentPage > 3" 
          @click="goToPage(1)"
          class="w-10 h-10 rounded-full font-medium transition-colors bg-white text-primary hover:bg-accent border border-gray-20"
        >
          1
        </button>
        
        <!-- Ellipsis -->
        <span v-if="currentPage > 4" class="px-2 text-gray-50">...</span>

        <!-- Pages around current page -->
        <template v-for="page in getVisiblePages()" :key="page">
          <button 
            @click="goToPage(page)"
            :disabled="loading"
            class="w-10 h-10 rounded-full font-medium transition-colors disabled:cursor-not-allowed"
            :class="page === currentPage 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-white text-primary hover:bg-accent border border-gray-20'"
          >
            {{ page }}
          </button>
        </template>

        <!-- Ellipsis -->
        <span v-if="currentPage < totalPages - 3" class="px-2 text-gray-50">...</span>

        <!-- Last page -->
        <button 
          v-if="currentPage < totalPages - 2" 
          @click="goToPage(totalPages)"
          class="w-10 h-10 rounded-full font-medium transition-colors bg-white text-primary hover:bg-accent border border-gray-20"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Next Button -->
      <button 
        @click="goToNextPage" 
        :disabled="currentPage === totalPages || loading"
        class="px-4 py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="currentPage === totalPages || loading 
          ? 'bg-gray-20 text-gray-50' 
          : 'bg-white text-primary hover:bg-accent border border-gray-20'"
      >
        Volgende
      </button>
    </div>

    <!-- Page Info -->
    <div v-if="totalPages > 1 && mappedProducts.length > 0" class="text-center mt-4">
      <p class="text-sm text-gray-60">
        Pagina {{ currentPage }} van {{ totalPages }} 
        ({{ totalProducts }} {{ totalProducts === 1 ? 'product' : 'producten' }})
      </p>
    </div>
  </section>

  <MissingTotem />

</template>
