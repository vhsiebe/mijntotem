const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cartId = body.cart_id;

  const email = body.email;
  const firstName = body.firstName;
  const lastName = body.lastName;
  const phone = body.phone;
  const shippingAddress = {
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    address_1: body.shippingAddress.street,
    postal_code: body.shippingAddress.postal_code,
    city: body.shippingAddress.city,
    country_code: body.shippingAddress.country_code,
  }
  const billingAddress = {
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    address_1: body.billingAddress.street,
    postal_code: body.billingAddress.postal_code,
    city: body.billingAddress.city,
    country_code: body.billingAddress.country_code,
  }
  const shippingMethod = body.shippingMethod;
  
  await $fetch(`https://backend.mijntotem.be/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      email,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
    }),
    headers: {
      'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
    }
  });

  await $fetch(`https://backend.mijntotem.be/store/carts/${cartId}/shipping-methods`, {
    method: "POST",
    body: JSON.stringify({
      option_id: shippingMethod,
    }),
    headers: {
      'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
    }
  });

  const paymentCollectionResponse = await $fetch(`https://backend.mijntotem.be/store/payment-collections`, {
    method: "POST",
    body: JSON.stringify({
      cart_id: cartId,
    }),
    headers: {
      'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
    }
  })

  const paymentCollectionId = paymentCollectionResponse.payment_collection.id;

  const paymentSession = (await $fetch(`https://backend.mijntotem.be/store/payment-collections/${paymentCollectionId}/payment-sessions`, {
    method: "POST",
    body: JSON.stringify({
      provider_id: "pp_mollie_mollie",
    }),
    headers: {
      'x-publishable-api-key': process.env.MEDUSA_PUBLISHABLE_KEY
    }
  }))

  const url = paymentSession.payment_collection.payment_sessions[0].data._links.checkout.href;

  return {
    statusCode: 200,
    url: url,
  };
});