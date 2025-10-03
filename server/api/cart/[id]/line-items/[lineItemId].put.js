export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'id')
  const lineItemId = getRouterParam(event, 'lineItemId')
  const body = await readBody(event)

  if (!cartId || !lineItemId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cart ID and Line Item ID are required'
    })
  }

  try {
    const response = await $fetch(`https://backend.mijntotem.be/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: 'POST',
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY,
        'Content-Type': 'application/json'
      },
      body
    })

    return response.cart
  } catch (error) {
    console.error('Error updating line item:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het bijwerken van het product'
    })
  }
})
