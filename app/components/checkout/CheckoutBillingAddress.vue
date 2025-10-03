<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-20">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">4</div>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-90">Factuuradres</h2>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <label for="billingAddress" class="block text-sm font-medium text-gray-90">Straat en huisnummer *</label>
        <input 
          id="billingAddress" 
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
          <label for="billingPostalCode" class="block text-sm font-medium text-gray-90">Postcode *</label>
          <input 
            id="billingPostalCode" 
            :value="postalCode" 
            @input="$emit('update:postalCode', ($event.target as HTMLInputElement).value)" 
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
          <label for="billingCity" class="block text-sm font-medium text-gray-90">Stad *</label>
          <input 
            id="billingCity" 
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
        <label for="billingCountry" class="block text-sm font-medium text-gray-90">Land *</label>
        <select 
          id="billingCountry" 
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

      <div class="space-y-2">
        <label for="billingNotes" class="block text-sm font-medium text-gray-90">Opmerkingen (optioneel)</label>
        <textarea 
          id="billingNotes" 
          :value="notes" 
          @input="$emit('update:notes', ($event.target as HTMLTextAreaElement).value)" 
          @blur="$emit('touch:notes')"
          rows="3"
          class="w-full px-4 py-3 border border-gray-30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" 
          placeholder="Eventuele opmerkingen voor de levering..."
        />
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
  notes?: string
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
  notes: '',
  errors: () => ({}),
  showErrors: false
})

defineEmits<{ 
  (e: 'update:address', v: string): void
  (e: 'update:postalCode', v: string): void
  (e: 'update:city', v: string): void
  (e: 'update:country', v: string): void
  (e: 'update:notes', v: string): void
  (e: 'touch:address'): void
  (e: 'touch:postalCode'): void
  (e: 'touch:city'): void
  (e: 'touch:country'): void
  (e: 'touch:notes'): void
}>()
</script>