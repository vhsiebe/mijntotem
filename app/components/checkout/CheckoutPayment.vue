<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-20">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">4</div>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-90">Betaalmethode</h2>
    </div>

    <div class="space-y-4">
      <div v-for="method in methods" :key="method.id" @click="$emit('update:modelValue', method.id)" :class="['border-2 rounded-xl p-4 cursor-pointer transition-colors', modelValue === method.id ? 'border-primary bg-accent' : 'border-gray-20 hover:border-gray-30']">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <input :id="method.id" type="radio" name="payment" :value="method.id" :checked="modelValue === method.id" @change="$emit('update:modelValue', method.id)" class="w-4 h-4 text-primary border-gray-30 focus:ring-primary/20 focus:ring-2" />
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 bg-gray-10 rounded flex items-center justify-center">
                <component :is="method.icon" class="w-6 h-6 text-gray-60" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-90">{{ method.name }}</h3>
                <p class="text-sm text-gray-60">{{ method.description }}</p>
              </div>
            </div>
          </div>
          <div v-if="method.fee" class="text-right">
            <span class="text-sm text-gray-60">+€{{ method.fee.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t border-gray-20">
      <div class="flex items-start gap-3">
        <input id="terms" :checked="acceptTerms" @change="$emit('update:acceptTerms', ($event.target as HTMLInputElement).checked)" type="checkbox" required class="mt-1 w-4 h-4 text-primary border-gray-30 rounded focus:ring-primary/20 focus:ring-2" />
        <label for="terms" class="text-sm text-gray-70">
          Ik ga akkoord met de 
          <NuxtLink to="/algemene-voorwaarden" class="text-primary hover:underline">algemene voorwaarden</NuxtLink>
          en het 
          <NuxtLink to="/privacy-beleid" class="text-primary hover:underline">privacybeleid</NuxtLink>
          *
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaymentMethod { id: string; name: string; description: string; icon: any; fee?: number }

defineProps<{ methods: PaymentMethod[]; modelValue: string; acceptTerms: boolean }>()

defineEmits<{ (e: 'update:modelValue', v: string): void; (e: 'update:acceptTerms', v: boolean): void }>()
</script>
