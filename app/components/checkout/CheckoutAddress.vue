<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-20">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
        <h2 class="text-xl md:text-2xl font-semibold text-gray-90">Leveringsadres</h2>
      </div>
      <div class="flex items-center gap-2">
        <input id="sameAsBilling" :checked="sameAsBilling" @change="$emit('update:sameAsBilling', ($event.target as HTMLInputElement).checked)" type="checkbox" class="w-4 h-4 text-primary border-gray-30 rounded focus:ring-primary/20 focus:ring-2" />
        <label for="sameAsBilling" class="text-sm text-gray-70">Zelfde als factuuradres</label>
      </div>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <label for="address" class="block text-sm font-medium text-gray-90">Straat en huisnummer *</label>
        <input 
          id="address" 
          :value="address" 
          @input="$emit('update:address', ($event.target as HTMLInputElement).value)" 
          @blur="$emit('touch:address')"
          type="text" 
          required 
          :class="[
            'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
            showErrors && errors.street ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
          ]" 
          placeholder="Straatnaam 123" 
        />
        <p v-if="showErrors && errors.street" class="text-sm text-red-500">{{ errors.street }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="space-y-2">
          <label for="postalCode" class="block text-sm font-medium text-gray-90">Postcode *</label>
          <input 
            id="postalCode" 
            :value="postalCode" 
            @input="$emit('update:postalCode', ($event.target as HTMLInputElement).value)" 
            @change="$emit('update:postalCode', ($event.target as HTMLInputElement).value)"
            @blur="$emit('touch:postalCode')"
            type="text" 
            required 
            :class="[
              'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
              showErrors && errors.postalCode ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
            ]" 
            placeholder="1000" 
          />
          <p v-if="showErrors && errors.postalCode" class="text-sm text-red-500">{{ errors.postalCode }}</p>
        </div>
        <div class="md:col-span-2 space-y-2">
          <label for="city" class="block text-sm font-medium text-gray-90">Stad *</label>
          <input 
            id="city" 
            :value="city" 
            @input="$emit('update:city', ($event.target as HTMLInputElement).value)" 
            @blur="$emit('touch:city')"
            type="text" 
            required 
            :class="[
              'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
              showErrors && errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
            ]" 
            placeholder="Brussel" 
          />
          <p v-if="showErrors && errors.city" class="text-sm text-red-500">{{ errors.city }}</p>
        </div>
      </div>

      <div class="space-y-2">
        <label for="country" class="block text-sm font-medium text-gray-90">Land *</label>
        <select 
          id="country" 
          :value="country" 
          @change="$emit('update:country', ($event.target as HTMLSelectElement).value)" 
          @blur="$emit('touch:country')"
          required 
          :class="[
            'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
            showErrors && errors.country ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
          ]"
        >
          <option value="">Selecteer land</option>
          <option value="be">België</option>
          <option value="nl">Nederland</option>
        </select>
        <p v-if="showErrors && errors.country" class="text-sm text-red-500">{{ errors.country }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  address: string
  postalCode: string
  city: string
  country: string
  sameAsBilling: boolean
  errors: {
    street?: string
    postalCode?: string
    city?: string
    country?: string
  }
  showErrors: boolean
}

withDefaults(defineProps<Props>(), { 
  address: '', 
  postalCode: '', 
  city: '', 
  country: '', 
  sameAsBilling: true,
  errors: () => ({}),
  showErrors: false
})

defineEmits<{ 
  (e: 'update:address', v: string): void
  (e: 'update:postalCode', v: string): void
  (e: 'update:city', v: string): void
  (e: 'update:country', v: string): void
  (e: 'update:sameAsBilling', v: boolean): void
  (e: 'touch:address'): void
  (e: 'touch:postalCode'): void
  (e: 'touch:city'): void
  (e: 'touch:country'): void
}>()
</script>
