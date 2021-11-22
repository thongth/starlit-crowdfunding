import { ethers } from "ethers";
import Campaign from "./build/Campaign.json";
import CampaignFactory from "./build/CampaignFactory.json";
import { signer } from ".";

export const CampaignContract = (address) => {
  return new ethers.Contract(address, JSON.parse(Campaign.interface), signer);
};

export const FactoryContract = () =>
  new ethers.Contract(
    "0x942d2Dc5e42a784ee0cA3b1Ce487A7Fa2BEb1a19",
    JSON.parse(CampaignFactory.interface),
    signer
  );
