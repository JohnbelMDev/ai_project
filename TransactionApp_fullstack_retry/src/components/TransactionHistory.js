
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions().then(setTransactions);
    }, []);

    return (
        <div className="transaction-history">
            <h3>Transaction History</h3>
            <ul>
                {transactions.map((tx) => (
                    <li key={tx.id}>
                        {tx.type} - ${tx.amount} {tx.currency} on {new Date(tx.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionHistory;
