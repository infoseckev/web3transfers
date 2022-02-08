"use strict";
const Web3 = require('web3');
const config = require('./config');
const { minABI, transferABI } = require('./constants');
const HDWalletProvider = require("@truffle/hdwallet-provider");

let web3 = new Web3("https://mainnet.infura.io/v3/" + config.infuraURL);

exports.getWethBalance = async (contract, walletAddress) => {
    const wei = await contract.methods.balanceOf(walletAddress).call();
    const balance = web3.utils.fromWei(wei, 'ether');
    return balance;
};

exports.getEthBalance = async (walletAddress) => {
    let wei = await web3.eth.getBalance(walletAddress);
    const balance = web3.utils.fromWei(wei, 'ether');
    return balance;
};

exports.getGasPrice = async () => {
    let wei = await web3.eth.getGasPrice();
    wei = web3.utils.fromWei(String(wei), 'gwei');
    return wei;
};

exports.getContract = async () => {
    const contractAddress = config.contractAddress;
    return new web3.eth.Contract(minABI, contractAddress);
};

exports.transferWETH = async (amountToSend, sendingWallet, receivingWallet, maxGasPrice) => {

    let balance = Number(await this.getWethBalance(await this.getContract(), sendingWallet.publicKey));

    let gasPrice = Number(await this.getGasPrice());

    gasPrice = Math.round(gasPrice);

    if (gasPrice > maxGasPrice) {
        throw new Error("current gas price is over your maximum setting from web3-wallet app.");
    }

    console.log(`You have ${balance} WETH`);
    console.log(`Current gas price: ${gasPrice}`);

    //crunch numbers
    let amountPlusPercentage = ((Number(amountToSend) / 100) * 5) + Number(amountToSend);
    console.log(`your last bid was: ${amountToSend}. I will keep ${amountPlusPercentage} in this wallet (5% more)`);
    let amountToTransfer = 0;

    //debugging value. REMOVE BEFORE PROD
    //balance = 100;

    if ((balance - amountPlusPercentage > 0)) {
        amountToTransfer = balance - amountPlusPercentage;
    }
    if (amountToTransfer == 0) {
        throw new Error("amount to transfer is 0...");
    }

    const providerEngine = getHDWalletProvider(sendingWallet);
    web3.setProvider(providerEngine);

    const erc20Contract = new web3.eth.Contract(transferABI, config.contractAddress);

    const weiToSend = web3.utils.toWei(amountToTransfer.toString(), "ether");

    let estimatedGas = await erc20Contract.methods.transfer(receivingWallet.publicKey, weiToSend).estimateGas({
        gas: '500000000'
    });
    console.log(`estimated gas: ${estimatedGas}`);
    let gasPriceInGWEI = estimatedGas * gasPrice;
    console.log(`total in gwei for tx: ${gasPriceInGWEI}`);
    console.log(`total eth for tx: ${web3.utils.fromWei(String(web3.utils.toWei(String(gasPriceInGWEI), 'gwei')), 'ether')}`);
    let receipt = await erc20Contract.methods.transfer(receivingWallet.publicKey, weiToSend).send({
        from: sendingWallet.publicKey,
    });
    return receipt;

};

function getHDWalletProvider(wallet) {
    return new HDWalletProvider({
        privateKeys: [wallet.privateKey],
        providerOrUrl: "https://mainnet.infura.io/v3/" + config.infuraURL,
    });
}
