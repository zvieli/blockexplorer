import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { alchemy } from '../alchemyInstance';

// Determines if a hash is a block or transaction and redirects accordingly
function SearchResult() {
  const { hash } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function search() {
      // Try to fetch as block first
      const block = await alchemy.core.getBlock(hash);
      if (block) {
        navigate(`/block/${block.number}`);
        return;
      }
      // Try to fetch as transaction
      const tx = await alchemy.core.getTransaction(hash);
      if (tx) {
        navigate(`/tx/${hash}`);
        return;
      }
      setError('No block or transaction found for this hash.');
    }
    search();
  }, [hash, navigate]);

  if (error) return <div>{error}</div>;
  return <div>Searching...</div>;
}

export default SearchResult;