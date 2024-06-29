import { useState, useEffect } from 'react';

const AccountDetails = ({ contract, signer }) => {
    const [tokenBalance, setTokenBalance] = useState(0);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        async function fetchTokenBalance() {
            try {
                const accountAddress = await signer.getAddress();
                const balance = await contract.balanceOf(accountAddress);
                setTokenBalance(balance.toString());
                setAccount(accountAddress);
            } catch (error) {
                console.error('Error fetching token balance:', error);
            }
        }

        if (contract && signer) {
            fetchTokenBalance();
        }
    }, [contract, signer]);

    return (
        <div className="my-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Account Details</h2>
            <p>Account : {account}</p>
            <p>Token Balance: {tokenBalance} tokens</p>
        </div>
    );
};

export default AccountDetails;
