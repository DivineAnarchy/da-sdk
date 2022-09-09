import { ethers } from "ethers";

export type ConvertEventsToTxListOptions = {
    get_tx?: boolean,
    get_block?: boolean,
    get_receipt?: boolean,
    get_details?: boolean,
}

type ReturnData = {
    tx?     : ethers.providers.TransactionResponse,
    receipt?: ethers.providers.TransactionReceipt,
    details?: ethers.utils.TransactionDescription,
    block?  : ethers.providers.Block & {date?: Date},
}

export default async function convertEventsToTxList(events: ethers.Event[], provider: ethers.providers.Provider, contract: ethers.Contract, options: ConvertEventsToTxListOptions) {
    const default_options = {
        get_tx     : true,
        get_block  : true,
        get_receipt: true,
        get_details: true
    };
    options = {...default_options, ...options};

    let tx_hash_used: string[] = [];
    const results = await Promise.all(events.map(async(transfer) => {
        if(tx_hash_used.includes(transfer.transactionHash)) {
            return;
        }

        let data: ReturnData | any = {};

        if(options.get_tx) {
            const tx = await provider.getTransaction(transfer.transactionHash);
            data.tx = tx;

            if(options.get_details) {
                data.details = contract.interface.parseTransaction({ data: tx.data, value: tx.value });
            }
        }


        if(options.get_receipt) {
            data.receipt = await provider.getTransactionReceipt(transfer.transactionHash);
        }

        if(options.get_block) {
            data.block      = await provider.getBlock(transfer.blockNumber);
            data.block.date = new Date(data.block.timestamp * 1000);
        }

        tx_hash_used.push(transfer.transactionHash);

        return data;
    }));

    return results;
}