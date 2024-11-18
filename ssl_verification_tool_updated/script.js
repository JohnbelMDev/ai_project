
fetch('http://127.0.0.1:5000/verify-ssl', { // Include full URL
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ domain: domain }),
})
fetch('http://10.0.0.29:5000/verify-ssl', { // Use your machine's IP
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ domain: domain }),
})


function verifySSL() {
    const domain = document.getElementById('domain').value.trim().toLowerCase();
    
    if (!domain) {
        alert("Please enter a domain name.");
        return;
    }

    const hasPermission = confirm(`Do you have permission to check the SSL certificate for '${domain}'?`);
    if (!hasPermission) {
        displayMessage("Permission denied. Please ensure you have permission to check this domain.");
        return;
    }

    displayMessage(`Retrieving SSL certificate for ${domain}...`);

    fetch('/verify-ssl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domain }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            displayFingerprint(data.fingerprint);
        } else {
            displayMessage(data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        displayMessage("An error occurred. Please try again.");
    });
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

function displayFingerprint(fingerprint) {
    const fingerprintElement = document.getElementById('fingerprint');
    fingerprintElement.textContent = fingerprint;
}
