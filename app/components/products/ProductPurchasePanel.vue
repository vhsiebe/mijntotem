<script setup>
import { Star, Minus, Plus, ShoppingCart, Check, Ruler } from 'lucide-vue-next'
import SizingTable from './SizingTable.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  collection: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  reviews: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: false
  },
  sizes: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    required: true
  },
  features: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      selectedSize: null,
      selectedColor: null,
      quantity: 1,
      frontName: ''
    })
  },
  slug: {
    type: String,
    required: false,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'add'])

// Reactive state for sizing table
const showSizingTable = ref(false)

// Helper function to update model values
const updateModel = (key, value) => {
  const newModel = { ...props.modelValue, [key]: value }
  emit('update:modelValue', newModel)
}

// Computed property to generate default front name from slug
const defaultFrontName = computed(() => {
  if (!props.slug || props.slug === '') return ''
  
  // Remove type suffix (e.g., -tshirt, -hoodie, -mug)
  let cleanSlug = props.slug.replace(/-.*/i, '')
  
  // Convert to title case and replace hyphens with spaces
  return cleanSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
})

// Computed property to sort sizes in the correct order
const sortedSizes = computed(() => {
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  return [...props.sizes].sort((a, b) => {
    const indexA = sizeOrder.indexOf(a)
    const indexB = sizeOrder.indexOf(b)
    
    // If both sizes are in the predefined order, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }
    
    // If only one size is in the predefined order, prioritize it
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    
    // If neither size is in the predefined order, sort alphabetically
    return a.localeCompare(b)
  })
})
</script>


<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <span class="bg-accent text-primary-50 px-3 py-1 rounded-full text-sm font-medium">{{ collection }}</span>
        <div class="flex items-center gap-1" v-if="rating && reviews">
          <Star class="w-5 h-5 text-secondary-60 fill-current" />
          <span class="text-gray-60 font-medium">{{ rating }}</span>
          <span class="text-gray-50">({{ reviews }} reviews)</span>
        </div>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-gray-90">{{ name }}</h1>
      <div class="flex items-center gap-4">
        <span class="text-3xl font-bold text-primary">€{{ price }}</span>
        <span v-if="originalPrice && originalPrice > price" class="text-xl text-gray-50 line-through">€{{ originalPrice }}</span>
        <span v-if="originalPrice && originalPrice > price" class="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">{{ Math.round(((originalPrice - price) / originalPrice) * 100) }}% korting</span>
      </div>
    </div>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-90">Maat</h3>
        <button 
          @click="showSizingTable = true"
          class="flex items-center gap-2 text-sm text-gray-60 hover:text-primary transition-colors"
        >
          <Ruler class="w-4 h-4" />
          Maattabel
        </button>
      </div>
      <div class="flex flex-wrap gap-3">
        <button v-for="size in sortedSizes" :key="size" @click="updateModel('selectedSize', size)" :class="['px-4 py-2 border rounded-lg font-medium transition-colors', modelValue.selectedSize === size ? 'border-primary bg-primary text-primary-foreground' : 'border-gray-30 text-gray-70 hover:border-primary']">{{ size }}</button>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-90">Kleur</h3>
      <div class="flex gap-3">
        <button 
          v-for="color in colors" 
          :key="color" 
          @click="updateModel('selectedColor', color)" 
          :class="[
            'w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 relative',
            modelValue.selectedColor === color 
              ? 'border-primary ring-2 ring-primary/20' 
              : 'border-gray-30 hover:border-gray-50',
            `color-${color}`
          ]" 
          :title="color"
        >
          <!-- Check mark for selected color -->
          <div v-if="modelValue.selectedColor === color" class="absolute inset-0 flex items-center justify-center">
            <Check class="w-5 h-5 text-white drop-shadow-lg" />
          </div>
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-gray-90">Tekst op voorkant</h3>
        <p class="text-sm text-gray-60">Voeg een persoonlijke tekst toe die op de voorkant van je product wordt gedrukt. Dit kan je naam, een motto, of een speciale boodschap zijn.</p>
      </div>
      <input 
        type="text" 
        :value="modelValue.frontName || defaultFrontName" 
        @input="updateModel('frontName', $event.target.value)"
        :placeholder="`Voer tekst in voor de voorkant... (standaard: ${defaultFrontName})`"
        class="w-full px-4 py-3 border border-gray-30 rounded-lg focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-primary transition-all duration-200 text-gray-90 placeholder-gray-50 focus:outline-none"
      />
    </div>

    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <span class="text-lg font-semibold text-gray-90">Aantal:</span>
        <div class="flex items-center border border-gray-30 rounded-lg">
          <button @click="updateModel('quantity', Math.max(1, (modelValue.quantity || 1) - 1))" class="p-2 hover:bg-gray-10 transition-colors"><Minus class="w-4 h-4" /></button>
          <span class="px-4 py-2 font-medium">{{ modelValue.quantity }}</span>
          <button @click="updateModel('quantity', (modelValue.quantity || 1) + 1)" class="p-2 hover:bg-gray-10 transition-colors"><Plus class="w-4 h-4" /></button>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <button @click="$emit('add')" class="flex-1 bg-primary text-primary-foreground px-6 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-primary-70 transition-colors">
          <ShoppingCart class="w-5 h-5" />
          Toevoegen aan winkelwagen
        </button>
      </div>
    </div>

    <!-- Sizing Table Modal -->
    <div v-if="showSizingTable" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 !mt-0" @click="showSizingTable = false">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <SizingTable 
          :category="category"
          :selected-size="modelValue.selectedSize"
          @close="showSizingTable = false"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
.color-White {
  background-color: #fff !important;
}

.color-Black {
  background-color: #000 !important;
}

.color-Bordeaux {
  background-color: #800000 !important;
}

.color-Forest {
  background-color: #223829 !important;
}

.color-Asphalt {
  background-color: #3F4349 !important;
}

.color-Creme {
  background-color: #EBE1D2 !important;
}

.color-Navy {
  background-color: #232347 !important;
}

.color-Fog {
  background-color: #BDCDCF !important;
}
</style>