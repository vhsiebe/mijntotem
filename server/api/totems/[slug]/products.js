import requestFields from '../../../utils/fields/collections.js'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  try {
    // First, get the collection by handle (using the slug as the handle)
    const collectionsResponse = await $fetch('https://backend.mijntotem.be/store/collections', {
      query: {
        handle: slug.toLowerCase()
      },
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })

    // If no collection found, return empty result
    if (!collectionsResponse.collections || collectionsResponse.collections.length === 0) {
      return {
        products: [],
        hasMore: false,
        total: 0
      }
    }

    const collection = collectionsResponse.collections[0]

    // Then get products for this collection
    const productsResponse = await $fetch('https://backend.mijntotem.be/store/products', {
      query: {
        collection_id: collection.id,
        fields: requestFields
      },
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })
    
    return {
      products: productsResponse.products || [],
      hasMore: false, // For now, we'll load all products for a totem
      total: productsResponse.count || 0,
      collection: {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        handle: collection.handle
      }
    }
  } catch (error) {
    console.error('Error loading totem products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het laden van de totem producten'
    })
  }
})
