
// netlify/functions/getEconomicData.js

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const url = 'https://api.example.com/haiti-economic-data'; // Placeholder for economic data API
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch economic data' }),
        };
    }
};
