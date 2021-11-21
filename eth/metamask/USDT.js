import { ethers } from 'ethers';
import IERC20 from './build/IERC20.json';
import { signer } from '.'

export const USDTContract = () => {
    return new ethers.Contract('0xD92E713d051C37EbB2561803a3b5FBAbc4962431', JSON.parse(IERC20.interface), signer)
}
