// Monitor fetch requests
const monitorFetchRequests = () => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        
        // Log request URL and response headers
        console.log('Fetched URL:', args[0]);
        console.log('Response Headers:', response.headers);

        // Check cookies
        const cookies = document.cookie.split(';');
        console.log('Cookies:', cookies);
        
        // Example: Detect suspicious cookies
        cookies.forEach(cookie => {
            if (cookie.includes('suspicious')) {
                console.warn('Suspicious cookie detected:', cookie);
            }
        });

        return response;
    };
};

// Start monitoring
monitorFetchRequests();
