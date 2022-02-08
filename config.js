require("dotenv").config();

let config = {};


/** Uncomment for mainnet */
config.contractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
config.infuraURL = process.env.INFURA_KEY;

/** Uncomment for ropsten */
// config = {};
// config.contractAddress = "0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5";
// config.infuraURL = process.env.ROPSTEN_INFURA_URL;

/** Uncomment for rinkeby */
// config = {};
// config.contractAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
// config.infuraURL = process.env.RINKEBY_INFURA_URL;

//export config
module.exports = config;