<script setup>
import { ref, computed } from 'vue'
import { CreditCard, Smartphone, Building2, Banknote } from 'lucide-vue-next'
import Breadcrumbs from '../../components/common/Breadcrumbs.vue'
import CheckoutContact from '../../components/checkout/CheckoutContact.vue'
import CheckoutAddress from '../../components/checkout/CheckoutAddress.vue'
import CheckoutBillingAddress from '../../components/checkout/CheckoutBillingAddress.vue'
import CheckoutDelivery from '../../components/checkout/CheckoutDelivery.vue'
import OrderSummary from '../../components/checkout/OrderSummary.vue'
import { useFormValidation } from '../../composables/useFormValidation.js'

// Meta tags
useHead({
  title: 'Afrekenen - MijnTotem',
  meta: [
    { name: 'description', content: 'Voltooi je bestelling bij MijnTotem. Veilig en eenvoudig afrekenen voor je totem kledij.' }
  ]
})

const { cart, shippingOptions } = useCart()

// Form validation
const { 
  validateForm, 
  validateField, 
  touchField, 
  hasError, 
  getError, 
  shouldShowError, 
  clearErrors,
  isValid 
} = useFormValidation()

// Form data
const form = ref({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  newsletter: false,
  shippingAddress: {
    street: '',
    postal_code: '',
    city: '',
    country_code: '',
  },
  billingAddress: {
    street: '',
    postal_code: '',
    city: '',
    country_code: '',
  },
  sameAsBilling: true,
  deliveryOption: 'Bpost - Adres',
  acceptTerms: false
})

const isProcessing = ref(false)
const showErrors = ref(false)

// Delivery options
const deliveryOptions = [
  {
    id: 'Bpost - Pakjesautomaat',
    name: 'Bpost - Pakjesautomaat',
    description: 'Bezorging op werkdagen via Bpost Pakjesautomaat',
    timeframe: '1-2 werkdagen',
    price: 5.00
  },
  {
    id: 'Bpost - Adres',
    name: 'Bpost - Thuisbezorgd',
    description: 'Bezorging op werkdagen via Bpost Thuisbezorgd',
    timeframe: '1-3 werkdagen',
    price: 6.55
  }
]

const deliveryOption = computed(() => {
  return shippingOptions.value.find(opt => opt.name === form.value.deliveryOption)
})

// Computed values
const subtotal = computed(() => {
  return cart.value?.subtotal
})

const shippingCost = computed(() => {
  const option = deliveryOptions.find(opt => opt.id === form.value.deliveryOption)
  return option?.price || 0
})

const vat = computed(() => {
  return (subtotal.value + shippingCost.value) * 0.21
})

const total = computed(() => {
  return subtotal.value + shippingCost.value + vat.value
})

const canPlaceOrder = computed(() => {
  return form.value.email && 
         form.value.firstName && 
         form.value.lastName && 
         form.value.shippingAddress.street && 
         form.value.shippingAddress.postal_code && 
         form.value.shippingAddress.city && 
         form.value.shippingAddress.country_code &&
         form.value.deliveryOption && 
         !isProcessing.value
})

// Field update handlers with validation
const updateField = (field, value) => {
  form.value[field] = value
  validateField(field, value)
}

const updateShippingField = (field, value) => {
  form.value.shippingAddress[field] = value
  // Map field names for validation
  const validationField = field === 'postal_code' ? 'postalCode' : 
                         field === 'country_code' ? 'country' : field
  validateField(validationField, value)
}

const updateBillingField = (field, value) => {
  form.value.billingAddress[field] = value
  // Map field names for validation
  const validationField = field === 'postal_code' ? 'billingPostalCode' : 
                         field === 'country_code' ? 'billingCountry' : 
                         `billing${field.charAt(0).toUpperCase() + field.slice(1)}`
  validateField(validationField, value)
}

// Methods
const placeOrder = async () => {
  // Show errors and validate form
  showErrors.value = true
  
  // Mark all fields as touched for error display
  Object.keys(form.value).forEach(field => {
    if (typeof form.value[field] === 'object' && form.value[field] !== null) {
      Object.keys(form.value[field]).forEach(subField => {
        touchField(subField)
      })
    } else {
      touchField(field)
    }
  })
  
  // Validate form
  const isFormValid = validateForm(form.value)
  
  if (!isFormValid) {
    console.log('Form validation failed')
    return
  }
  
  isProcessing.value = true
  
  try {
    const response = await $fetch('/api/order', {
      method: 'POST',
      body: {
        cart_id: cart.value.id,
        email: form.value.email,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phone: form.value.phone,
        shippingAddress: form.value.shippingAddress,
        billingAddress: form.value.sameAsBilling ? form.value.shippingAddress : form.value.billingAddress,
        shippingMethod: deliveryOption.value.id,
      }
    })
    
    // Redirect to payment page
    await window.open(response.url, '_self')
  } catch (error) {
    console.error('Order failed:', error)
    // Handle error
  } finally {
    isProcessing.value = false
  }
}
</script>



