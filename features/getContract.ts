import { ethers } from 'ethers';

export default async function getContract(CONTRACT_ADDR: string, ABI: ethers.ContractInterface, provider: ethers.providers.Provider) {
	return new ethers.Contract(CONTRACT_ADDR, ABI, provider);
}