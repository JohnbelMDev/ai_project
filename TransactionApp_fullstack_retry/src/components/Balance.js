
import React, { useEffect, useState } from 'react';
import { fetchBalance } from '../services';

function Balance() {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetchBalance().then(setBalance);
    }, []);

    return (
        <div className="balance-display">
            <p>Your Balance:</p>
            <h2>${balance.toFixed(2)}</h2>
        </div>
    );
}

export default Balance;
