<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  selectedSize: {
    type: String,
    default: null
  }
})

// Maattabel data voor verschillende categorieën
const sizingData = {
  'T-shirts': {
    title: 'T-shirt Maattabel',
    measurements: [
      { size: 'XS', width: '47', length: '68' },
      { size: 'S', width: '50', length: '70' },
      { size: 'M', width: '53', length: '72' },
      { size: 'L', width: '56', length: '74' },
      { size: 'XL', width: '59', length: '76' },
      { size: 'XXL', width: '62', length: '78' }
    ],
    note: 'Metingen in centimeters. Meet je borst breedte op het breedste punt.'
  },
  'Hoodies': {
    title: 'Hoodie Maattabel',
    measurements: [
      { size: 'XS', width: '49', length: '68' },
      { size: 'S', width: '52', length: '70' },
      { size: 'M', width: '55', length: '72' },
      { size: 'L', width: '59', length: '74' },
      { size: 'XL', width: '62.5', length: '76' },
      { size: 'XXL', width: '66', length: '78' }
    ],
    note: 'Metingen in centimeters. Meet je borst breedte op het breedste punt.'
  },
  'Sweaters': {
    title: 'Sweater Maattabel',
    measurements: [
      { size: 'XS', width: '49', length: '69' },
      { size: 'S', width: '52', length: '71' },
      { size: 'M', width: '55', length: '73' },
      { size: 'L', width: '59', length: '75' },
      { size: 'XL', width: '62.5', length: '77' },
      { size: 'XXL', width: '66', length: '79' }
    ],
    note: 'Metingen in centimeters. Meet je borst breedte op het breedste punt.'
  }
}

// Bepaal welke maattabel te tonen op basis van categorie
const currentSizingData = computed(() => {
  // Zoek naar een match in de categorie naam
  const categoryLower = props.category.toLowerCase()
  
  if (categoryLower.includes('tshirt') || categoryLower.includes('t-shirt')) {
    return sizingData['T-shirts']
  } else if (categoryLower.includes('hoodie')) {
    return sizingData['Hoodies']
  } else if (categoryLower.includes('sweater')) {
    return sizingData['Sweaters']
  }
  
  // Default naar T-shirts als geen match
  return sizingData['T-shirts']
})

// Functie om te bepalen of een maat geselecteerd is
const isSizeSelected = (size) => {
  return props.selectedSize === size
}

// Functie om de juiste afbeelding te bepalen op basis van categorie
const getCategoryImage = () => {
  const categoryLower = props.category.toLowerCase()
  
  if (categoryLower.includes('tshirt') || categoryLower.includes('t-shirt')) {
    return 'tshirt'
  } else if (categoryLower.includes('hoodie')) {
    return 'hoodie'
  } else if (categoryLower.includes('sweater')) {
    return 'sweater'
  }
  
  // Default naar tshirt als geen match
  return 'tshirt'
}
</script>

<template>
  <div class="bg-gray-5 rounded-lg p-6 space-y-4 mt-0">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-90">{{ currentSizingData.title }}</h3>
      <button 
        @click="$emit('close')"
        class="text-gray-50 hover:text-gray-70 transition-colors"
        aria-label="Sluit maattabel"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Size Diagram -->
    <div class="mb-6 flex justify-center">
      <div class="relative">
        <img 
          :src="`/img/sizes/${getCategoryImage()}.png`" 
          :alt="`${currentSizingData.title} diagram`"
          class="max-w-xs w-full h-auto"
        />
        <div class="absolute top-4 left-4 bg-primary text-white px-2 py-1 rounded text-sm font-medium">
          A = Breedte
        </div>
        <div class="absolute bottom-4 right-4 bg-primary text-white px-2 py-1 rounded text-sm font-medium">
          B = Lengte
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-20">
            <th class="text-left py-3 px-4 font-medium text-gray-70">Maat</th>
            <th class="text-left py-3 px-4 font-medium text-gray-70">Breedte (cm)</th>
            <th class="text-left py-3 px-4 font-medium text-gray-70">Lengte (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="measurement in currentSizingData.measurements" 
            :key="measurement.size"
            :class="[
              'border-b border-gray-10 transition-colors',
              isSizeSelected(measurement.size) ? 'bg-primary/10' : 'hover:bg-gray-10'
            ]"
          >
            <td class="py-3 px-4">
              <span 
                :class="[
                  'font-medium',
                  isSizeSelected(measurement.size) ? 'text-primary' : 'text-gray-90'
                ]"
              >
                {{ measurement.size }}
                <span v-if="isSizeSelected(measurement.size)" class="ml-2 text-primary">✓</span>
              </span>
            </td>
            <td class="py-3 px-4 text-gray-70">{{ measurement.width }}</td>
            <td class="py-3 px-4 text-gray-70">{{ measurement.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="text-sm text-blue-800 font-medium mb-1">Hoe meet je de juiste maat?</p>
          <p class="text-sm text-blue-700">{{ currentSizingData.note }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
