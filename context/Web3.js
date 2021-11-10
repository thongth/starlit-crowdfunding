import { createContext, useContext } from "react";

export const Web3Context = createContext();

export const useWeb3Context = () => {
  return useContext(Web3Context);
};
