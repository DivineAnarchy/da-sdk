"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var features_1 = require("./features");
var DivineSDK = /** @class */ (function () {
    function DivineSDK(ETHERSCAN_API_KEY, INFURA_API_KEY) {
        this.ETHERSCAN_API_KEY = ETHERSCAN_API_KEY;
        this.INFURA_API_KEY = INFURA_API_KEY;
        this.provider = new ethers_1.ethers.providers.InfuraProvider("mainnet", INFURA_API_KEY);
        ;
    }
    DivineSDK.prototype.getContract = function (contract_address, abi) {
        if (abi === void 0) { abi = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(abi === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, features_1.getAbi)(this.ETHERSCAN_API_KEY, contract_address)];
                    case 1:
                        abi = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, (0, features_1.getContract)(contract_address, abi, this.provider)];
                }
            });
        });
    };
    DivineSDK.prototype.getContractTransfers = function (contract, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, features_1.getContractTransfers)(contract, this.provider, options)];
            });
        });
    };
    DivineSDK.prototype.convertEventsToTxList = function (contract, events, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, features_1.convertEventsToTxList)(events, this.provider, contract, options)];
            });
        });
    };
    return DivineSDK;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var sdk, contract, events, tx_list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = new DivineSDK("3W4S4QMQP57N4W83P2SP1A99Q8NNZ2SGIH", "2085b411450b46f9a7498607d8ee9ca5");
                    return [4 /*yield*/, sdk.getContract("0x94ee593b5e9bf08ff5caab70e827e009db0e2712")];
                case 1:
                    contract = _a.sent();
                    return [4 /*yield*/, sdk.getContractTransfers(contract, {
                            block: { start: 14383272, end: null, step: 'latest' },
                            transfer: { from_addr: null, to_addr: "0x0000000000000000000000000000000000000000" }
                        })];
                case 2:
                    events = _a.sent();
                    return [4 /*yield*/, sdk.convertEventsToTxList(contract, events)];
                case 3:
                    tx_list = _a.sent();
                    console.log("Tx hash: ".concat(tx_list[0].tx.hash));
                    console.log("Burned DA Token: ".concat(tx_list[0].details.args.daId.toNumber()));
                    console.log("Burned by wallet: ".concat(tx_list[0].receipt.from));
                    console.log("Burned in block: ".concat(tx_list[0].receipt.blockNumber));
                    console.log("Burned at: ".concat(tx_list[0].block.date.toUTCString()));
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (err) { return console.log(err); });
