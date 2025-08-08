import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alchemy } from '../alchemyInstance';
import { getContractMetadata } from '../utils';

// Component to display popular contracts
function PopularContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  // List of popular contract addresses
  const popularAddresses = [
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      name: 'USDT (Tether)',
      description: 'Tether USD stablecoin'
    },
    {
      address: '0xA0b86a33E6441b8c4C8C8C8C8C8C8C8C8C8C8C8C',
      name: 'USDC',
      description: 'USD Coin stablecoin'
    },
    {
      address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F4788',
      name: 'Uniswap V2 Router',
      description: 'Uniswap V2 Router contract'
    },
    {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      name: 'UNI Token',
      description: 'Uniswap governance token'
    },
    {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      name: 'WBTC',
      description: 'Wrapped Bitcoin'
    }
  ];

  useEffect(() => {
    async function fetchContractData() {
      try {
        const contractsData = await Promise.all(
          popularAddresses.map(async (contract) => {
            try {
              const metadata = await getContractMetadata(contract.address, alchemy);
              return {
                ...contract,
                metadata
              };
            } catch (error) {
              console.error(`Error fetching metadata for ${contract.address}:`, error);
              return contract;
            }
          })
        );
        
        setContracts(contractsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contract data:', error);
        setLoading(false);
      }
    }

    fetchContractData();
  }, []);

  if (loading) {
    return (
      <div className="popular-contracts-section">
        <h3>Popular Contracts</h3>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="popular-contracts-section">
      <h3>Popular Contracts</h3>
      <div className="contracts-grid">
        {contracts.map((contract, index) => (
          <div key={index} className="contract-card">
            <div className="contract-header">
              <h4>{contract.name}</h4>
              <span className="contract-type">Smart Contract</span>
            </div>
            
            <div className="contract-details">
              <p className="contract-description">{contract.description}</p>
              <p className="contract-address">
                <span className="label">Address:</span> 
                <Link to={`/address/${contract.address}`} className="address-link">
                  {contract.address}
                </Link>
              </p>
              
              {contract.metadata && (
                <div className="contract-metadata">
                  {contract.metadata.symbol && (
                    <p><span className="label">Symbol:</span> {contract.metadata.symbol}</p>
                  )}
                  {contract.metadata.decimals !== null && (
                    <p><span className="label">Decimals:</span> {contract.metadata.decimals}</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="contract-actions">
              <Link 
                to={`/address/${contract.address}`}
                className="view-contract-btn"
              >
                View Contract
              </Link>
              <a 
                href={`https://etherscan.io/address/${contract.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="etherscan-link"
              >
                Etherscan
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularContracts;
