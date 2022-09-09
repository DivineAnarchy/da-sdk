import { ethers } from "ethers";

export type TransferOptions = {
	block: {
		start: number;
		end: number | null;
		step: number | 'latest';
	},
	transfer: {
		to_addr: string | null;
		from_addr: string | null;
	}
}
const default_options: TransferOptions = {
	block   : { start: 0, end: null, step: 1000 },
	transfer: { from_addr: null, to_addr: null }
}

export default async function getContractTransfers(CONTRACT: ethers.Contract, PROVIDER: ethers.providers.Provider , options: TransferOptions = default_options) {
	if(options.block.end === null) {
		options.block.end = await PROVIDER.getBlockNumber();
	}

	const clearLastOutput = () => {
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine(1);

		process.stdout.cursorTo(0);
	}

	let all_events: ethers.Event[]            = [];
	let use_start_block                       = options.block.start;
	let use_end_block                         = options.block.start;
	let events_found_last_time: number | null = null;

	if(options.block.step === 'latest') {
		options.block.step = options.block.end - use_start_block;
	}

	const eventFilter = CONTRACT.filters.Transfer(options.transfer.from_addr, options.transfer.to_addr);
	do {
		use_end_block += options.block.step;

		if(use_end_block > options.block.end) {
			use_end_block = options.block.end;
		}

		const events = await CONTRACT.queryFilter(eventFilter, use_start_block, use_end_block);
		if(events_found_last_time == 0) {
			clearLastOutput();
		}
		console.log(`block ${use_start_block} -> ${use_end_block}: Found ${events.length} events`);
		events_found_last_time = events.length;

		use_start_block = use_end_block;
		all_events      = all_events.concat(events);
	} while(use_end_block != options.block.end)

	return all_events.sort((a,b) => a.blockNumber - b.blockNumber);
}