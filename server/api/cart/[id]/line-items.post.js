export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!cartId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cart ID is required'
    })
  }

  try {
    const response = await $fetch(`https://backend.mijntotem.be/store/carts/${cartId}/line-items`, {
      method: 'POST',
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY,
        'Content-Type': 'application/json'
      },
      body
    })

    return response.cart
  } catch (error) {
    console.error('Error adding line item:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het toevoegen van het product'
    })
  }
})
