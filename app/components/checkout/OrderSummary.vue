<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-20 sticky top-6">
    <h3 class="text-xl font-semibold text-gray-90 mb-6">Besteloverzicht</h3>

    <div class="space-y-4 mb-6">
      <div v-for="item in items" :key="item.id" class="flex items-center gap-4">
        <div class="w-16 h-16 bg-cover bg-center rounded-lg flex-shrink-0" :style="{ backgroundImage: `url(${item.image})` }" />
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-gray-90 truncate">{{ item.name }}</h4>
          <p class="text-sm text-gray-60">{{ item.size }} • {{ item.color }}</p>
          <p class="text-sm text-gray-60">Aantal: {{ item.quantity }}</p>
        </div>
        <div class="text-right">
          <span class="font-semibold text-gray-90">€{{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-3 mb-6">
      <div class="flex justify-between text-gray-70">
        <span>Subtotaal</span>
        <span>€{{ subtotal?.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-gray-70">
        <span>Verzendkosten</span>
        <span>{{ shippingCost === 0 ? 'Gratis' : `€${shippingCost?.toFixed(2)}` }}</span>
      </div>
      <div v-if="paymentFee > 0" class="flex justify-between text-gray-70">
        <span>Transactiekosten</span>
        <span>€{{ paymentFee?.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-gray-70">
        <span>BTW (21%)</span>
        <span>€{{ vat?.toFixed(2) }}</span>
      </div>
      <div class="border-t border-gray-20 pt-3">
        <div class="flex justify-between text-lg font-semibold text-gray-90">
          <span>Totaal</span>
          <span>€{{ total?.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <button @click="$emit('place')" :disabled="!canPlace" :class="['w-full py-4 rounded-xl font-semibold text-lg transition-colors mb-3', canPlace ? 'bg-primary text-primary-foreground hover:bg-primary-70' : 'bg-gray-30 text-gray-50 cursor-not-allowed']">
      <span v-if="processing">
        <Loader2 class="w-5 h-5 animate-spin inline mr-2" />
        Verwerken...
      </span>
      <span v-else>
        Bestelling plaatsen
      </span>
    </button>

    <div class="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-20">
      <div class="flex items-center gap-2 text-xs text-gray-50">
        <Shield class="w-4 h-4" />
        SSL Beveiligd
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-50">
        <CreditCard class="w-4 h-4" />
        Betaling via Mollie
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Shield, CreditCard, Loader2 } from 'lucide-vue-next'

defineProps<{ items: any[]; subtotal: number; shippingCost: number; paymentFee: number; vat: number; total: number; canPlace: boolean; processing: boolean }>()

defineEmits<{ (e: 'place'): void }>()
</script>
