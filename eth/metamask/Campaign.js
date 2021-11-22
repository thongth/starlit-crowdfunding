import { ethers } from 'ethers';
import Campaign from './build/Campaign.json';
import CampaignFactory from './build/CampaignFactory.json'
import { signer } from '.'

export const CampaignContract = (address) => {
    return new ethers.Contract(address, JSON.parse(Campaign.interface), signer)
}

export const FactoryContract = () => new ethers.Contract('0xe3D6Edf10dF802E986Cca3ABAe882fBf837A56A2', JSON.parse(CampaignFactory.interface), signer)