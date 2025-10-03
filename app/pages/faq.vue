<template>
  <section class="px-5 py-10 md:px-20 md:py-16">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <Breadcrumbs :items="[
        { label: 'Home', to: '/' },
        { label: 'FAQs' }
      ]" />

      <div class="text-center space-y-6 mb-16">
        <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
          <div class="w-4 h-4 bg-primary-50 rounded-full relative">
            <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
          </div>
          <span class="text-primary-50 font-medium">FAQs</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">Veelgestelde Vragen
        </h1>
        <p class="text-lg text-gray-60 max-w-2xl mx-auto">Vind hier antwoorden op de meest gestelde vragen over onze
          totem kledij, bestellingen en levering.</p>
      </div>

      <!-- FAQ Content -->
      <div class="py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <!-- Search Bar -->
            <div class="mb-12">
              <div class="relative">
                <input v-model="searchQuery" type="text" placeholder="Zoek in veelgestelde vragen..."
                  class="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-30 rounded-lg focus:border-primary-60 focus:outline-none transition-colors" />
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-60" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- FAQ Categories -->
            <div class="mb-8">
              <div class="flex flex-wrap gap-2">
                <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    selectedCategory === category.id
                      ? 'bg-primary-60 text-white'
                      : 'bg-gray-20 text-gray-80 hover:bg-gray-30'
                  ]">
                  {{ category.name }}
                </button>
              </div>
            </div>

            <!-- FAQ Items -->
            <div class="space-y-4">
              <div v-for="(faq, index) in filteredFAQs" :key="faq.id"
                class="faq-item bg-white rounded-lg border border-gray-30 overflow-hidden shadow-sm transition-all duration-300">
                <button @click="toggleFAQ(index)"
                  class="faq-button w-full px-6 py-5 text-left flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-90 pr-4">
                    {{ faq.question }}
                  </h3>
                  <svg :class="[
                    'arrow-icon w-6 h-6 text-primary-60 transition-all duration-300 ease-in-out flex-shrink-0 transform',
                    openFAQs.includes(index) ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div v-show="openFAQs.includes(index)"
                  class="accordion-content px-6 pb-5 text-gray-70 leading-relaxed overflow-hidden"
                  :class="openFAQs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
                  <div class="pt-2" v-html="faq.answer"></div>
                </div>
              </div>
            </div>

            <!-- No Results -->
            <div v-if="filteredFAQs.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 text-gray-40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-80 mb-2">Geen resultaten gevonden</h3>
              <p class="text-gray-60">Probeer een andere zoekterm of bekijk alle categorieën.</p>
            </div>

            <!-- Contact CTA -->
            <div class="mt-16 bg-primary-10 rounded-lg p-8 text-center">
              <h3 class="text-2xl font-bold text-primary-90 mb-4">
                Vind je het antwoord niet?
              </h3>
              <p class="text-primary-80 mb-6 max-w-2xl mx-auto">
                Ons team staat klaar om je te helpen met al je vragen over totem kledij en bestellingen.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink to="/contact"
                  class="inline-flex items-center px-6 py-3 bg-primary-60 text-white font-semibold rounded-lg hover:bg-primary-70 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contacteer ons
                </NuxtLink>
                <a href="tel:+32123456789"
                  class="inline-flex items-center px-6 py-3 border-2 border-primary-60 text-primary-60 font-semibold rounded-lg hover:bg-primary-60 hover:text-white transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Bel ons
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// Meta tags
useHead({
  title: 'Veelgestelde Vragen - MijnTotem',
  meta: [
    { name: 'description', content: 'Vind antwoorden op veelgestelde vragen over totem kledij, bestellingen, levering en meer bij MijnTotem.' }
  ]
})

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('all')
const openFAQs = ref<number[]>([])

// Categories
const categories = [
  { id: 'all', name: 'Alle vragen' },
  { id: 'product', name: 'Producten' },
  { id: 'order', name: 'Bestellingen' },
  { id: 'shipping', name: 'Levering' },
  { id: 'returns', name: 'Retourneren' },
  { id: 'customization', name: 'Personalizatie' }
]

