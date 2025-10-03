const FIELDS = [
    'title',
    'subtitle',
    'description',
    'thumbnail',
    'weight',
    'material',
    'handle',
    '*categories',
    '*collection',
    '*variants.calculated_price',
    '*variants.options',
    '*variants.options.option',
    '*images',
].join(',');

export default defineEventHandler(async (event) => {
  const handle = getRouterParam(event, 'handle')
  
  try {
    const response = await $fetch('https://backend.mijntotem.be/store/products', {
      query: {
        handle: handle,
        fields: FIELDS,
      },
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })

    console.log(response.products[0].collection.id)

    const relatedProductsResponse = await $fetch('https://backend.mijntotem.be/store/products', {
      query: {
        collection_id: response.products[0].collection.id,
        fields: FIELDS,
        limit: 5,
      },
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })

    const relatedProducts = relatedProductsResponse.products.filter(product => product.id !== response.products[0].id)

 
    return {
      product: mapProduct(response.products[0]),
      relatedProducts: relatedProducts.map(mapProduct)
    }
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Product niet gevonden'
    })
  }
})
