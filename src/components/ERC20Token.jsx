import { useState } from 'react';

const ERC20Token = ({ contract, signer }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [spender, setSpender] = useState('');
    const [approvalAmount, setApprovalAmount] = useState('');
    const [transferSuccess, setTransferSuccess] = useState('');
    const [approvalSuccess, setApprovalSuccess] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.transfer(recipient, amount);
            await tx.wait();
            setTransferSuccess(`Transferred ${amount} tokens to ${recipient}`);
            // Optionally: Clear form fields or update UI
        } catch (error) {
            console.error('Error transferring tokens:', error);
        }
    };

    const handleApprove = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.approve(spender, approvalAmount);
            await tx.wait();
            setApprovalSuccess(`Approved ${approvalAmount} tokens for ${spender}`);
            // Optionally: Clear form fields or update UI
        } catch (error) {
            console.error('Error approving tokens:', error);
        }
    };

    return (
        <div className="my-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold mb-4">ERC20 Token Functions</h2>

            {/* Transfer Form */}
            <form onSubmit={handleTransfer} className="space-y-2">
                <h3 className="text-md font-bold mb-2">Transfer Tokens</h3>
                <label className="block">
                    Recipient Address:
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    Transfer
                </button>
                {transferSuccess && <p className="text-green-600">{transferSuccess}</p>}
            </form>

            {/* Approval Form */}
            <form onSubmit={handleApprove} className="space-y-2 mt-4">
                <h3 className="text-md font-bold mb-2">Approve Tokens</h3>
                <label className="block">
                    Spender Address:
                    <input
                        type="text"
                        value={spender}
                        onChange={(e) => setSpender(e.target.value)}
                        required
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    Approval Amount:
                    <input
                        type="number"
                        value={approvalAmount}
                        onChange={(e) => setApprovalAmount(e.target.value)}
                        required
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    Approve
                </button>
                {approvalSuccess && <p className="text-green-600">{approvalSuccess}</p>}
            </form>
        </div>
    );
};

export default ERC20Token;
