
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        // Check essential environment variables
        const envCheck = process.env.EXCHANGE_RATE_API_KEY ? "Present" : "Missing";

        // Perform a sample API request
        const testUrl = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`;
        const testResponse = await fetch(testUrl);
        const apiCheck = testResponse.ok ? "API reachable" : `API error: ${testResponse.status}`;

        return {
            statusCode: 200,
            body: JSON.stringify({
                environmentCheck: envCheck,
                apiCheck: apiCheck,
                message: "Diagnostics complete"
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
