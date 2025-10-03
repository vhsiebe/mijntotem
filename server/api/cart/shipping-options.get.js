export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const cartId = query.cart_id

  if (!cartId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cart ID is required'
    })
  }

  try {
    const response = await $fetch(`https://backend.mijntotem.be/store/shipping-options`, {
      query: {
        cart_id: cartId
      },
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })

    return response.shipping_options
  } catch (error) {
    console.error('Error getting shipping options:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het ophalen van de verzendopties'
    })
  }
})
