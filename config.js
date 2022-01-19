require("dotenv").config();

let config = {};
config.gasLimit = "200000";

/** Uncomment for mainnet */
// config.myWalletAddress = "0xf95BFCA03aba75624cBBd78951810403Ae52fA0C";
// config.contractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
// config.infuraURL = process.env.INFURA_URL;
// config.myWalletPrivateKey = process.env.WALLET_PRIVATE_KEY;

/** Uncomment for ropsten */
// config = {};
// config.myWalletAddress = "0x5Db7C6F212e281Cf546d066056A4C61BA46Ff8bd";
// config.contractAddress = "0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5";
// config.infuraURL = process.env.ROPSTEN_INFURA_URL;
// config.myWalletPrivateKey = process.env.ROPSTEN_WALLET_PRIVATE_KEY;

/** Uncomment for rinkeby */
config = {};
config.myWalletAddress = "0xCB51Af0F2628bfe6513521886B85464cCBc27904";
config.contractAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
config.infuraURL = process.env.RINKEBY_INFURA_URL;
config.myWalletPrivateKey = process.env.RINKEBY_WALLET_PRIVATE_KEY;

//export config
module.exports = config;