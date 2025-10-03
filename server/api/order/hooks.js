import { createMollieClient } from '@mollie/api-client';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;

    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

    const payment = await mollie.payments.get(id);
    const payment_id = payment.metadata.payment_id;

    if (payment.status === 'paid') {
        await $fetch(`https://backend.mijntotem.be/admin/payments/${payment_id}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-medusa-access-token': process.env.MEDUSA_API_KEY,
            },
        });
    }
});