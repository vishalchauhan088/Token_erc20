import  { useState } from 'react';

const MintTokens = ({ contract, signer }) => {
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleMint = async (event) => {
        event.preventDefault();
        try {
            const tx = await contract.mint(toAddress, amount);
            await tx.wait();
            console.log(`Minted ${amount} tokens to ${toAddress}`);
        } catch (error) {
            console.error('Error minting tokens:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'toAddress') {
            setToAddress(value);
        } else if (name === 'amount') {
            setAmount(value);
        }
    };

    return (
        <div className="my-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Mint Tokens</h2>
            <form onSubmit={handleMint} className="space-y-2">
                <label className="block">
                    To Address:
                    <input
                        type="text"
                        name="toAddress"
                        value={toAddress}
                        onChange={handleInputChange}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        required
                    />
                </label>
                <label className="block">
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleInputChange}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Mint Tokens
                </button>
            </form>
        </div>
    );
};

export default MintTokens;
