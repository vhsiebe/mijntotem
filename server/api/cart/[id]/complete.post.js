export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'id')

  if (!cartId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cart ID is required'
    })
  }

  try {
    const response = await $fetch(`https://backend.mijntotem.be/store/carts/${cartId}/complete`, {
      method: 'POST',
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })

    return response.order
  } catch (error) {
    console.error('Error completing cart:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het voltooien van de bestelling'
    })
  }
})
