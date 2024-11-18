let balance = 0;
let exchangeRate = 1; // Default to 1 if API fails
const balanceDisplay = document.getElementById('balance');
const balanceDisplayHTG = document.getElementById('balance-htg');
const transactionHistory = document.getElementById('transactionHistory');

// Fetch exchange rate from the serverless function
async function fetchExchangeRate() {
    try {
        const response = await fetch('/.netlify/functions/getExchangeRate');
        const data = await response.json();
        exchangeRate = data.rate;
        updateBalanceDisplay();
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
}

// Display balances in USD and HTG
function updateBalanceDisplay() {
    balanceDisplay.textContent = `$${balance.toFixed(2)}`;
    balanceDisplayHTG.textContent = `${(balance * exchangeRate).toFixed(2)} HTG`;
}

function logTransaction(type, amount) {
    const transactionItem = document.createElement('li');
    transactionItem.textContent = `${type} $${amount.toFixed(2)}`;
    transactionHistory.appendChild(transactionItem);
}

// Transaction functions
function sendMoney() {
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (amount > balance) {
        alert('Insufficient balance.');
        return;
    }
    balance -= amount;
    updateBalanceDisplay();
    logTransaction('Sent', amount);
    document.getElementById('transactionAmount').value = '';
}

function receiveMoney() {
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    balance += amount;
    updateBalanceDisplay();
    logTransaction('Received', amount);
    document.getElementById('transactionAmount').value = '';
}

// Initialize display and exchange rate fetch
fetchExchangeRate();
updateBalanceDisplay();
