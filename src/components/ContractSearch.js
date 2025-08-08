import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopularContracts from './PopularContracts';

// Specialized search component for contracts
function ContractSearch() {
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState('address'); // 'address' or 'name'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();

    if (searchType === 'address') {
      // Ethereum address search
      if (/^0x[a-fA-F0-9]{40}$/.test(value)) {
        navigate(`/address/${value}`);
      } else {
        alert('Please enter a valid Ethereum address (0x followed by 40 hex characters)');
      }
    } else {
      // Contract name search (placeholder for future functionality)
      alert('Contract name search will be implemented in future versions');
    }
    
    setInput('');
  };

  return (
    <div className="card">
      <div className="contract-search">
        <h3>Contract Explorer</h3>
        <p className="search-description">
          Search for smart contracts by address or browse popular contracts
        </p>
        
        <form onSubmit={handleSubmit} className="contract-search-form">
          <div className="search-type-selector">
            <label>
              <input
                type="radio"
                name="searchType"
                value="address"
                checked={searchType === 'address'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              Contract Address
            </label>
            <label>
              <input
                type="radio"
                name="searchType"
                value="name"
                checked={searchType === 'name'}
                onChange={(e) => setSearchType(e.target.value)}
              />
              Contract Name (Coming Soon)
            </label>
          </div>
          
          <div className="search-input-group">
            <input
              type="text"
              placeholder={searchType === 'address' ? "Enter contract address (0x...)" : "Enter contract name"}
              value={input}
              onChange={e => setInput(e.target.value)}
              className="contract-search-input"
            />
            <button type="submit" className="contract-search-btn">
              Search Contract
            </button>
          </div>
        </form>
      </div>

      <PopularContracts />
    </div>
  );
}

export default ContractSearch;
