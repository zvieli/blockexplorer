import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { alchemy } from '../alchemyInstance';
import { formatDate } from '../utils';

// Displays details for a specific block, including its transactions
function BlockDetails() {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch block details and transactions by block number
    async function fetchBlock() {
      const blockData = await alchemy.core.getBlockWithTransactions(parseInt(blockNumber));
      setBlock(blockData);
    }
    fetchBlock();
  }, [blockNumber]);

  if (!block) return <div className="spinner"></div>;

  return (
    <div className="card">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </nav>
      <h2>Block #{block.number} Details</h2>
      <p><span className="label">Hash:</span> {block.hash}</p>
      <p><span className="label">Miner:</span> {block.miner}</p>
      <p><span className="label">Timestamp:</span> {formatDate(block.timestamp)}</p>
      <p><span className="label">Transactions Count:</span> {block.transactions.length}</p>

      <h3>Transactions:</h3>
      <ul>
        {block.transactions.map(tx => (
          <li key={tx.hash}>
            <Link to={`/tx/${tx.hash}`}>{tx.hash}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlockDetails;