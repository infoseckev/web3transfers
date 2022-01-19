"use strict";
const Web3 = require('web3');
const config = require('./config');
const { minABI, transferABI } = require('./constants');
const HDWalletProvider = require("@truffle/hdwallet-provider");
let web3 = new Web3(config.infuraURL);

exports.getWethBalance = async (contract) => {
    const walletAddress = config.myWalletAddress;
    const wei = await contract.methods.balanceOf(walletAddress).call();
    const balance = web3.utils.fromWei(wei, 'ether');
    return balance;
};

exports.getEthBalance = async () => {
    const walletAddress = config.myWalletAddress;
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

exports.transferWETH = async (amountToSend, receivingAddress) => {

    const providerEngine = getHDWalletProvider();
    web3.setProvider(providerEngine);

    const erc20Contract = new web3.eth.Contract(transferABI, config.contractAddress);

    const weiToSend = web3.utils.toWei(amountToSend.toString(), "ether");

    try {
        let receipt = await erc20Contract.methods.transfer(receivingAddress, weiToSend).send({
            from: config.myWalletAddress,
            gas: config.gasLimit
        });
        return receipt;
    } catch (ex) {
        console.log(ex);
    }
};

function getHDWalletProvider() {
    return new HDWalletProvider({
        privateKeys: [config.myWalletPrivateKey],
        providerOrUrl: config.infuraURL,
    });
}
