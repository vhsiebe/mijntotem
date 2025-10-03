<template>
  <footer class="bg-primary px-5 pt-10 md:px-20 md:pt-20">
    <!-- Main Footer Content -->
    <div class="border-t border-primary-50 pt-10 pb-10 md:pb-20 lg:max-w-screen-2xl mx-auto">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
        <!-- Company Info -->
        <div class="w-full lg:w-[440px] space-y-8">
          <!-- Logo -->
          <div class="flex items-center h-12 gap-4">
            <div class="h-12 rounded-lg mr-5 flex items-center justify-center">
              <img src="/logo-white.svg" alt="MijnTotem Logo" class="h-12 w-auto fill-background" />
            </div>
          </div>

          <!-- Description -->
          <p class="text-white leading-relaxed">
            Wil je op de hoogte blijven van onze nieuwe collecties, aanbiedingen en acties? Schrijf je dan in voor onze nieuwsbrief!
          </p>

          <!-- Newsletter Signup -->
          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <input
                v-model="email"
                type="email"
                placeholder="Type je email"
                :class="[
                  'flex-1 bg-gray-30 text-gray-90 placeholder:text-gray-50 px-6 py-3 md:py-4 rounded-full outline-none transition-colors',
                  emailError ? 'border-2 border-red-500' : 'border-2 border-transparent'
                ]"
                @keyup.enter="subscribe"
              />
              <button 
                @click="subscribe" 
                :disabled="isSubmitting"
                class="bg-background text-primary px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-gray-20 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Bezig...</span>
                <span v-else>Schrijf je in</span>
              </button>
            </div>
            
            <!-- Error Message -->
            <div v-if="emailError" class="text-red-400 text-sm">
              {{ emailError }}
            </div>
            
            <!-- Success Message -->
            <div v-if="successMessage" class="text-green-400 text-sm">
              {{ successMessage }}
            </div>
          </div>
        </div>

        <!-- Footer Links -->
        <div class="flex flex-wrap gap-8 lg:gap-32">
          <!-- Navigation -->
          <div class="space-y-6 md:space-y-8">
            <h3 class="text-xl md:text-2xl font-semibold text-gray-30">Navigatie</h3>
            <div class="space-y-3 md:space-y-4">
              <NuxtLink to="/over-ons" class="block text-gray-30 hover:text-white transition-colors">
                Over ons
              </NuxtLink>
              <NuxtLink to="/faq" class="block text-gray-30 hover:text-white transition-colors">
                FAQ
              </NuxtLink>
              <NuxtLink to="/contact" class="block text-gray-30 hover:text-white transition-colors">
                Contact
              </NuxtLink>
              <NuxtLink to="/groepstruien" class="block text-gray-30 hover:text-white transition-colors">
                Groepstruien
              </NuxtLink>
            </div>
          </div>

          <!-- Social Media -->
          <div class="space-y-6 md:space-y-8">
            <h3 class="text-xl md:text-2xl font-semibold text-gray-30">Sociale media</h3>
            <div class="space-y-3 md:space-y-4">
              <a href="#" class="block text-gray-30 hover:text-white transition-colors flex items-center gap-2">
                <Instagram class="w-5 h-5 md:w-6 md:h-6 text-gray-30 flex-shrink-0" />
                Instagram
              </a>
              <a href="#" class="block text-gray-30 hover:text-white transition-colors flex items-center gap-2">
                <Facebook class="w-5 h-5 md:w-6 md:h-6 text-gray-30 flex-shrink-0" />
                Facebook
              </a>
              <a href="#" class="block text-gray-30 hover:text-white transition-colors flex items-center gap-2">
                <Twitter class="w-5 h-5 md:w-6 md:h-6 text-gray-30 flex-shrink-0" />
                Twitter
              </a>
              <a href="#" class="block text-gray-30 hover:text-white transition-colors flex items-center gap-2">
                <Linkedin class="w-5 h-5 md:w-6 md:h-6 text-gray-30 flex-shrink-0" />
                Linkedin
              </a>
            </div>
          </div>

          <!-- Contact -->
          <div class="w-full sm:w-auto lg:w-[201px] space-y-6 md:space-y-8">
            <h3 class="text-xl md:text-2xl font-semibold text-gray-30">Contacteer ons</h3>
            <div class="space-y-4 md:space-y-6">
              <!-- Phone -->
              <div class="flex items-center gap-3">
                <Phone class="w-5 h-5 md:w-6 md:h-6 text-gray-30 flex-shrink-0" />
                <span class="text-sm text-gray-30">(+32) 471 46 83 06</span>
              </div>

              <!-- Email -->
              <div class="flex items-center gap-3">
                <Mail class="w-5 h-5 md:w-6 md:h-6 text-gray-30 flex-shrink-0" />
                <span class="text-sm text-gray-30 break-all">siebe@mijntotem.be</span>
              </div>

              <!-- Address -->
              <div class="flex items-start gap-3">
                <MapPin class="w-5 h-5 md:w-6 md:h-6 text-gray-30 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-30 leading-relaxed">
                  F. Timmermansstraat 4, 3191 Hever
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="space-y-4">
      <!-- Legal Links -->
      <div class="flex flex-wrap justify-center items-center gap-6 md:gap-20 py-2">
        <NuxtLink to="/privacy" class="text-gray-30 hover:text-white transition-colors text-sm">
          Privacybeleid
        </NuxtLink>
        <NuxtLink to="/terms-and-conditions" class="text-gray-30 hover:text-white transition-colors text-sm">
          Algemene voorwaarden 
        </NuxtLink>
        <NuxtLink to="/contact" class="text-gray-30 hover:text-white transition-colors text-sm">
          Contact
        </NuxtLink>
      </div>

      <!-- Copyright -->
      <div class="border-t border-primary-50 py-6">
        <p class="text-center text-sm text-white">
          © 2025 MijnTotem | Alle rechten voorbehouden | Gemaakt door Siebe
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, Copyright } from 'lucide-vue-next'
import { ref } from 'vue'

const email = ref('')
const emailError = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const subscribe = async () => {
  // Reset messages
  emailError.value = ''
  successMessage.value = ''

  // Validate email
  if (!email.value) {
    emailError.value = 'Voer een emailadres in'
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = 'Voer een geldig emailadres in'
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: email.value }
    })

    successMessage.value = 'Bedankt! Je bent succesvol ingeschreven voor onze nieuwsbrief.'
    email.value = '' // Clear the input

    // Clear success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    emailError.value = 'Er is een fout opgetreden. Probeer het later opnieuw.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
