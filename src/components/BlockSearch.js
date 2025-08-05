import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Search bar for blocks, transactions, or addresses
function BlockSearch() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();

    // Block number search
    if (/^\d+$/.test(value)) {
      navigate(`/block/${value}`);
    }
    // Hash search (block or transaction)
    else if (/^0x([A-Fa-f0-9]{64})$/.test(value)) {
      navigate(`/search/${value}`);
    }
    // Ethereum address search
    else if (/^0x[a-fA-F0-9]{40}$/.test(value)) {
      navigate(`/address/${value}`);
    }
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Block number / hash / address"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ marginRight: '8px' }}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default BlockSearch;
