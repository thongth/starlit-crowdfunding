import { ethers } from "ethers";

export const provider = window.ethereum && new ethers.providers.Web3Provider(window.ethereum)

export const signer = provider && provider.getSigner()

export const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask)
}

export const isLoggedIn = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return !!accounts
}

export const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0]
}  

export const connectWallet = async (onError) => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    onError?.(error.message)
  }
};
