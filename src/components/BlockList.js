import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alchemy } from '../alchemyInstance';
import BlockSearch from './BlockSearch';

// Displays a list of recent Ethereum blocks
function BlockList() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Fetch the 10 most recent blocks
    async function fetchBlocks() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const blockNumbers = Array.from({ length: 10 }, (_, i) => latestBlockNumber - i);
      const blocksData = await Promise.all(blockNumbers.map(num => alchemy.core.getBlock(num)));
      setBlocks(blocksData);
    }
    fetchBlocks();
  }, []);

  if (blocks.length === 0) {
    // Show loading skeleton while fetching blocks
    return (
      <div className="card">
        <BlockSearch />
        <div className="spinner"></div>
        <ul>
          {[...Array(10)].map((_, i) => (
            <li key={i} style={{background:'#eee',height:'1.5em',margin:'0.5em 0',borderRadius:'4px'}}></li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="card">
      <BlockSearch />
      <h2>Recent Blocks</h2>
      <ul>
        {blocks.map(block => (
          <li key={block.number}>
            <Link to={`/block/${block.number}`}>Block #{block.number}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlockList;
