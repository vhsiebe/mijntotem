
<script setup>
import { ShoppingCart, X, Minus, Plus, Truck } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'

const { cartCount, cart, changeQuantity } = useCart()

const cartItems = computed(() => {
  return cart.value.items || []
})

const handleUpdateQuantity = (item, newQuantity) => {
  changeQuantity({ item, quantity: newQuantity })
}

// SEO
useHead({
  title: 'Winkelwagen - MijnTotem',
  meta: [
    { name: 'description', content: 'Bekijk je winkelwagen en ga verder naar afrekenen voor je handgemaakte totems.' }
  ]
})
</script>

<template>
    <!-- Main Content -->
    <main class="px-5 md:px-10 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <nav class="text-sm text-gray-60 mb-4">
            <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-90">Winkelwagen</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-90">Winkelwagen</h1>
        </div>

        <div v-if="cartCount > 0" class="grid lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <h2 class="text-xl font-semibold text-gray-90 mb-6">Je items ({{ cartCount }})</h2>
              
              <div class="space-y-6">
                <div 
                  v-for="item in cartItems" 
                  :key="`${item.id}-${item.size}-${item.color}`"
                  class="flex items-start gap-4 p-4 border border-gray-10 rounded-lg"
                >
                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <img 
                      :src="item.thumbnail" 
                      :alt="item.product_title"
                      class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                  </div>

                  <!-- Product Details -->
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="font-semibold text-gray-90">{{ item.product_title }}</h3>
                      <button 
                        @click="handleUpdateQuantity(item, 0)"
                        class="text-gray-40 hover:text-red-500 transition-colors"
                      >
                        <X class="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div class="text-sm text-gray-60 mb-3">
                      <p v-if="item.metadata.size">Variant: {{ item.title }}</p>
                      <p v-if="item.metadata.frontName">Naam: {{ item.metadata.frontName }}</p>
                    </div>

                    <div class="flex items-center justify-between">
                      <!-- Quantity Controls -->
                      <div class="flex items-center gap-3">
                        <span class="text-sm text-gray-60">Aantal:</span>
                        <div class="flex items-center gap-2">
                          <button 
                            @click="handleUpdateQuantity(item, item.quantity - 1)"
                            class="w-8 h-8 rounded-full border border-gray-30 flex items-center justify-center text-gray-60 hover:bg-gray-10 transition-colors"
                          >
                            <Minus class="w-4 h-4" />
                          </button>
                          <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                          <button 
                            @click="handleUpdateQuantity(item, item.quantity + 1)"
                            class="w-8 h-8 rounded-full border border-gray-30 flex items-center justify-center text-gray-60 hover:bg-gray-10 transition-colors"
                          >
                            <Plus class="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <!-- Price -->
                      <div class="text-right">
                        <p class="text-lg font-bold text-primary">€{{ (item.unit_price * item.quantity).toFixed(2) }}</p>
                        <p v-if="item.quantity > 1" class="text-sm text-gray-60">€{{ item.unit_price }} per stuk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              <h2 class="text-xl font-semibold text-gray-90 mb-6">Bestelsamenvatting</h2>
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-60">Subtotaal</span>
                  <span class="font-medium">€{{ cart.subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-60">Verzendkosten</span>
                  <span class="font-medium">{{ cart.shipping_total === 0 ? '€--,--' : `€${cart.shipping_total.toFixed(2)}` }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-60">BTW (21%)</span>
                  <span class="font-medium">€{{ cart.tax_total?.toFixed(2) }}</span>
                </div>
                <hr class="border-gray-20">
                <div class="flex justify-between text-lg font-bold">
                  <span>Totaal</span>
                  <span class="text-primary">€{{ cart.total.toFixed(2) }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <NuxtLink 
                  to="/checkout"
                  class="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold text-center block hover:bg-primary-80 transition-colors"
                >
                  Verder naar afrekenen
                </NuxtLink>
                <NuxtLink 
                  to="/collectie"
                  class="w-full bg-gray-10 text-gray-90 py-3 px-6 rounded-lg font-medium text-center block hover:bg-gray-20 transition-colors"
                >
                  Verder winkelen
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Cart -->
        <div v-else class="text-center py-16">
          <div class="bg-white rounded-xl p-12 shadow-sm max-w-md mx-auto">
            <ShoppingCart class="w-16 h-16 text-gray-40 mx-auto mb-4" />
            <h2 class="text-2xl font-semibold text-gray-90 mb-3">Je winkelwagen is leeg</h2>
            <p class="text-gray-60 mb-6">Ontdek onze prachtige collectie en voeg je favoriete totems toe aan je winkelwagen.</p>
            <NuxtLink 
              to="/collectie"
              class="inline-block bg-primary text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-80 transition-colors"
            >
              Bekijk collectie
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
</template>
