import { ethers } from "ethers";
import Campaign from "./build/Campaign.json";
import CampaignFactory from "./build/CampaignFactory.json";
import { signer } from ".";

export const CampaignContract = (address) => {
  return new ethers.Contract(address, JSON.parse(Campaign.interface), signer);
};

export const FactoryContract = () =>
  new ethers.Contract(
    "0xE2f002815589D03D3Dd434c05b21b0A5D62e527d",
    JSON.parse(CampaignFactory.interface),
    signer
  );
