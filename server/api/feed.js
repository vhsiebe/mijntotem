export default defineEventHandler(async (event) => {
    const publishableKey = "pk_8c3d3cbd3d3c9fab52d1fdadffc2524618b714c687ad489c7f9d7d9a8c0f0e48"
    await $fetch(`https://backend.mijntotem.be/store/feed`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-publishable-api-key': publishableKey,
        },
    });
});