// Exclusion in Colonial Law
function checkLandOwnership() {
    const race = document.getElementById('race').value;
    const socialClass = document.getElementById('social-class').value;

    let result = (race === "Indigenous" || socialClass === "Lower") ? 
                 "Denied" : "Approved";

    document.getElementById('result').innerText = `Ownership Status: ${result}`;
}

// Dress-Based Fraud Detection Simulation
function detectFraud() {
    const dressElements = document.getElementById('dress-elements').value;

    // Placeholder for fraud detection logic
    let isFraudulent = dressElements.toLowerCase().includes("uniform");

    let result = isFraudulent ? "Potential fraud detected!" : "No anomalies found.";
    document.getElementById('fraud-result').innerText = result;
}

// Global Mechanical App - Force Calculation with Unit Conversion
function calculateForce() {
    let mass = parseFloat(document.getElementById('mass').value);
    let acceleration = parseFloat(document.getElementById('acceleration').value);
    const unitSystem = document.getElementById('unit-system').value;

    if (unitSystem === "imperial") {
        mass *= 0.453592; // Convert pounds to kg
        acceleration *= 0.3048; // Convert ft/s^2 to m/s^2
    }

    const force = mass * acceleration;
    document.getElementById('force-result').innerText = `Force: ${force.toFixed(2)} N`;
}
