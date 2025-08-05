import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { alchemy } from '../alchemyInstance';

// Displays balance and recent transactions for a specific Ethereum address
function AddressDetails() {
  const { address } = useParams();
  const [balance, setBalance] = useState(null);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch balance and recent transactions for the address
    async function fetchData() {
      const bal = await alchemy.core.getBalance(address);
      setBalance(bal);
      const history = await alchemy.core.getAssetTransfers({
        fromBlock: '0x0',
        toAddress: address,
        category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
        maxCount: '10',
      });
      setTxs(history.transfers);
      setLoading(false);
    }
    fetchData();
  }, [address]);

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="card">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </nav>
      <h2>Address Details</h2>
      <p><span className="label">Address:</span> {address}</p>
      <p><span className="label">Balance:</span> {balance ? (Number(balance) / 1e18).toLocaleString() + ' ETH' : 'Loading...'}</p>
      <h3>Recent Transactions:</h3>
      <ul>
        {txs.length === 0 && <li>No transactions found.</li>}
        {txs.map((tx, idx) => (
          <li key={idx}>
            <span className="label">Hash:</span> {tx.hash} <br />
            <span className="label">From:</span> {tx.from} <br />
            <span className="label">To:</span> {tx.to} <br />
            <span className="label">Value:</span> {tx.value ? tx.value : '-'} <br />
            <span className="label">Block:</span> {parseInt(tx.blockNum, 16)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressDetails;