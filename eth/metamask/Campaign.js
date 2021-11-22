import { ethers } from 'ethers';
import Campaign from './build/Campaign.json';
import CampaignFactory from './build/CampaignFactory.json'
import { signer } from '.'

export const CampaignContract = (address) => {
    return new ethers.Contract(address, JSON.parse(Campaign.interface), signer)
}

<<<<<<< HEAD
export const FactoryContract = () => new ethers.Contract('0xe3D6Edf10dF802E986Cca3ABAe882fBf837A56A2', JSON.parse(CampaignFactory.interface), signer)
=======
export const FactoryContract = () => new ethers.Contract('0x331020D6B9D654883899f41A2F6Aa1F108a3d77c', JSON.parse(CampaignFactory.interface), signer)
>>>>>>> edac4553bad019c530d2f68ba631a6ecfbbb62f2
