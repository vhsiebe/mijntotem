<template>
    <div>
        <Breadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Bevestiging' }]" class="mb-6" />
        <section class="user-dashboard-section mt-12 section-b-space">
            <section class="px-5 py-16 md:px-20 md:py-24">
      <div class="max-w-2xl mx-auto text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle class="w-12 h-12 text-green-600" />
        </div>

        <!-- Success Message -->
        <div class="space-y-6 mb-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-90">
            Bestelling succesvol geplaatst! 🎉
          </h1>
          <p class="text-lg text-gray-60">
            Bedankt voor je bestelling bij MijnTotem. We hebben je bestelling ontvangen en beginnen direct met de verwerking.
          </p>
        </div>

        <!-- What's Next -->
        <div class="bg-accent rounded-2xl p-6 md:p-8 mb-8">
          <h3 class="text-xl font-semibold text-gray-90 mb-4">Wat gebeurt er nu?</h3>
          <div class="space-y-4 text-left">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 class="font-medium text-gray-90">Bevestigingsmail</h4>
                <p class="text-sm text-gray-60">Je ontvangt binnen enkele minuten een bevestigingsmail met alle details.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 class="font-medium text-gray-90">Productie</h4>
                <p class="text-sm text-gray-60">We beginnen direct met het bedrukken van je unieke totem kledij.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 class="font-medium text-gray-90">Verzending</h4>
                <p class="text-sm text-gray-60">Je bestelling wordt binnen 5-10 werkdagen verzonden met trackingcode.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/collectie"
            class="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary-70 transition-colors"
          >
            Verder winkelen
          </NuxtLink>
        </div>

        <!-- Support -->
        <div class="mt-12 pt-8 border-t border-gray-20">
          <p class="text-gray-60 mb-4">
            Heb je vragen over je bestelling?
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:support@mijntotem.be"
              class="flex items-center gap-2 text-primary hover:underline"
            >
              <Mail class="w-4 h-4" />
              siebe@mijntotem.be
            </a>
            <a 
              href="tel:+32471468306"
              class="flex items-center gap-2 text-primary hover:underline"
            >
              <Phone class="w-4 h-4" />
              +32 471 46 83 06
            </a>
          </div>
        </div>
      </div>
    </section>

    </section>
    </div>
</template>

<script setup>
import { CheckCircle, Mail, Phone } from 'lucide-vue-next'
const { order, completeCheckout } = useCart()

completeCheckout()

useHead({
  title: 'Bestelling Bevestigd - MijnTotem',
  meta: [
    { name: 'description', content: 'Je bestelling is succesvol geplaatst bij MijnTotem. Bedankt voor je vertrouwen!' }
  ]
})

</script>

<style lang="scss" scoped></style>