
document.getElementById('checkout-button').addEventListener('click', async () => {
    const stripe = Stripe('your-stripe-publishable-key'); // Replace with your Stripe publishable key

    // Create a new PaymentIntent on the server
    const response = await fetch('/.netlify/functions/createPaymentIntent', { method: 'POST' });
    const { clientSecret } = await response.json();

    // Use Stripe.js to handle the payment
    const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: {
                // Stripe automatically attaches the card details entered by the user
            }
        }
    });

    if (error) {
        alert(`Payment failed: ${error.message}`);
    } else {
        alert('Payment succeeded!');
    }
});
