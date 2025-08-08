import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { alchemy } from '../alchemyInstance';
import { isContract, getContractCode, detectContractType, getContractMetadata } from '../utils';
import ContractCode from './ContractCode';

// Displays balance and recent transactions for a specific Ethereum address
function AddressDetails() {
  const { address } = useParams();
  const [balance, setBalance] = useState(null);
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isContractAddress, setIsContractAddress] = useState(false);
  const [contractCode, setContractCode] = useState(null);
  const [contractType, setContractType] = useState(null);
  const [contractMetadata, setContractMetadata] = useState(null);
  const [contractLoading, setContractLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch balance and recent transactions for the address
    async function fetchData() {
      try {
        const bal = await alchemy.core.getBalance(address);
        setBalance(bal);
        
        const history = await alchemy.core.getAssetTransfers({
          fromBlock: '0x0',
          toAddress: address,
          category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
          maxCount: '10',
        });
        setTxs(history.transfers);
        
        // Check if address is a contract
        const contractCheck = await isContract(address, alchemy);
        setIsContractAddress(contractCheck);
        
        // If it's a contract, get additional information
        if (contractCheck) {
          setContractLoading(true);
          
          // Get contract code, type, and metadata in parallel
          const [code, type, metadata] = await Promise.all([
            getContractCode(address, alchemy),
            detectContractType(address, alchemy),
            getContractMetadata(address, alchemy)
          ]);
          
          setContractCode(code);
          setContractType(type);
          setContractMetadata(metadata);
          setContractLoading(false);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching address data:', error);
        setLoading(false);
      }
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
      
      <div className="address-header">
        <h2>Address Details</h2>
        <div className="address-type">
          {isContractAddress ? (
            <span className="contract-badge">Smart Contract</span>
          ) : (
            <span className="wallet-badge">Wallet Address</span>
          )}
        </div>
      </div>
      
      <div className="address-info">
        <p><span className="label">Address:</span> {address}</p>
        <p><span className="label">Balance:</span> {balance ? (Number(balance) / 1e18).toLocaleString() + ' ETH' : 'Loading...'}</p>
        <p><span className="label">Type:</span> {isContractAddress ? 'Smart Contract' : 'Regular Wallet'}</p>
        
        {isContractAddress && contractType && (
          <p><span className="label">Contract Type:</span> {contractType}</p>
        )}
        
        {contractMetadata && (
          <>
            {contractMetadata.name && (
              <p><span className="label">Name:</span> {contractMetadata.name}</p>
            )}
            {contractMetadata.symbol && (
              <p><span className="label">Symbol:</span> {contractMetadata.symbol}</p>
            )}
            {contractMetadata.decimals !== null && (
              <p><span className="label">Decimals:</span> {contractMetadata.decimals}</p>
            )}
            {contractMetadata.totalSupply && (
              <p><span className="label">Total Supply:</span> {contractMetadata.totalSupply.toString()}</p>
            )}
          </>
        )}
      </div>

      {/* Contract Code Section */}
      {isContractAddress && (
        <ContractCode code={contractCode} address={address} />
      )}

      <h3>Recent Transactions:</h3>
      <ul>
        {txs.length === 0 && <li>No transactions found.</li>}
        {txs.map((tx, idx) => (
          <li key={idx}>
            <Link to={`/tx/${tx.hash}`} className="transaction-link">
              <span className="label">Hash:</span> {tx.hash} <br />
              <span className="label">From:</span> {tx.from} <br />
              <span className="label">To:</span> {tx.to} <br />
              <span className="label">Value:</span> {tx.value ? tx.value : '-'} <br />
              <span className="label">Block:</span> {parseInt(tx.blockNum, 16)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressDetails;