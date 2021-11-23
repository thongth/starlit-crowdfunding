import { ethers } from "ethers";

export const isClient = () => typeof window !== 'undefined'

isClient() && window.ethereum && window.ethereum.enable()

export const provider = isClient() && window.ethereum && new ethers.providers.Web3Provider(window.ethereum)

export const signer = isClient() && provider && provider.getSigner()

export const isMetaMaskInstalled = () => {
    return isClient() && Boolean(window.ethereum && window.ethereum.isMetaMask)
}

export const isLoggedIn = async () => {
    const accounts = isClient() && await window.ethereum.request({ method: 'eth_accounts' });
    return !!accounts
}

export const getAccount = async () => {
    const accounts = isLoggedIn() && isClient() && await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0]
}  

export const connectWallet = async (onError) => {
  try {
    isClient() && await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    onError?.(error.message)
  }
};

connectWallet()