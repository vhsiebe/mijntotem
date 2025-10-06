
<script setup>
import { ref, computed } from 'vue'
import { Search, X, ArrowDown } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

import totems from '../../../data/totems.json'

// Meta tags
useHead({
  title: 'Alle Totems - MijnTotem',
  meta: [
    { name: 'description', content: 'Ontdek alle beschikbare totems bij MijnTotem. Van krachtige wolven tot wijze uilen - vind het dier dat jouw karakter het beste weergeeft.' }
  ]
})

const router = useRouter()

// Reactive data
const searchQuery = ref('')
const activeCategory = ref('all')
const displayedCount = ref(21)

const categories = [
  { id: 'all', name: 'Alle' },
  { id: 'mammals', name: 'Zoogdieren' },
  { id: 'birds', name: 'Vogels' },
  { id: 'reptiles', name: 'Reptielen' },
  { id: 'insects', name: 'Insecten' },
  { id: 'aquatic', name: 'Waterdieren' }
]


// Computed properties
const filteredTotems = computed(() => {
  // totems is an object
  let filtered = Object.values(totems)

  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(totem => totem.categoryId === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(totem => 
      totem.title.toLowerCase().includes(query)
    )
  }

  return filtered.slice(0, displayedCount.value).sort((a, b) => a.title.localeCompare(b.title))
})

const showLoadMore = computed(() => {
  let totalFiltered = Object.values(totems)
  if (activeCategory.value !== 'all') {
    totalFiltered = totalFiltered.filter(totem => totem.categoryId === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    totalFiltered = totalFiltered.filter(totem => 
      totem.title.toLowerCase().includes(query)
    )
  }
  return totalFiltered.length > displayedCount.value
})

// Methods
const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
}

const toggleFavorite = (totemId) => {
  const totem = Object.values(totems).find(t => t.id === totemId)
  if (totem) {
    totem.isFavorite = !totem.isFavorite
  }
}

const loadMore = () => {
  displayedCount.value += 21
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <Navbar />
    
    <!-- Totems Gallery Hero Section -->
    <section class="px-5 py-10 md:px-20 md:py-20">
      <div class="text-center space-y-6 mb-16">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
          <div class="w-4 h-4 bg-primary-50 rounded-full relative">
            <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
          </div>
          <span class="text-primary-50 font-medium">Alle Totems</span>
        </div>
        
        <!-- Title and Description -->
        <div class="space-y-6">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-primary-80">
            <span class="text-primary">Ontdek alle</span>
            <span class="text-primary-80"> totems</span>
          </h1>
          <p class="text-lg text-primary-50 leading-relaxed max-w-3xl mx-auto">
            Van krachtige wolven tot wijze uilen - verken onze complete collectie van totems en vind het dier dat jouw unieke karakter het beste weergeeft.
          </p>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="max-w-2xl mx-auto mb-12">
        <div class="relative mb-6">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search class="h-5 w-5 text-gray-50" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Zoek naar een totem (bijv. Wolf, Dolfijn, Beer)..."
            class="w-full pl-12 pr-12 py-4 bg-white border border-gray-20 rounded-full text-gray-90 placeholder:text-gray-50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            @keydown.escape="searchQuery = ''"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X class="h-5 w-5 text-gray-50 hover:text-gray-90 transition-colors" />
          </button>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCategory === category.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-white text-primary-50 hover:bg-accent'
            ]"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Results Counter -->
        <div v-if="searchQuery || activeCategory !== 'all'" class="text-center mt-4">
          <p class="text-sm text-gray-60">
            {{ filteredTotems.length }} {{ filteredTotems.length === 1 ? 'totem gevonden' : 'totems gevonden' }}
            <span v-if="searchQuery">voor "<span class="font-medium text-primary">{{ searchQuery }}</span>"</span>
            <span v-if="activeCategory !== 'all'">in categorie "<span class="font-medium text-primary">{{ categories.find(c => c.id === activeCategory)?.name }}</span>"</span>
          </p>
        </div>
      </div>

      <!-- No Results Message -->
      <div v-if="filteredTotems.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <Search class="w-16 h-16 text-gray-40 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-80 mb-2">Geen totems gevonden</h3>
          <p class="text-gray-60 mb-6">
            <span v-if="searchQuery">We konden geen totems vinden voor "<span class="font-medium">{{ searchQuery }}</span>".</span>
            <span v-else>Er zijn geen totems beschikbaar in deze categorie.</span>
          </p>
          <button 
            @click="resetFilters"
            class="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-70 transition-colors"
          >
            Alle totems tonen
          </button>
        </div>
      </div>

      <!-- Totems Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-4 mb-16 xl:max-w-screen-2xl mx-auto">
        <NuxtLink 
          v-for="totem in filteredTotems" 
          :key="totem.id"
          :to="`/totem/${totem.title}`"
          class="group cursor-pointer"
        >
          <!-- Totem Card -->
          <div class="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
            <!-- Totem Image -->
            <div class="relative mb-4">
              <div 
                class="w-full h-80 md:h-60  bg-contain bg-no-repeat bg-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                :style="{ backgroundImage: `url(${totem.image})` }"
              >
              </div>
            </div>

            <!-- Totem Info -->
            <div class="text-center space-y-2">
              <h3 class="text-xl md:text-xl font-semibold text-gray-90 group-hover:text-primary transition-colors">
                {{ totem.title }}
              </h3>
              <p class="text-sm text-gray-60">
                {{ totem.meaning }}
              </p>
              <div class="flex items-center justify-center gap-1">
                <span class="text-xs text-primary-50 bg-accent px-2 py-1 rounded-full">
                  {{ categories.find(c => c.id === totem.categoryId)?.name }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="text-center">
        <button 
          @click="loadMore"
          class="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 mx-auto shadow-lg hover:bg-primary-70 transition-colors"
        >
          Meer totems laden
          <ArrowDown class="w-5 h-5" />
        </button>
      </div>
    </section>

    <MissingTotem />

    <!-- Footer -->
    <Footer />
  </div>
</template>
