
import React, { useState } from 'react';
import { addTransaction } from '../services';

function TransactionForm() {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('send');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTransaction({ amount: parseFloat(amount), type });
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default TransactionForm;
