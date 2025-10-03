<script setup>
import { ref } from 'vue'
import Breadcrumbs from '../../components/common/Breadcrumbs.vue'
import ProductGallery from '../../components/products/ProductGallery.vue'
import ProductPurchasePanel from '../../components/products/ProductPurchasePanel.vue'
import { useCart } from '../../composables/useCart'
import { useToast } from '../../composables/useToast'
import { Check, Leaf, Shirt, Weight, Thermometer, WashingMachine, Truck, CreditCard } from 'lucide-vue-next'
// Get the slug from the route
const route = useRoute()

const { addItemToCart } = useCart()
const { addToast } = useToast()
const productHandle = computed(() => route.params.slug)

const { data, error } = await useFetch(`/api/products/${productHandle.value}`, {
  key: `product-${productHandle.value}`,
})

const product = computed(() => data.value?.product)
const relatedProducts = computed(() => data.value?.relatedProducts)

const defaultFrontName = computed(() => {
  return productHandle.value.replace(/-.*/i, '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
})

// Reactive data
const selectedImage = ref(null)
const productModel = ref({
  selectedSize: null,
  selectedColor: null,
  quantity: 1,
  frontName: defaultFrontName.value
})

const sizes = computed(() => {
  return product.value?.sizes || []
})

const colors = computed(() => {
  return product.value?.colors || []
})

// Function to get the appropriate icon for each feature
const getFeatureIcon = (title) => {
  const iconMap = {
    'Materiaal': Shirt,
    'Gewicht': Weight,
    'Wasvoorschrift': WashingMachine,
    'Temperatuur': Thermometer,
    'Duurzaamheid': Leaf,
    'Levering': Truck,
    'Veilig betalen': CreditCard, 
  }
  
  // Find matching icon by checking if title contains any of the keywords
  for (const [keyword, icon] of Object.entries(iconMap)) {
    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      return icon
    }
  }
  
  // Default icon if no match found
  return Check
}

// Initialize selections when product data is available
watch(() =>product, (newProduct) => {
  if (newProduct) {
    // Initialize with first available options
    selectedImage.value = newProduct.images?.[0] || null
    productModel.value.selectedColor = colors.value?.[0] || null
    productModel.value.selectedSize = sizes.value?.[0] || null
  }
}, { immediate: true })

// Watch for color changes to update the selected image
watch(() => productModel.value.selectedColor, (newColor) => {
  if (newColor) {
    const matchingImages = product.value.imagesPerColors?.[newColor]

    selectedImage.value = matchingImages || product.value.images?.[0]
  }
}, { immediate: true, deep: true })

// Meta tags
useHead({
  title: `${product.value?.title} - MijnTotem`,
  meta: [
    { name: 'description', content: product.value?.description }
  ]
})

// Since we don't have variants, we'll create a simple object with the selected options
const selectedVariation = computed(() => {
  return product.value?.variants.find(variant => variant.options.some(option => option.option.title === 'kleur' && option.value === productModel.value.selectedColor) && variant.options.some(option => option.option.title === 'maat' && option.value === productModel.value.selectedSize))
})


// Methods
const addToCart = async () => {
  if (!selectedVariation.value) {
    addToast({
      type: 'warning',
      title: 'Maat vereist',
      message: 'Selecteer eerst een maat voordat je het product toevoegt.'
    })
    return
  }

  if (!selectedVariation.value.options.some(option => option.option.title === 'kleur' && option.value === productModel.value.selectedColor)) {
    addToast({
      type: 'warning',
      title: 'Kleur vereist',
      message: 'Selecteer eerst een kleur voordat je het product toevoegt.'
    })
    return
  }
  
  try {
    // Add item to cart with correct data structure
    await addItemToCart({
      variant: selectedVariation.value,
      product: product.value,
      quantity: productModel.value.quantity,
      metadata: {
        frontName: productModel.value.frontName,
        size: productModel.value.selectedSize,
        color: productModel.value.selectedColor,
      }
    })
    
    // Show success toast
    addToast({
      type: 'success',
      title: 'Toegevoegd!',
      message: `${product.value.title} is toegevoegd aan je winkelwagen.`
    })
  } catch (error) {
    // Show error toast
    addToast({
      type: 'error',
      title: 'Fout',
      message: 'Er is iets misgegaan. Probeer het opnieuw.'
    })
  }
}

useHead({
  title: `${product.value?.title} - MijnTotem`,
  meta: [
    { name: 'description', content: product.value?.description }
  ]
})
</script>

