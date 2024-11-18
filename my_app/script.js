// Function to monitor fetch requests
const monitorFetchRequests = () => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        
        // Log the URL and response headers
        const logOutput = document.getElementById('logOutput');
        logOutput.textContent += \`Fetched URL: \${args[0]}
\`;
        logOutput.textContent += \`Response Headers:
\`;

        response.headers.forEach((value, name) => {
            logOutput.textContent += \`\${name}: \${value}
\`;
        });

        // Check for specific cookies
        const cookies = document.cookie.split(';');
        logOutput.textContent += \`Cookies: \${cookies.join(', ')}
\`;
        
        // Example: detect suspicious cookies
        cookies.forEach(cookie => {
            if (cookie.includes('suspicious')) {
                logOutput.textContent += \`Suspicious cookie detected: \${cookie}
\`;
            }
        });

        return response;
    };
};

// Start monitoring when the button is clicked
document.getElementById('startMonitoring').addEventListener('click', () => {
    monitorFetchRequests();
    alert('Monitoring started! Check the logs for details.');
});