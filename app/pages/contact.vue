
<script setup>
import { ref, reactive, computed } from 'vue'
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-vue-next'

useHead({
  title: 'Contact - MijnTotem',
  meta: [
    { name: 'description', content: 'Neem contact op met MijnTotem voor vragen over bestellingen, maatwerk en de collectie. We reageren binnen één werkdag.' }
  ]
})

const contactEmail = 'siebe@mijntotem.be'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false
})

const errors = reactive({
  name: null,
  email: null,
  subject: null,
  message: null,
  consent: null
})

const loading = ref(false)
const success = ref(false)

const mailtoHref = computed(() => {
  const params = new URLSearchParams()
  if (form.subject) params.set('subject', form.subject)
  const body = [form.name && `Naam: ${form.name}`, form.message].filter(Boolean).join('\n\n')
  if (body) params.set('body', body)
  const qs = params.toString()
  return `mailto:${contactEmail}${qs ? `?${qs}` : ''}`
})

function validate() {
  errors.name = form.name ? null : 'Vul je naam in.'
  errors.email = /.+@.+\..+/.test(form.email) ? null : 'Vul een geldig e-mailadres in.'
  errors.subject = form.subject ? null : 'Vul een onderwerp in.'
  errors.message = form.message && form.message.length >= 10 ? null : 'Schrijf minimaal 10 tekens.'
  errors.consent = form.consent ? null : 'Je moet akkoord gaan om te verzenden.'
  return !Object.values(errors).some(Boolean)
}

async function onSubmit() {
  success.value = false
  if (!validate()) return
  try {
    loading.value = true
    await $fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
    })
    success.value = true
    Object.assign(form, { name: '', email: '', subject: '', message: '', consent: false })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />

    <section class="px-5 py-10 md:px-20 md:py-20">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <Breadcrumbs :items="[
            { label: 'Home', to: '/' },
            { label: 'Contact' }
          ]" />
        </div>

        <div class="text-center space-y-6 mb-12">
          <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <div class="w-4 h-4 bg-primary-50 rounded-full relative">
              <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
            </div>
            <span class="text-primary-50 font-medium">Contact</span>
          </div>
          <div class="space-y-4">
            <h1 class="text-3xl md:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">Neem contact met ons op</h1>
            <p class="text-lg text-gray-60 max-w-2xl mx-auto">Vragen over een bestelling, maatwerk of de collectie? Stuur ons een bericht en we reageren doorgaans binnen 1 werkdag.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Contact form -->
          <div class="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <form @submit.prevent="onSubmit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-80 mb-2">Naam</label>
                  <input id="name" v-model.trim="form.name" type="text" class="w-full rounded-xl border border-gray-30 bg-gray-10 px-4 py-3 outline-none focus:ring-2 focus:ring-primary" autocomplete="name" />
                  <p v-if="errors.name" class="text-sm text-red-600 mt-2">{{ errors.name }}</p>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-80 mb-2">E-mail</label>
                  <input id="email" v-model.trim="form.email" type="email" class="w-full rounded-xl border border-gray-30 bg-gray-10 px-4 py-3 outline-none focus:ring-2 focus:ring-primary" autocomplete="email" />
                  <p v-if="errors.email" class="text-sm text-red-600 mt-2">{{ errors.email }}</p>
                </div>
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-80 mb-2">Onderwerp</label>
                <input id="subject" v-model.trim="form.subject" type="text" class="w-full rounded-xl border border-gray-30 bg-gray-10 px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
                <p v-if="errors.subject" class="text-sm text-red-600 mt-2">{{ errors.subject }}</p>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-80 mb-2">Bericht</label>
                <textarea id="message" v-model.trim="form.message" rows="6" class="w-full rounded-xl border border-gray-30 bg-gray-10 px-4 py-3 outline-none focus:ring-2 focus:ring-primary"></textarea>
                <p v-if="errors.message" class="text-sm text-red-600 mt-2">{{ errors.message }}</p>
              </div>

              <div class="flex items-start gap-3">
                <input id="consent" v-model="form.consent" type="checkbox" class="mt-1 h-5 w-5 rounded border-gray-30 text-primary focus:ring-primary" />
                <label for="consent" class="text-sm text-gray-70">Ik ga akkoord met de verwerking van mijn gegevens zoals beschreven in het <NuxtLink to="/privacy" class="text-primary hover:underline">privacybeleid</NuxtLink>.</label>
              </div>
              <p v-if="errors.consent" class="text-sm text-red-600">{{ errors.consent }}</p>

              <div class="flex items-end justify-end gap-4">
                <button type="submit" :disabled="loading" class="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-primary-70 transition-colors disabled:opacity-70">
                  <span v-if="!loading">Verzenden</span>
                  <span v-else>Verzenden…</span>
                  <Send class="w-5 h-5" />
                </button>
              </div>

              <div v-if="success" class="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <CheckCircle class="w-5 h-5" />
                <span>Bedankt! Je bericht is verzonden. We nemen snel contact met je op.</span>
              </div>
            </form>
          </div>

          <!-- Contact details -->
          <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6 h-fit">
            <h2 class="text-xl font-semibold text-gray-90">Contactgegevens</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-3 text-gray-70">
                <Phone class="w-5 h-5 text-primary" />
                <span>(+32) 471 46 83 06</span>
              </div>
              <div class="flex items-center gap-3 text-gray-70">
                <Mail class="w-5 h-5 text-primary" />
                <a :href="`mailto:${contactEmail}`" class="hover:underline">{{ contactEmail }}</a>
              </div>
              <div class="flex items-start gap-3 text-gray-70">
                <MapPin class="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p>F. Timmermansstraat 4</p>
                  <p>3191 Hever</p>
                  <a href="https://maps.google.com/?q=F.%20Timmermansstraat%204%203191%20Hever" target="_blank" rel="noopener" class="text-primary hover:underline text-sm">Routebeschrijving</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>