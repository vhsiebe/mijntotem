export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const msg = {
    to: [
      {
        email: body.email,
        name: body.name,
      }
    ],
    bcc: [
      {
        email: "vhsiebe@gmail.com",
      }
    ],
    templateId: 3,
    params: {
      "name": body.name,
      "email": body.email,
      "message": body.message,
      "phone": body.phone,
    },
  };

  const sgRequest = await $fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": config.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(msg),
  }).catch((error) => {
    return error;
  });
  return sgRequest;
});
