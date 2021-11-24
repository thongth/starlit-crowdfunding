import { ethers } from "ethers";
import Campaign from "./build/Campaign.json";
import CampaignFactory from "./build/CampaignFactory.json";
import { signer } from ".";

export const CampaignContract = (address) => {
  return new ethers.Contract(address, JSON.parse(Campaign.interface), signer);
};

export const FactoryContract = () =>
  new ethers.Contract(
    "0x0c4920188bb365e27e76c5173A0befF7F4368932",
    JSON.parse(CampaignFactory.interface),
    signer
  );
