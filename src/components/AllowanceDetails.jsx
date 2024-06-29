import { useState, useEffect } from 'react';


    const AllowanceDetails = ({ contract, signer }) => {
        const [allowances, setAllowances] = useState([]);
    
        useEffect(() => {
            async function fetchAllowances() {
                try {
                    const accountAddress = await signer.getAddress();
                    const approvedAddresses = await contract.queryFilter(
                        contract.filters.Approval(accountAddress, null, null)
                    );
    
                    // Fetch allowance for each approved address
                    const allowances = await Promise.all(
                        approvedAddresses.map(async (event) => {
                            const spenderAddress = event.args.spender;
                            const allowanceAmount = await contract.allowance(accountAddress, spenderAddress);
                            return { spender: spenderAddress, allowance: allowanceAmount.toString() };
                        })
                    );
    
                    setAllowances(allowances);
                } catch (error) {
                    console.error('Error fetching allowances:', error);
                }
            }
    
            if (contract && signer) {
                fetchAllowances();
            }
        }, [contract, signer]);
    
        return (
            <div className="my-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Allowance Details</h2>
                <div className="space-y-2">
                    {allowances.map((allowanceInfo, index) => (
                        <div key={index} className="border p-2 rounded-lg">
                            <p className="font-semibold">Spender: {allowanceInfo.spender}</p>
                            <p>Allowance: {allowanceInfo.allowance} tokens</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    export default AllowanceDetails;