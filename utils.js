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

exports.transferWETH = async (amountToSend, sendingWallet, receivingWallet) => {

    let balance = await this.getWethBalance(await this.getContract(), sendingWallet.publicKey);
    let gasPrice = await this.getGasPrice();
    gasPrice = Math.round(gasPrice);

    console.log(`You have ${balance} WETH`);
    console.log(`Current gas price: ${gasPrice}`);

    let calculatedAmountToSend = balance - amountToSend;
    const providerEngine = getHDWalletProvider(sendingWallet);
    web3.setProvider(providerEngine);

    const erc20Contract = new web3.eth.Contract(transferABI, config.contractAddress);

    const weiToSend = web3.utils.toWei(amountToSend.toString(), "ether");

    let receipt = await erc20Contract.methods.transfer(receivingWallet.publicKey, weiToSend).send({
        from: sendingWallet.publicKey,
        gas: config.gasLimit
    });
    return receipt;

};

function getHDWalletProvider(wallet) {
    return new HDWalletProvider({
        privateKeys: [wallet.privateKey],
        providerOrUrl: "https://mainnet.infura.io/v3/" + config.infuraURL,
    });
}
