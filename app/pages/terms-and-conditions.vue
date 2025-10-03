<template>  
    <section class="px-5 py-10 md:px-20 md:py-20 xl:max-w-screen-2xl mx-auto">
      <div class="max-w-5xl mx-auto">
        <div class="mb-8">
          <CommonBreadcrumbs :items="[
            { label: 'Home', to: '/' },
            { label: 'Algemene voorwaarden' }
          ]" />
        </div>

        <div class="text-center space-y-6 mb-10">
          <div class="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2">
            <div class="w-4 h-4 bg-primary-50 rounded-full relative">
              <div class="absolute inset-0 bg-primary-30/80 rounded-full blur-sm scale-150"></div>
            </div>
            <span class="text-primary-50 font-medium">Algemene voorwaarden</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-semibold text-gray-90 leading-tight tracking-tight">Algemene voorwaarden</h1>
        </div>

        <LegalTermsContent />
      </div>
    </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Algemene voorwaarden - MijnTotem',
  meta: [
    { name: 'description', content: 'Lees onze algemene voorwaarden zorgvuldig door voordat je een aankoop doet op onze website. Hier vind je informatie over betalingen, retourbeleid en meer.' }
  ]
})
</script>
