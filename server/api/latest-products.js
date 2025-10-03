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
  try {
    const response = await $fetch('https://backend.mijntotem.be/store/products', {
      query: {
        order: '-created_at',
        fields: FIELDS,
        limit: 4,
        offset: 0,
        category_id: 'pcat_01JS3WXX6SE1W8PM7ZGFN6F1YG',
      },
      headers: {
        'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
      }
    });

    return response.products.map(mapProduct);
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 404,
      statusMessage: 'Product niet gevonden',
    });
  }
});
