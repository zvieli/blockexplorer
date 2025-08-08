// Format a unix timestamp (seconds) to a readable date string
export function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  return d.toLocaleString();
}

// Check if an address is a contract by getting its code
export async function isContract(address, alchemy) {
  try {
    const code = await alchemy.core.getCode(address);
    return code !== '0x';
  } catch (error) {
    console.error('Error checking if address is contract:', error);
    return false;
  }
}

// Get contract code
export async function getContractCode(address, alchemy) {
  try {
    const code = await alchemy.core.getCode(address);
    return code;
  } catch (error) {
    console.error('Error getting contract code:', error);
    return null;
  }
}

// Detect contract type based on function signatures
export async function detectContractType(address, alchemy) {
  try {
    const code = await alchemy.core.getCode(address);
    if (code === '0x') return 'Not a contract';
    
    // Common function signatures for different contract types
    const signatures = {
      'ERC-20': ['0xa9059cbb', '0x23b872dd', '0x095ea7b3'], // transfer, transferFrom, approve
      'ERC-721': ['0x23b872dd', '0x42842e0e', '0xb88d4fde'], // transferFrom, safeTransferFrom
      'ERC-1155': ['0xf242432a', '0x2eb2c2d6'], // safeTransferFrom, safeBatchTransferFrom
      'Proxy': ['0x3659cfe6', '0x4f1ef286'], // upgradeTo, upgradeToAndCall
    };
    
    // Check for common patterns in the code
    const codeLower = code.toLowerCase();
    
    // Check for ERC-20 patterns
    if (codeLower.includes('transfer') && codeLower.includes('balanceof')) {
      return 'ERC-20 Token';
    }
    
    // Check for ERC-721 patterns
    if (codeLower.includes('ownerof') && codeLower.includes('tokenid')) {
      return 'ERC-721 NFT';
    }
    
    // Check for ERC-1155 patterns
    if (codeLower.includes('balanceof') && codeLower.includes('batch')) {
      return 'ERC-1155 Multi-Token';
    }
    
    // Check for proxy patterns
    if (codeLower.includes('upgradeto') || codeLower.includes('implementation')) {
      return 'Proxy Contract';
    }
    
    return 'Smart Contract';
  } catch (error) {
    console.error('Error detecting contract type:', error);
    return 'Unknown';
  }
}

// Get contract metadata (name, symbol, decimals for tokens)
export async function getContractMetadata(address, alchemy) {
  try {
    const metadata = {
      name: null,
      symbol: null,
      decimals: null,
      totalSupply: null
    };
    
    // Try to get token metadata
    try {
      const tokenContract = new alchemy.core.contract.Contract(
        address,
        [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function decimals() view returns (uint8)',
          'function totalSupply() view returns (uint256)'
        ]
      );
      
      const [name, symbol, decimals, totalSupply] = await Promise.allSettled([
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.totalSupply()
      ]);
      
      if (name.status === 'fulfilled') metadata.name = name.value;
      if (symbol.status === 'fulfilled') metadata.symbol = symbol.value;
      if (decimals.status === 'fulfilled') metadata.decimals = decimals.value;
      if (totalSupply.status === 'fulfilled') metadata.totalSupply = totalSupply.value;
      
    } catch (error) {
      // Not a token contract or metadata not available
    }
    
    return metadata;
  } catch (error) {
    console.error('Error getting contract metadata:', error);
    return { name: null, symbol: null, decimals: null, totalSupply: null };
  }
}

// Format contract code for display
export function formatContractCode(code) {
  if (!code || code === '0x') return null;
  
  // Remove '0x' prefix and format in chunks of 64 characters
  const cleanCode = code.slice(2);
  const chunks = [];
  
  for (let i = 0; i < cleanCode.length; i += 64) {
    chunks.push(cleanCode.slice(i, i + 64));
  }
  
  return chunks.map((chunk, index) => 
    `${(index * 32).toString(16).padStart(8, '0')}: ${chunk}`
  ).join('\n');
}