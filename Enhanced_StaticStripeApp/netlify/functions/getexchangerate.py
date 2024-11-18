
import os
import json
import requests

def handler(event, context):
    # Securely fetch the API key from environment variables
    api_key = os.getenv("EXCHANGE_RATE_API_KEY")
    url = f"https://v6.exchangerate-api.com/v6/{api_key}/latest/USD"
    
    try:
        response = requests.get(url)
        data = response.json()
        htg_rate = data['conversion_rates'].get('HTG', 1)
        
        return {
            "statusCode": 200,
            "body": json.dumps({"rate": htg_rate}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
        }
