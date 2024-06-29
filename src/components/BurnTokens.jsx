import { useState } from 'react';

const BurnTokens = ({ contract, signer }) => {
    const [amount, setAmount] = useState('');

    const handleBurn = async (event) => {
        event.preventDefault();
        try {
            const tx = await contract.burn(amount);
            await tx.wait();
            console.log(`Burned ${amount} tokens`);
        } catch (error) {
            console.error('Error burning tokens:', error);
        }
    };

    const handleInputChange = (event) => {
        setAmount(event.target.value);
    };

    return (
        <div className="my-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Burn Tokens</h2>
            <form onSubmit={handleBurn} className="space-y-2">
                <label className="block">
                    Amount:
                    <input
                        type="number"
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
                    Burn Tokens
                </button>
            </form>
        </div>
    );
};

export default BurnTokens;
