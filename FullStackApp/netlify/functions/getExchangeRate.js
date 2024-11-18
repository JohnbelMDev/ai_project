
// netlify/functions/getExchangeRate.js

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const url = 'https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD';
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const htgRate = data.conversion_rates.HTG;
        
        return {
            statusCode: 200,
            body: JSON.stringify({ rate: htgRate }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch exchange rate' }),
        };
    }
};
