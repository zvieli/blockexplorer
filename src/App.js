import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlockList from './components/BlockList';
import BlockDetails from './components/BlockDetails';
import TransactionDetails from './components/TransactionDetails';
import AddressDetails from './components/AddressDetails';
import SearchResult from './components/SearchResult';

// Main application component with routing and modern header
function App() {
  return (
    <Router>
      <header className="main-header">
        <img src="/eth.png" alt="Ethereum" className="logo" />
        <span className="site-title">ETH Explorer</span>
      </header>
      <Routes>
        {/* Home page: recent blocks */}
        <Route path="/" element={<BlockList />} />
        {/* Block details by block number */}
        <Route path="/block/:blockNumber" element={<BlockDetails />} />
        {/* Transaction details by hash */}
        <Route path="/tx/:txHash" element={<TransactionDetails />} />
        {/* Address details and history */}
        <Route path="/address/:address" element={<AddressDetails />} />
        {/* Search for block or transaction by hash */}
        <Route path="/search/:hash" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}

export default App;
