<template>
  <div class="min-h-screen bg-background">
    <Navbar />

    <section class="px-5 py-10 md:px-20 md:py-20">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <Breadcrumbs :items="[
            { label: 'Home', to: '/' },
            { label: 'Groepstruien' }
          ]" />
        </div>

        <div class="text-center space-y-6 mb-12">
          <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <div class="w-4 h-4 bg-primary-50 rounded-full relative">
              <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
            </div>
            <span class="text-primary-50 font-medium">Groepstruien</span>
          </div>
          <div class="space-y-4">
            <h1 class="text-3xl md:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">Groepstruien voor jouw vereniging</h1>
            <p class="text-lg text-gray-60 max-w-3xl mx-auto">Bestel comfortabele, duurzame truien met jullie totem of logo. Ideaal voor kamp, weekend of het hele jaar door. Heldere prijsstaffels, vlotte communicatie en snelle levering.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-90 mb-4">Waarom groepstruien bij MijnTotem?</h2>
              <ul class="list-disc pl-5 space-y-2 text-gray-70">
                <li>Zachte en stevige stoffen met hoogwaardige bedrukking.</li>
                <li>Ontwerp op maat met totem, logo, namen en afdelingen.</li>
                <li>Duidelijke maattabellen en advies voor een perfecte pasvorm.</li>
                <li>Prijsstaffels voor 10, 25 en 50+ stuks.</li>
                <li>Transparante levertermijnen en betrouwbare verzending.</li>
              </ul>
            </div>

            <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-90 mb-4">Praktische info</h2>
              <div class="grid sm:grid-cols-2 gap-6 text-gray-70">
                <div>
                  <h3 class="font-semibold text-gray-80 mb-2">Levertijd</h3>
                  <p>Meestal 10-15 werkdagen na goedkeuring van het ontwerp.</p>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-80 mb-2">Maten</h3>
                  <p>Van kindermaten tot volwassenen. Pakket met pasmaten op aanvraag.</p>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-80 mb-2">Duurzaamheid</h3>
                  <p>We kiezen voor kwaliteitsvolle, comfortabele stoffen en duurzame prints.</p>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-80 mb-2">Ontwerp</h3>
                  <p>Upload je totem of logo. Je ontvangt altijd een digitale proef ter goedkeuring.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm h-fit">
            <h2 class="text-xl font-semibold text-gray-90 mb-4">Offerte aanvragen</h2>
            <p class="text-gray-70 mb-6">Vertel ons over jullie groep (aantal, maten, kleur, ontwerp). We reageren binnen 1 werkdag met een voorstel op maat.</p>
            <div class="space-y-4">
              <NuxtLink to="/contact" class="block text-center bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-70 transition-colors">Neem contact op</NuxtLink>
              <a href="mailto:hello@thrillizadventures.com?subject=Offerte%20groepstruien" class="block text-center border border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-accent transition-colors">Mail ons</a>
            </div>
            <p class="text-xs text-gray-60 mt-4">Liever telefonisch? Bel ons op (123) 456-7890</p>
          </div>
        </div>

        <!-- Ontwerp inspiratie en interactieve kleurkeuze -->
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-12">
          <div class="flex items-start justify-between gap-8 flex-col lg:flex-row">
            <div class="flex-1 space-y-4">
              <div class="inline-flex items-center gap-2 bg-accent rounded-full px-3 py-1.5">
                <Sparkles class="w-4 h-4 text-primary" />
                <span class="text-sm text-gray-80">Ontwerp inspiratie</span>
              </div>
              <h2 class="text-xl md:text-2xl font-semibold text-gray-90">Kies je kleur en bekijk de look</h2>
              <p class="text-gray-70">Speel met kleuren en ontdek welke stijl bij jullie groep past. Het logo of totem komt als hoogwaardige print op de borst.</p>

              <div class="flex flex-wrap gap-3 pt-2">
                <button
                  v-for="c in colors"
                  :key="c.name"
                  class="w-9 h-9 rounded-full border-2 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
                  :class="selectedColor === c ? 'border-primary' : 'border-gray-20'"
                  :style="{ backgroundColor: c.value }"
                  @click="selectedColor = c"
                  :aria-label="`Kies kleur ${c.name}`"
                />
              </div>
            </div>

            <div class="flex-1">
              <div class="relative h-64 md:h-72 lg:h-80">
                <!-- Decoratieve achtergrond -->
                <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-90 to-primary-70"></div>
                <div class="absolute inset-0 rounded-2xl" style="background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 12px 12px;"></div>

                <!-- Hoodie preview -->
                <div class="absolute inset-0 flex items-center justify-center p-6">
                  <div class="relative w-full max-w-sm h-full flex items-center justify-center">
                    <!-- Body -->
                    <div class="w-60 h-44 md:w-72 md:h-52 rounded-3xl shadow-xl border border-black/5" :style="{ backgroundColor: selectedColor.value }"></div>
                    <!-- Hood -->
                    <div class="absolute -top-2 md:-top-3 w-24 h-16 md:w-28 md:h-20 rounded-b-full shadow border border-black/5" :style="{ backgroundColor: selectedColor.value }"></div>
                    <!-- Print area -->
                    <div class="absolute top-10 md:top-12 w-28 h-16 md:w-32 md:h-20 bg-white/90 border border-black/10 rounded-xl flex items-center justify-center">
                      <span class="text-sm font-semibold text-gray-80">TOTEM</span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-60 mt-3">De kleuren zijn indicatief. Kleurtinten kunnen licht afwijken in productie.</p>
            </div>
          </div>
        </div>

        <!-- Voorbeelden -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div class="relative rounded-2xl overflow-hidden group">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/hoodie1?width=800" alt="Voorbeeld hoodie in bosgroen" class="w-full h-56 object-cover group-hover:scale-105 transition" />
            <div class="absolute bottom-3 left-3 bg-white/90 text-gray-90 px-3 py-1 rounded-full text-sm font-medium">Bosgroen</div>
          </div>
          <div class="relative rounded-2xl overflow-hidden group">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/hoodie2?width=800" alt="Voorbeeld hoodie in nachtblauw" class="w-full h-56 object-cover group-hover:scale-105 transition" />
            <div class="absolute bottom-3 left-3 bg-white/90 text-gray-90 px-3 py-1 rounded-full text-sm font-medium">Nachtblauw</div>
          </div>
          <div class="relative rounded-2xl overflow-hidden group">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/hoodie3?width=800" alt="Voorbeeld hoodie in bordeaux" class="w-full h-56 object-cover group-hover:scale-105 transition" />
            <div class="absolute bottom-3 left-3 bg-white/90 text-gray-90 px-3 py-1 rounded-full text-sm font-medium">Bordeaux</div>
          </div>
        </div>

        <div class="bg-accent rounded-2xl p-6 md:p-8">
          <h2 class="text-xl md:text-2xl font-semibold text-gray-90 mb-4">Zo gaan we te werk</h2>
          <div class="grid md:grid-cols-4 gap-6 text-gray-80">
            <div>
              <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mb-2">1</div>
              <p>Aanvraag en info verzamelen</p>
            </div>
            <div>
              <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mb-2">2</div>
              <p>Ontwerp & digitale proef</p>
            </div>
            <div>
              <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mb-2">3</div>
              <p>Productie na akkoord</p>
            </div>
            <div>
              <div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold mb-2">4</div>
              <p>Verzending & levering</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Groepstruien - MijnTotem',
  meta: [
    { name: 'description', content: 'Groepstruien op maat voor scouts en gidsen. Duidelijke prijsstaffels, snelle levering en hulp bij ontwerp en maten.' }
  ]
})

import { ref } from 'vue'
import { Palette, Sparkles } from 'lucide-vue-next'

const colors = [
  { name: 'Bosgroen', value: '#1f8a5b' },
  { name: 'Nachtblauw', value: '#0f2557' },
  { name: 'Bordeaux', value: '#7a1f2b' },
  { name: 'Antraciet', value: '#2b2b2b' },
  { name: 'Zand', value: '#d7c4a3' },
  { name: 'Oceaan', value: '#1f5b8a' }
]

const selectedColor = ref(colors[0])
</script>
