<script setup>
import { ShoppingCart, Minus, Plus } from 'lucide-vue-next'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCart } from '@/composables/useCart';

const { cartCount, cart, changeQuantity, getCart } = useCart()

const isDropdownOpen = ref(false)

const cartItems = computed(() => {
  return cart.value.items || []
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleUpdateQuantity = (item, newQuantity) => {
  changeQuantity({
    item,
    quantity: newQuantity
  })
}


onMounted(() => {
  // Only call getCart if cart is not already loaded
  if (!cart.value || !cart.value.id) {
    getCart()
  }
})
</script>

<template>
  <div class="relative">
    <!-- Cart Icon -->
    <button 
      @click="toggleDropdown"
      class="relative bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow lg:p-3 lg:block"
    >
      <ShoppingCart class="w-6 h-6 text-primary" :class="{ 'w-4 h-4': isMobile }" />
      <span 
        v-if="cartCount > 0"
        class="absolute -top-1 -right-1 bg-secondary-60 text-primary text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium"
        :class="{ 'text-[10px]': isMobile }"
      >
        {{ cartCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <div 
      v-if="isDropdownOpen"
      class="fixed top-16 w-full md:absolute right-0 md:top-full mt-2 md:w-80 bg-white rounded-lg shadow-xl border border-gray-20 z-50"
    >
      <!-- Dropdown Header -->
      <div class="p-4 border-b border-gray-20">
        <h3 class="font-semibold text-gray-90">Winkelwagen ({{ cartCount }})</h3>
      </div>

      <!-- Cart Items -->
      <div v-if="cartItems.length > 0" class="max-h-64 overflow-y-auto">
        <div 
          v-for="item in cartItems" 
          :key="`${item.id}-${item.size}-${item.color}`"
          class="p-4 border-b border-gray-10 last:border-b-0"
        >
          <div class="flex items-start gap-3">
            <img 
              :src="item.thumbnail" 
              :alt="item.name"
              class="w-12 h-12 object-cover rounded-lg flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-sm text-gray-90 truncate">{{ item.product_title }}</h4>
              <p class="text-xs text-gray-60 mt-1">
                <span v-if="item.title">Variant: {{ item.title }}</span>
              </p>
              <p class="text-xs text-gray-60 mt-1" v-if="item.metadata && item.metadata.frontName">
                <span v-if="item.metadata && item.metadata.frontName">Naam: {{ item.metadata.frontName }}</span>
              </p>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center gap-2">
                  <button 
                    @click="handleUpdateQuantity(item, item.quantity - 1)"
                    class="w-6 h-6 rounded-full border border-gray-30 flex items-center justify-center text-gray-60 hover:bg-gray-10"
                  >
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="text-sm font-medium">{{ item.quantity }}</span>
                  <button 
                    @click="handleUpdateQuantity(item, item.quantity + 1)"
                    class="w-6 h-6 rounded-full border border-gray-30 flex items-center justify-center text-gray-60 hover:bg-gray-10"
                  >
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
                <span class="text-sm font-semibold text-gray-90">€{{ (item.unit_price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="p-8 text-center">
        <ShoppingCart class="w-12 h-12 text-gray-40 mx-auto mb-3" />
        <p class="text-gray-60 text-sm">Je winkelwagen is leeg</p>
        <NuxtLink 
          to="/collectie"
          class="inline-block mt-3 text-primary text-sm font-medium hover:underline"
          @click="closeDropdown"
        >
          Bekijk onze collectie
        </NuxtLink>
      </div>

      <!-- Dropdown Footer -->
      <div v-if="cartItems.length > 0" class="p-4 bg-gray-5 rounded-b-lg">
        <div class="flex items-center justify-between mb-3">
          <span class="font-semibold text-gray-90">Totaal:</span>
          <span class="font-bold text-lg text-primary">€{{ cart.total.toFixed(2) }}</span>
        </div>
        <div class="flex gap-2">
          <NuxtLink 
            to="/cart"
            class="flex-1 bg-gray-20 text-gray-90 py-2 px-4 rounded-lg font-medium text-center text-sm hover:bg-gray-30 transition-colors"
            @click="closeDropdown"
          >
            Winkelwagen
          </NuxtLink>
          <NuxtLink 
            to="/checkout"
            class="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium text-center text-sm hover:bg-primary-80 transition-colors"
            @click="closeDropdown"
          >
            Afrekenen
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div 
      v-if="isDropdownOpen"
      class="fixed inset-0 z-40"
      @click="closeDropdown"
    ></div>
  </div>
</template>

