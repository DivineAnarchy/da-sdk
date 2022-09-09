import axios from 'axios';
import { ethers } from 'ethers';

type UrlParams = {
    [key: string]: string;
    module: string;
    action: string;
    address: string;
    apikey: string;
}

export default async function getAbi(ETHERSCAN_API_KEY: string, CONTRACT_ADDR: string) {
    const params: UrlParams = {
        module: 'contract',
        action: 'getabi',
        address: CONTRACT_ADDR,
        apikey: ETHERSCAN_API_KEY
    };
    const url_params = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    const url = `https://api.etherscan.io/api?${url_params}`;
    const res = await axios.get(url);
    return res.data.result as ethers.ContractInterface;
}