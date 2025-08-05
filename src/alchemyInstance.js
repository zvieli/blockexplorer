import { Alchemy, Network } from 'alchemy-sdk';

// Shared Alchemy instance for API calls
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
export const alchemy = new Alchemy(settings);