// FAQ data
const faqs = [
  {
    id: 1,
    category: 'product',
    question: 'Welke materialen gebruiken jullie voor de kledij?',
    answer: 'We gebruiken alleen hoogwaardige, 100% ecologische materialen. Onze T-shirts zijn gemaakt van biologisch katoen en onze sweaters van een kombinatie van katoen en gerecycled polyester. Alle materialen zijn GOTS-gecertificeerd en geproduceerd met respect voor het milieu.'
  },
  {
    id: 2,
    category: 'customization',
    question: 'Hoe werkt de personalizatie van mijn totem kledij?',
    answer: 'Je kunt je totem kledij personaliseren! voor elk product kunnen we een tekst op de voorkant van de kledij zetten. Indien je toch nog iets anders wil, neem zeker contact met ons op, dan kunnen we kijken of we het voor je kunnen maken.'
  },
  {
    id: 3,
    category: 'order',
    question: 'Hoe lang duurt het voordat mijn bestelling klaar is?',
    answer: 'Alle bestellingen hebben 5-10 werkdagen nodig voor productie, dit omdat we elk product pas maken zodra je bestelling binnenkomt. Tijdens drukke periodes (zoals vlak voor kampen, kerst, etc.) kan dit iets langer duren.'
  },
  {
    id: 4,
    category: 'shipping',
    question: 'Wat zijn de verzendkosten?',
    answer: 'Verzending binnen België en Nederland kost €6,55 voor thuisbezorgd en €5,00 voor een bezorging in een pakjesautomaat of bpost punt.'
  },
  {
    id: 6,
    category: 'returns',
    question: 'Wat is jullie retourbeleid?',
    answer: 'Je hebt 14 dagen de tijd om je bestelling te retourneren. De kledij moet ongedragen en in originele staat zijn. Voor gepersonaliseerde items geldt een speciaal beleid - neem contact met ons op als je vragen hebt. We betalen de retourkosten terug na ontvangst van je retour.'
  },
  {
    id: 7,
    category: 'product',
    question: 'Welke maten hebben jullie beschikbaar?',
    answer: 'We hebben maten van XS tot 2XL beschikbaar. Onze kledij is unisex en we hebben een uitgebreide maattabel op onze website. Twijfel je over je maat? Neem contact met ons op, we helpen je graag bij het kiezen van de juiste maat.'
  },
  {
    id: 8,
    category: 'customization',
    question: 'Kan ik een proefdruk zien voordat mijn bestelling wordt geproduceerd?',
    answer: 'Ja, voor grote bestellingen (vanaf 10 stuks) kunnen we een digitale proefdruk maken.'
  },
  {
    id: 9,
    category: 'order',
    question: 'Kan ik mijn bestelling nog wijzigen na plaatsing?',
    answer: 'Bestellingen kunnen alleen worden gewijzigd als ze nog niet in productie zijn gegaan. Neem direct contact met ons op als je een wijziging wilt.'
  },
  {
    id: 10,
    category: 'product',
    question: 'Zijn jullie kledij geschikt voor outdoor activiteiten?',
    answer: 'Absoluut! Onze kledij is speciaal ontworpen voor scouts en gidsen. Het materiaal is duurzaam, ademend en geschikt voor alle outdoor activiteiten. De prints zijn wasbestendig en blijven mooi, zelfs na vele wasbeurten en outdoor avonturen.'
  },
  {
    id: 11,
    category: 'shipping',
    question: 'Leveren jullie ook buiten België en Nederland?',
    answer: 'Ja, we leveren naar alle landen in de Europese Unie. Voor landen buiten de EU kunnen we ook leveren, maar dit kan extra kosten en langere levertijden met zich meebrengen. Neem contact met ons op voor een offerte voor levering naar andere landen.'
  },
  {
    id: 12,
    category: 'customization',
    question: 'Kunnen jullie ook logo\'s van onze groep op de kledij zetten?',
    answer: 'Natuurlijk! We kunnen logo\'s, emblemen en andere groepsymbolen op je kledij plaatsen. We werken met verschillende technieken afhankelijk van het ontwerp. Stuur je logo op in hoge resolutie (minimaal 300 DPI) en we zorgen voor een professioneel resultaat.'
  }
]

// Computed properties
const filteredFAQs = computed(() => {
  let filtered = faqs

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const toggleFAQ = (index: number) => {
  const faqIndex = openFAQs.value.indexOf(index)
  if (faqIndex > -1) {
    openFAQs.value.splice(faqIndex, 1)
  } else {
    openFAQs.value.push(index)
  }
}
</script>

<style scoped>
/* Smooth accordion animations with better easing */
.accordion-content {
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects for better UX */
.faq-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth button hover transitions */
.faq-button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-button:hover {
  background-color: hsl(var(--gray-10));
  transform: translateX(2px);
}

/* Enhanced arrow animation */
.arrow-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow-icon:hover {
  color: hsl(var(--primary-70));
}
</style>