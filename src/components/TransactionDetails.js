import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { alchemy } from '../alchemyInstance';

// Displays details for a specific transaction
function TransactionDetails() {
  const { txHash } = useParams();
  const [tx, setTx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch transaction details by hash
    async function fetchTransaction() {
      const txData = await alchemy.core.getTransaction(txHash);
      setTx(txData);
    }
    fetchTransaction();
  }, [txHash]);

  if (!tx) return <div className="spinner"></div>;

  return (
    <div className="card">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </nav>
      <h2>Transaction Details</h2>
      <p><span className="label">Hash:</span> {tx.hash}</p>
      <p><span className="label">From:</span> {tx.from}</p>
      <p><span className="label">To:</span> {tx.to}</p>
      <p><span className="label">Value:</span> {(Number(tx.value) / 1e18).toLocaleString()} ETH</p>
      <p><span className="label">Gas Limit:</span> {tx.gasLimit.toString()}</p>
      <p><span className="label">Nonce:</span> {tx.nonce}</p>
      <p><span className="label">Block Number:</span> {tx.blockNumber}</p>
    </div>
  );
}

export default TransactionDetails;
