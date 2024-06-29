// import React from 'react';

const ConnectButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
            {'Connect to MetaMask'}
        </button>
    );
};

export default ConnectButton;
