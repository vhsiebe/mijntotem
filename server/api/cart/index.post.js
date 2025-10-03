export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const response = await $fetch('https://backend.mijntotem.be/store/carts', {
      method: 'POST',
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY,
        'Content-Type': 'application/json'
      },
      body: {
        sales_channel_id: "sc_01JS3WXW6HYMYMFFMNJ6ERVCTK",
        shipping_address: {
          country_code: "be",
        },
        ...body
      }
    })

    return response.cart
  } catch (error) {
    console.error('Error creating cart:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Er is een fout opgetreden bij het aanmaken van de winkelwagen'
    })
  }
})
