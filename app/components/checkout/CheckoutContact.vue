<template>
  <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-20">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-90">Contactgegevens</h2>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-90">E-mailadres *</label>
        <input 
          id="email" 
          :value="email" 
          @input="$emit('update:email', ($event.target as HTMLInputElement).value)" 
          @blur="$emit('touch:email')"
          type="email" 
          required 
          :class="[
            'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
            showErrors && errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
          ]" 
          placeholder="jouw@email.com" 
        />
        <p v-if="showErrors && errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label for="firstName" class="block text-sm font-medium text-gray-90">Voornaam *</label>
          <input 
            id="firstName" 
            :value="firstName" 
            @input="$emit('update:firstName', ($event.target as HTMLInputElement).value)" 
            @blur="$emit('touch:firstName')"
            type="text" 
            required 
            :class="[
              'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
              showErrors && errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
            ]" 
            placeholder="Voornaam" 
          />
          <p v-if="showErrors && errors.firstName" class="text-sm text-red-500">{{ errors.firstName }}</p>
        </div>
        <div class="space-y-2">
          <label for="lastName" class="block text-sm font-medium text-gray-90">Achternaam *</label>
          <input 
            id="lastName" 
            :value="lastName" 
            @input="$emit('update:lastName', ($event.target as HTMLInputElement).value)" 
            @blur="$emit('touch:lastName')"
            type="text" 
            required 
            :class="[
              'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
              showErrors && errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
            ]" 
            placeholder="Achternaam" 
          />
          <p v-if="showErrors && errors.lastName" class="text-sm text-red-500">{{ errors.lastName }}</p>
        </div>
      </div>

      <div class="space-y-2">
        <label for="phone" class="block text-sm font-medium text-gray-90">Telefoonnummer</label>
        <input 
          id="phone" 
          :value="phone" 
          @input="$emit('update:phone', ($event.target as HTMLInputElement).value)" 
          @blur="$emit('touch:phone')"
          type="tel" 
          :class="[
            'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors',
            showErrors && errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-30 focus:border-primary'
          ]" 
          placeholder="+32 xxx xx xx xx" 
        />
        <p v-if="showErrors && errors.phone" class="text-sm text-red-500">{{ errors.phone }}</p>
      </div>

      <div class="flex items-start gap-3">
        <input id="newsletter" :checked="newsletter" @change="$emit('update:newsletter', ($event.target as HTMLInputElement).checked)" type="checkbox" class="mt-1 w-4 h-4 text-primary border-gray-30 rounded focus:ring-primary/20 focus:ring-2" />
        <label for="newsletter" class="text-sm text-gray-70">Ik wil graag updates ontvangen over nieuwe totems en aanbiedingen</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  email: string
  firstName: string
  lastName: string
  phone: string
  newsletter: boolean
  errors: {
    email?: string
    firstName?: string
    lastName?: string
    phone?: string
  }
  showErrors: boolean
}

withDefaults(defineProps<Props>(), { 
  email: '', 
  firstName: '', 
  lastName: '', 
  phone: '', 
  newsletter: false,
  errors: () => ({}),
  showErrors: false
})

defineEmits<{ 
  (e: 'update:email', v: string): void
  (e: 'update:firstName', v: string): void
  (e: 'update:lastName', v: string): void
  (e: 'update:phone', v: string): void
  (e: 'update:newsletter', v: boolean): void
  (e: 'touch:email'): void
  (e: 'touch:firstName'): void
  (e: 'touch:lastName'): void
  (e: 'touch:phone'): void
}>()
</script>