<template>
  <!-- Loading State -->
  <div v-if="!product" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p class="text-gray-60">Product laden...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-90 mb-4">Product niet gevonden</h1>
      <p class="text-gray-60 mb-6">Het product dat je zoekt bestaat niet of is niet meer beschikbaar.</p>
      <NuxtLink to="/collectie"
        class="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-70 transition-colors">
        Terug naar collectie
      </NuxtLink>
    </div>
  </div>

  <!-- Product Not Found -->
  <div v-else-if="!product" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-90 mb-4">Product niet gevonden</h1>
      <p class="text-gray-60 mb-6">Het product dat je zoekt bestaat niet of is niet meer beschikbaar.</p>
      <NuxtLink to="/collectie"
        class="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-70 transition-colors">
        Terug naar collectie
      </NuxtLink>
    </div>
  </div>

  <!-- Product Content -->
  <div v-else class="max-w-screen-2xl mx-auto">
    <!-- Breadcrumb -->
    <section class="px-5 py-6 md:px-20">
      <Breadcrumbs
        :items="[{ label: 'Home', to: '/' }, { label: 'Collectie', to: '/collectie' }, { label: product.title }]" />
    </section>

    <!-- Product Detail -->
    <section class="px-5 py-0 xl:py-10 md:px-20" v-if="product">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div class="lg:w-1/2">
          <ProductGallery :images="product.images || []" v-model="selectedImage" :badge="product?.badge" />
        </div>
        <div class="lg:w-1/2">
          <ProductPurchasePanel v-model="productModel" :name="product.title" :collection="product.collection?.title"
            :rating="product.rating" :reviews="product?.reviews"
            :price="product.price"
            :category="product.categories?.[0]?.name"
            :sizes="sizes" :colors="colors" :features="product.features" :slug="productHandle" @add="addToCart" />
        </div>
      </div>
    </section>

    <!-- Product Description & Specifications -->
    <section class="px-5 py-16 md:px-20" v-if="product">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Description -->
        <div class="lg:w-1/2">
          <h3 class="text-2xl font-bold text-gray-90 mb-6">Omschrijving</h3>
          <div class="prose prose-lg max-w-none text-gray-70 leading-relaxed" v-html="product.description"></div>
          <div class="prose prose-lg max-w-none text-gray-70 leading-relaxed">

            <h5 class="text-medium font-bold text-gray-90 mt-4">Personaliseer je product</h5>
            <p class="text-gray-70 leading-relaxed">Personaliseer je product met een eigen tekst. Dat kan je voornaam zijn, je totemnaam of zelfs je voortotem. Zo maak je jouw item écht uniek.</p>

            <h5 class="text-medium font-bold text-gray-90 mt-4">Op Maat gemaakt</h5>
            <p class="text-gray-70 leading-relaxed">Onze producten worden met zorg en vakmanschap op maat gemaakt. Dankzij de persoonlijke aanpak en oog voor detail ontvang je steeds iets van uitzonderlijke kwaliteit.</p>

            <h5 class="text-medium font-bold text-gray-90 mt-4">Levering</h5>
            <p class="text-gray-70 leading-relaxed">Omdat we elk product pas maken zodra je bestelling binnenkomt, kan de levering iets langer duren. Reken op een levertijd van 1 tot 2 weken.</p>

            <h5 class="text-medium font-bold text-gray-90 mt-4">Veilig betalen</h5>
            <p class="text-gray-70 leading-relaxed">Je betaalt eenvoudig en veilig via Mollie, met de betaalmethode die jij verkiest.</p>
          </div>
        </div>
        
        <!-- Specifications -->
        <div class="lg:w-1/2">
          <h3 class="text-2xl font-bold text-gray-90 mb-6 uppercase">Specificaties</h3>
            <div class="space-y-4">
              <div v-for="feature in product.features" :key="feature" class="border-b border-gray-20 pb-3 flex items-center gap-3">
                <component :is="getFeatureIcon(feature.title)" class="w-5 h-5 text-primary flex-shrink-0" />
                <div class="text-gray-70 leading-relaxed">
                  <span class="font-semibold text-gray-90">{{ feature.title }}</span>: {{ feature.description }}
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="px-5 py-16 md:px-20 bg-gray-10" v-if="product">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-90 mb-4">
          Gerelateerde producten
        </h2>
        <p class="text-gray-60">
          Andere producten die je misschien leuk vindt
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <router-link :to="`/product/${relatedProduct.handle}`" v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="group cursor-pointer"
             :class="{ 'lg:col-start-2': relatedProducts?.length === 2 && relatedProducts.indexOf(relatedProduct) === 0 }">
          <div class="relative overflow-hidden rounded-xl mb-4">
            <div class="w-full aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              :style="{ backgroundImage: `url(${relatedProduct.thumbnail})` }" />
          </div>
          <div class="space-y-2">
            <h3 class="font-semibold text-gray-90 group-hover:text-primary transition-colors">
              {{ relatedProduct.title }}
            </h3>
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold text-primary">€{{ relatedProduct.price.toFixed(2) }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>