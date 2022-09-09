import axios from 'axios';
import { ethers } from 'ethers';

export default async function getAbi(ETHERSCAN_API_KEY, CONTRACT_ADDR) {
    const params = {
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