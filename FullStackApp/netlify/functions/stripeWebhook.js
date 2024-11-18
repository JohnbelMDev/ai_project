
exports.handler = async (event) => {
    try {
        const webhookEvent = JSON.parse(event.body);
        // Handle Stripe webhook event
        return { statusCode: 200, body: 'Webhook received' };
    } catch (error) {
        return { statusCode: 400, body: `Webhook Error: ${error.message}` };
    }
};
