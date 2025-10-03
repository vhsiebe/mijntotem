<template>
  <section class="px-5 py-10 md:px-20 md:py-16">
    <div class="max-w-6xl mx-auto">
      <div class="mb-8">
        <Breadcrumbs :items="[
          { label: 'Home', to: '/' },
          { label: 'Over ons' }
        ]" />
      </div>

      <div class="text-center space-y-6 mb-16">
        <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
          <div class="w-4 h-4 bg-primary-50 rounded-full relative">
            <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
          </div>
          <span class="text-primary-50 font-medium">Over ons</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">Over MijnTotem</h1>
        <p class="text-lg text-gray-60 max-w-2xl mx-auto">Van hobby in textielbedrukking naar hét adres voor totemkledij.</p>
      </div>

      <!-- Intro sectie -->
      <div class="mb-16">
        <div class="bg-primary-10 rounded-3xl p-8 md:p-12 text-center">
          <p class="text-lg md:text-xl text-gray-70 leading-relaxed max-w-4xl mx-auto">
            Wat begon als een creatieve hobby, groeide uit tot een uniek bedrijf dat zich volledig richt op kledij voor scouts en gidsen. 
            Bij MijnTotem draait alles rond <span class="font-semibold text-primary-70">trots</span>, 
            <span class="font-semibold text-primary-70">verbondenheid</span> en de 
            <span class="font-semibold text-primary-70">traditie van totems</span>.
          </p>
        </div>
      </div>

      <!-- Hoe het begon sectie -->
      <div class="mb-16">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-90">Hoe het begon</h2>
            <div class="space-y-4 text-gray-70 leading-relaxed">
              <p>
                Ik ben <span class="font-semibold text-primary-70">Siebe</span>, oprichter van MijnTotem. 
                Jarenlang was ik gefascineerd door textielbedrukking. Wat voor mij begon als een experiment 
                met ontwerpen en drukken, groeide al snel uit tot een passie.
              </p>
              <p>
                Toen ik zag hoe groot de betekenis van een totem is binnen de scouts­beweging, een symbool 
                dat trots en identiteit uitstraalt, wist ik dat ik daar iets mee wilde doen. Zo ontstond MijnTotem.
              </p>
            </div>
          </div>
          <div class="bg-primary-20 rounded-2xl p-8 text-center">
            <div class="w-16 h-16 bg-primary-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette class="w-8 h-8 text-primary-70" />
            </div>
            <h3 class="text-xl font-semibold text-gray-90 mb-2">Creatieve passie</h3>
            <p class="text-gray-60">Van experiment tot professionele textielbedrukking</p>
          </div>
        </div>
      </div>

      <!-- Trots op je totem sectie -->
      <div class="mb-16">
        <div class="bg-white rounded-2xl p-8 md:p-12 border border-gray-20">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-secondary-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award class="w-8 h-8 text-secondary-70" />
            </div>
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-90 mb-4">Trots op je totem</h2>
          </div>
          <div class="max-w-3xl mx-auto text-center space-y-4 text-gray-70 leading-relaxed">
            <p>
              Een totem is meer dan alleen een naam. Het is een <span class="font-semibold text-primary-70">verhaal</span>, 
              een <span class="font-semibold text-primary-70">erkenning</span> en een symbool van 
              <span class="font-semibold text-primary-70">vriendschap en avontuur</span>. 
              Scouts dragen hun totem met fierheid, en die fierheid mag zichtbaar zijn.
            </p>
            <p>
              Daarom ontwerpen en drukken wij kledingstukken waarop jouw totem centraal staat. 
              Zo kan je die trots ook tonen op kamp, in het lokaal of gewoon onderweg.
            </p>
          </div>
        </div>
      </div>

      <!-- Wat ons uniek maakt sectie -->
      <div class="mb-16">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-90 text-center mb-12">Wat ons uniek maakt</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 border border-gray-20 text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-primary-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Palette class="w-6 h-6 text-primary-70" />
            </div>
            <h3 class="font-semibold text-gray-90 mb-2">Eigen ontwerpen</h3>
            <p class="text-sm text-gray-60">Elke totem is zorgvuldig uitgewerkt en geïllustreerd</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-20 text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-primary-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shirt class="w-6 h-6 text-primary-70" />
            </div>
            <h3 class="font-semibold text-gray-90 mb-2">Unieke kledij</h3>
            <p class="text-sm text-gray-60">Truien, T-shirts en sweaters die perfect passen bij jou of je groep</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-20 text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-primary-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf class="w-6 h-6 text-primary-70" />
            </div>
            <h3 class="font-semibold text-gray-90 mb-2">Duurzaam & ecologisch</h3>
            <p class="text-sm text-gray-60">Milieuvriendelijke materialen en verantwoorde productie</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-20 text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-primary-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star class="w-6 h-6 text-primary-70" />
            </div>
            <h3 class="font-semibold text-gray-90 mb-2">Enig in Vlaanderen</h3>
            <p class="text-sm text-gray-60">Het enige bedrijf dat kledij met totems aanbiedt</p>
          </div>
        </div>
      </div>

      <!-- Visie en missie sectie -->
      <div class="mb-16">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-primary-10 rounded-2xl p-8">
            <h3 class="text-xl font-semibold text-gray-90 mb-4 flex items-center gap-3">
              <div class="w-8 h-8 bg-primary-30 rounded-full flex items-center justify-center">
                <Eye class="w-4 h-4 text-primary-70" />
              </div>
              Onze visie
            </h3>
            <p class="text-gray-70 leading-relaxed">
              Wij geloven dat elke scout zijn of haar totem met trots moet kunnen dragen, 
              niet alleen tijdens activiteiten, maar ook daarbuiten.
            </p>
          </div>
          <div class="bg-primary-10 rounded-2xl p-8">
            <h3 class="text-xl font-semibold text-gray-90 mb-4 flex items-center gap-3">
              <div class="w-8 h-8 bg-primary-30 rounded-full flex items-center justify-center">
                <Target class="w-4 h-4 text-primary-70" />
              </div>
              Onze missie
            </h3>
            <p class="text-gray-70 leading-relaxed">
              Wij maken totems tastbaar in duurzame en ecologische kleding, zodat verbondenheid 
              en traditie zichtbaar blijven voor iedereen.
            </p>
          </div>
        </div>
      </div>

      <!-- Call to action sectie -->
      <div class="bg-primary-50 rounded-3xl p-8 md:p-12 text-center">
        <h2 class="text-2xl md:text-3xl font-semibold text-white mb-6">Klaar voor jullie groepstruien?</h2>
        <div class="max-w-3xl mx-auto space-y-6">
          <p class="text-lg text-white leading-relaxed">
            Bij MijnTotem helpen we scouts­groepen om hun groepsidentiteit te versterken met unieke truien en T-shirts. 
            Of het nu voor de hele leidingsploeg is, voor een jubileum of gewoon voor het kamp: 
            wij zorgen voor kleding die past bij jullie verhaal.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink 
              to="/contact" 
              class="bg-primary-70 hover:bg-primary-80 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
            >
              <ArrowRight class="w-4 h-4" />
              Vraag vrijblijvend jullie groepstruien aan
            </NuxtLink>
            <p class="text-sm text-white">en draag je totem met trots</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Palette, Award, Shirt, Leaf, Star, Eye, Target, ArrowRight } from 'lucide-vue-next'

useHead({
  title: 'Over ons - MijnTotem',
  meta: [
    { name: 'description', content: 'Lees het verhaal achter MijnTotem. Onze missie, visie en waarden voor kwaliteitsvolle totemkledij en avontuurlijke ervaringen.' }
  ]
})
</script>
