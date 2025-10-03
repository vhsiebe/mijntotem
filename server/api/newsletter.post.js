export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { email } = await readBody(event);


  const sgRequest = await $fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": config.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      listIds: [
        8],
      attributes: {
        email: email,
      },
    }),
  }).catch((error) => {
    return error;
  });
  return sgRequest;
});
