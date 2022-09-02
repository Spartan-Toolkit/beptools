const isMainnet = !window.localStorage.getItem("STBT_isTestnet");
const isTestnet = !isMainnet;
const CHAIN_ID = isTestnet ? "Binance-Chain-Nile" : "Binance-Chain-Tigris";
const NETWORK_ID = 714;

const NET = isTestnet ? "testnet" : "mainnet";

export { NET, CHAIN_ID, NETWORK_ID, isTestnet, isMainnet };
