import requestFields from '../../utils/fields/collections.js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  try {
    // Build query parameters
    const queryParams = {
      fields: requestFields,
      offset: parseInt(query.offset) || 0,
      limit: parseInt(query.limit) || 9,
    }

    // Add search query if exists
    if (query.q) {
      queryParams.q = query.q
    }

    // Add category filter if not 'all'
    if (query.category_id) {
      queryParams.category_id = query.category_id
    }

    const response = await $fetch('https://backend.mijntotem.be/store/products', {
      query: queryParams,
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })
    
    return {
      products: response.products || [],
      hasMore: response.products && response.products.length === queryParams.limit,
      total: response.count || 0
    }
  } catch (error) {
    console.error('Error loading products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het laden van de producten'
    })
  }
})
