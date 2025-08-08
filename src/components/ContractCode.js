import React, { useState } from 'react';
import { formatContractCode } from '../utils';

// Component to display contract code in a formatted way
function ContractCode({ code, address }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!code || code === '0x') {
    return (
      <div className="contract-section">
        <h3>Contract Code</h3>
        <p>No contract code found for this address.</p>
      </div>
    );
  }

  const formattedCode = formatContractCode(code);
  const codeLength = code.length - 2; // Remove '0x' prefix
  const displayCode = isExpanded ? formattedCode : formattedCode.split('\n').slice(0, 10).join('\n');

  return (
    <div className="contract-section">
      <div className="contract-header">
        <h3>Contract Code</h3>
        <div className="contract-info">
          <span className="code-size">Size: {codeLength} bytes</span>
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
      
      <div className="code-container">
        <pre className="contract-code">
          {displayCode}
          {!isExpanded && formattedCode.split('\n').length > 10 && (
            <div className="code-truncated">
              ... (showing first 10 lines, click "Show More" to see all)
            </div>
          )}
        </pre>
      </div>
      
      <div className="contract-actions">
        <button 
          className="copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(code);
            alert('Contract code copied to clipboard!');
          }}
        >
          Copy Raw Code
        </button>
        <a 
          href={`https://etherscan.io/address/${address}#code`}
          target="_blank"
          rel="noopener noreferrer"
          className="etherscan-btn"
        >
          View on Etherscan
        </a>
      </div>
    </div>
  );
}

export default ContractCode; 