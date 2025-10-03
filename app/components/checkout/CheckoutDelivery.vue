<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-20">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-90">Leveringsoptie</h2>
    </div>

    <div class="space-y-4">
      <div v-for="option in options" :key="option.id" @click="$emit('update:modelValue', option.id)" :class="[
        'border-2 rounded-xl p-4 cursor-pointer transition-colors',
        modelValue === option.id ? 'border-primary bg-accent' : 'border-gray-20 hover:border-gray-30',
        showErrors && error ? 'border-red-500' : ''
      ]">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <input :id="option.id" type="radio" name="delivery" :value="option.id" :checked="modelValue === option.id" @change="$emit('update:modelValue', option.id)" class="w-4 h-4 text-primary border-gray-30 focus:ring-primary/20 focus:ring-2" />
            <div>
              <h3 class="font-semibold text-gray-90">{{ option.name }}</h3>
              <p class="text-sm text-gray-60">{{ option.description }}</p>
              <p class="text-xs text-gray-50 mt-1">{{ option.timeframe }}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-semibold text-gray-90">{{ option.price === 0 ? 'Gratis' : `€${option.price.toFixed(2)}` }}</span>
          </div>
        </div>
      </div>
      <p v-if="showErrors && error" class="text-sm text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DeliveryOption { id: string; name: string; description: string; timeframe: string; price: number }

interface Props {
  options: DeliveryOption[]
  modelValue: string
  error?: string
  showErrors: boolean
}

withDefaults(defineProps<Props>(), {
  showErrors: false
})

defineEmits<{ (e: 'update:modelValue', v: string): void }>()
</script>
