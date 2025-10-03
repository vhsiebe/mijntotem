export default defineEventHandler(async (event) => {
  const cartId = getRouterParam(event, 'id')
  const lineItemId = getRouterParam(event, 'lineItemId')

  if (!cartId || !lineItemId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cart ID and Line Item ID are required'
    })
  }

  try {
    const response = await $fetch(`https://backend.mijntotem.be/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: 'DELETE',
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    })

    return response.parent
  } catch (error) {
    console.error('Error deleting line item:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het verwijderen van het product'
    })
  }
})
