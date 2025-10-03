import { ref, computed } from 'vue'

export const useFormValidation = () => {
  const errors = ref({})
  const touched = ref({})

  // Validatie regels
  const rules = {
    email: (value) => {
      if (!value) return 'E-mailadres is verplicht'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) return 'Voer een geldig e-mailadres in'
      return null
    },
    firstName: (value) => {
      if (!value) return 'Voornaam is verplicht'
      if (value.length < 2) return 'Voornaam moet minimaal 2 karakters bevatten'
      return null
    },
    lastName: (value) => {
      if (!value) return 'Achternaam is verplicht'
      if (value.length < 2) return 'Achternaam moet minimaal 2 karakters bevatten'
      return null
    },
    phone: (value) => {
      if (value && value.length > 0) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
        if (!phoneRegex.test(value)) return 'Voer een geldig telefoonnummer in'
      }
      return null
    },
    street: (value) => {
      if (!value) return 'Straat en huisnummer is verplicht'
      if (value.length < 5) return 'Voer een volledig adres in'
      return null
    },
    postalCode: (value) => {
      if (!value) return 'Postcode is verplicht'
      const postalCodeRegex = /^[0-9]{4}$/
      if (!postalCodeRegex.test(value)) return 'Voer een geldige postcode in (4 cijfers)'
      return null
    },
    city: (value) => {
      if (!value) return 'Stad is verplicht'
      if (value.length < 2) return 'Stad moet minimaal 2 karakters bevatten'
      return null
    },
    country: (value) => {
      if (!value) return 'Land is verplicht'
      return null
    },
    deliveryOption: (value) => {
      if (!value) return 'Selecteer een leveringsoptie'
      return null
    }
  }

  // Valideer een specifiek veld
  const validateField = (field, value) => {
    const rule = rules[field]
    if (!rule) {
      console.log('No rule found for field:', field)
      return null
    }
    
    const error = rule(value)
    console.log('Validation result for', field, ':', error)
    if (error) {
      errors.value[field] = error
    } else {
      delete errors.value[field]
    }
    
    return error
  }

  // Valideer alle velden
  const validateForm = (formData) => {
    const newErrors = {}
    
    // Contact gegevens
    newErrors.email = rules.email(formData.email)
    newErrors.firstName = rules.firstName(formData.firstName)
    newErrors.lastName = rules.lastName(formData.lastName)
    newErrors.phone = rules.phone(formData.phone)
    
    // Leveringsadres
    newErrors.street = rules.street(formData.shippingAddress?.street)
    newErrors.postalCode = rules.postalCode(formData.shippingAddress?.postal_code)
    newErrors.city = rules.city(formData.shippingAddress?.city)
    newErrors.country = rules.country(formData.shippingAddress?.country_code)
    
    // Factuuradres (alleen als niet hetzelfde als leveringsadres)
    if (!formData.sameAsBilling) {
      newErrors.billingStreet = rules.street(formData.billingAddress?.street)
      newErrors.billingPostalCode = rules.postalCode(formData.billingAddress?.postal_code)
      newErrors.billingCity = rules.city(formData.billingAddress?.city)
      newErrors.billingCountry = rules.country(formData.billingAddress?.country_code)
    }
    
    // Leveringsoptie
    newErrors.deliveryOption = rules.deliveryOption(formData.deliveryOption)
    
    // Filter out null values
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key] === null) {
        delete newErrors[key]
      }
    })
    
    errors.value = newErrors
    return Object.keys(newErrors).length === 0
  }

  // Mark field as touched
  const touchField = (field) => {
    touched.value[field] = true
  }

  // Check if field has error
  const hasError = (field) => {
    return !!errors.value[field]
  }

  // Get error message for field
  const getError = (field) => {
    return errors.value[field] || null
  }

  // Check if field is touched
  const isTouched = (field) => {
    return !!touched.value[field]
  }

  // Check if field should show error
  const shouldShowError = (field) => {
    return isTouched(field) && hasError(field)
  }

  // Clear all errors
  const clearErrors = () => {
    errors.value = {}
    touched.value = {}
  }

  // Clear specific field error
  const clearFieldError = (field) => {
    delete errors.value[field]
    delete touched.value[field]
  }

  // Computed properties
  const hasErrors = computed(() => Object.keys(errors.value).length > 0)
  const isValid = computed(() => Object.keys(errors.value).length === 0)

  return {
    errors,
    touched,
    validateField,
    validateForm,
    touchField,
    hasError,
    getError,
    isTouched,
    shouldShowError,
    clearErrors,
    clearFieldError,
    hasErrors,
    isValid
  }
}
