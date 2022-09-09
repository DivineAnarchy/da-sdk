# Docs .... who needs em

Some sample code using nodejs:
```js
const DivineSDK = require('divine-anarchy-sdk');

async function main() {
    const bad_apple_contract = "0x94ee593b5e9bf08ff5caab70e827e009db0e2712"
    const sdk = new DivineSDK(
        "3W4S4QMQP57N4W83P2SP1A99Q8NNZ2SGIH",
        "2085b411450b46f9a7498607d8ee9ca5"
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
```

Will output:
```sh
block 14383272 -> 15501803: Found 78 events
Tx hash: 0xf8e8eca720f40648d1183a3cbf9ad05df7498f2c8d0928c1cbd205b93e98795b
Burned DA Token: 6509
Burned by wallet: 0xe2165a834F93C39483123Ac31533780b9c679ed4
Burned in block: 14383702
Burned at: Mon, 14 Mar 2022 08:44:13 GMT
```