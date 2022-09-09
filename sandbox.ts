import DivineSDK from "./index";
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    const bad_apple_contract = "0x94ee593b5e9bf08ff5caab70e827e009db0e2712"
    const sdk = new DivineSDK(
        process.env.MY_ETHERSCAN_API_KEY as string,
        process.env.MY_INFURA_API_KEY as string
    );

    const contract = await sdk.getContract(bad_apple_contract);
    const events   = await sdk.getContractTransfers(contract, {
        block: { start: 14383272, end: null, step: 'latest' },
        transfer: { from_addr: null, to_addr: sdk.nullAddress }
    });
    const tx_list = await sdk.convertEventsToTxList(contract, events);

    console.log(`Tx hash: ${tx_list[0].tx.hash}`);
    console.log(`Burned DA Token: ${tx_list[0].details.args.daId.toNumber()}`);
    console.log(`Burned by wallet: ${tx_list[0].receipt.from}`);
    console.log(`Burned in block: ${tx_list[0].receipt.blockNumber}`);
    console.log(`Burned at: ${tx_list[0].block.date.toUTCString()}`);
}

main().catch(err => console.log(err));