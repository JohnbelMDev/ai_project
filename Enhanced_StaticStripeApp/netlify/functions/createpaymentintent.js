
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // Amount in cents (e.g., 5000 = $50.00)
            currency: 'usd',
            payment_method_types: ['card']
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
