import { ethers } from "ethers";
import Campaign from "./build/Campaign.json";
import CampaignFactory from "./build/CampaignFactory.json";
import { signer } from ".";

export const CampaignContract = (address) => {
  return new ethers.Contract(address, JSON.parse(Campaign.interface), signer);
};

export const FactoryContract = () =>
  new ethers.Contract(
    "0x80AADAE8B95f614E1a0BEafCe0EF93A3d6e5CB9d",
    JSON.parse(CampaignFactory.interface),
    signer
  );