<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <Navbar />
    
    <!-- Checkout Header -->
    <section class="px-5 py-6 md:px-20 bg-gray-10">
      <div class="max-w-6xl mx-auto">
        <!-- Breadcrumb -->
        <Breadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Collectie', to: '/collectie' }, { label: 'Afrekenen' }]" class="mb-6" />

        <!-- Progress Steps -->
        <div class="flex items-center justify-center mb-8">
          <div class="flex items-center gap-4 md:gap-8">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span class="text-sm font-medium text-gray-90 hidden md:block">Winkelwagen</span>
            </div>
            <div class="w-8 md:w-16 h-0.5 bg-primary"></div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span class="text-sm font-medium text-gray-90 hidden md:block">Afrekenen</span>
            </div>
            <div class="w-8 md:w-16 h-0.5 bg-gray-30"></div>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-30 text-gray-60 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span class="text-sm font-medium text-gray-60 hidden md:block">Bevestiging</span>
            </div>
          </div>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold text-gray-90 text-center mb-2">
          Afrekenen
        </h1>
        <p class="text-gray-60 text-center">
          Vul je gegevens in om je bestelling te voltooien
        </p>
      </div>
    </section>

    <!-- Checkout Form -->
    <section class="px-5 py-10 md:px-20">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="lg:col-span-2 space-y-8">
            <CheckoutContact
              :email="form.email"
              :firstName="form.firstName"
              :lastName="form.lastName"
              :phone="form.phone"
              :newsletter="form.newsletter"
              :errors="{ email: getError('email'), firstName: getError('firstName'), lastName: getError('lastName'), phone: getError('phone') }"
              :show-errors="showErrors"
              @update:email="v => updateField('email', v)"
              @update:firstName="v => updateField('firstName', v)"
              @update:lastName="v => updateField('lastName', v)"
              @update:phone="v => updateField('phone', v)"
              @update:newsletter="v => updateField('newsletter', v)"
              @touch:email="() => touchField('email')"
              @touch:firstName="() => touchField('firstName')"
              @touch:lastName="() => touchField('lastName')"
              @touch:phone="() => touchField('phone')"
            />
            <CheckoutAddress
              :address="form.shippingAddress.street"
              :postalCode="form.shippingAddress.postal_code"
              :city="form.shippingAddress.city"
              :country="form.shippingAddress.country_code"
              :sameAsBilling="form.sameAsBilling"
              :errors="{ street: getError('street'), postalCode: getError('postalCode'), city: getError('city'), country: getError('country') }"
              :show-errors="showErrors"
              @update:address="v => updateShippingField('street', v)"
              @update:postalCode="v => updateShippingField('postal_code', v)"
              @update:city="v => updateShippingField('city', v)"
              @update:country="v => updateShippingField('country_code', v)"
              @update:sameAsBilling="v => updateField('sameAsBilling', v)"
              @touch:address="() => { touchField('street'); validateField('street', form.shippingAddress.street) }"
              @touch:postalCode="() => { touchField('postalCode'); validateField('postalCode', form.shippingAddress.postal_code) }"
              @touch:city="() => { touchField('city'); validateField('city', form.shippingAddress.city) }"
              @touch:country="() => { touchField('country'); validateField('country', form.shippingAddress.country_code) }"
            />
            <CheckoutBillingAddress
              v-if="!form.sameAsBilling"
              :address="form.billingAddress.street"
              :postalCode="form.billingAddress.postal_code"
              :city="form.billingAddress.city"
              :country="form.billingAddress.country_code"
              :sameAsBilling="form.sameAsBilling"
              :errors="{ street: getError('billingStreet'), postalCode: getError('billingPostalCode'), city: getError('billingCity'), country: getError('billingCountry') }"
              :show-errors="showErrors"
              @update:address="v => updateBillingField('street', v)"
              @update:postalCode="v => updateBillingField('postal_code', v)"
              @update:city="v => updateBillingField('city', v)"
              @update:country="v => updateBillingField('country_code', v)"
              @update:notes="v => updateBillingField('notes', v)"
              @touch:address="() => touchField('billingStreet')"
              @touch:postalCode="() => touchField('billingPostalCode')"
              @touch:city="() => touchField('billingCity')"
              @touch:country="() => touchField('billingCountry')"
              @touch:notes="() => touchField('billingNotes')"
            />

            <CheckoutDelivery 
              :options="deliveryOptions" 
              :error="getError('deliveryOption')"
              :show-errors="showErrors"
              v-model="form.deliveryOption"
              @update:modelValue="v => { form.deliveryOption = v; if (showErrors) touchField('deliveryOption') }"
            />
          </div>
          <div class="lg:col-span-1">
            <OrderSummary :items="cartItems" :subtotal="subtotal" :shippingCost="shippingCost" :vat="vat" :total="total" :canPlace="canPlaceOrder" :processing="isProcessing" @place="placeOrder" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>