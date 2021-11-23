import { ethers } from "ethers";
import Campaign from "./build/Campaign.json";
import CampaignFactory from "./build/CampaignFactory.json";
import { signer } from ".";

export const CampaignContract = (address) => {
  return new ethers.Contract(address, JSON.parse(Campaign.interface), signer);
};

export const FactoryContract = () =>
  new ethers.Contract(
    "0x56a7108f297CfA77c86B876d0fbeB997867bc879",
    JSON.parse(CampaignFactory.interface),
    signer
  );
