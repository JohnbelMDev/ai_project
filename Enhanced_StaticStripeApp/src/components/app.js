
import React from 'react';
import Balance from './Balance';
import TransactionForm from './TransactionForm';
import TransactionHistory from './TransactionHistory';

function App() {
    return (
        <div className="app-container">
            <h1>Transaction App with Database</h1>
            <Balance />
            <TransactionForm />
            <TransactionHistory />
        </div>
    );
}

export default App;
