import { ethers } from 'ethers';

import {
    getAbi,
    getContractTransfers,
    getContract,
    convertEventsToTxList
} from './features';
import { TransferOptions } from './features/getContractTransfers';

class DivineSDK {
    private ETHERSCAN_API_KEY: string;
    private INFURA_API_KEY   : string;
    private provider         : ethers.providers.Provider;
    public  nullAddress      : string;

    constructor(ETHERSCAN_API_KEY : string, INFURA_API_KEY : string) {
        this.ETHERSCAN_API_KEY = ETHERSCAN_API_KEY;
        this.INFURA_API_KEY    = INFURA_API_KEY;

        this.provider    = new ethers.providers.InfuraProvider("mainnet", this.INFURA_API_KEY);
        this.nullAddress = "0x0000000000000000000000000000000000000000";
    }

    async getContract(contract_address: string, abi: ethers.ContractInterface | null = null) {
        if(abi === null) {
            abi = await getAbi(this.ETHERSCAN_API_KEY, contract_address);
        }

        return getContract(contract_address, abi, this.provider);
    }

    async getContractTransfers(contract, options: TransferOptions) {
        return getContractTransfers(contract, this.provider, options);
    }

    async convertEventsToTxList(contract, events, options = {}) {
        return convertEventsToTxList(events, this.provider, contract, options);
    }
}

export default DivineSDK;