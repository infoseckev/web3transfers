"use strict";
const config = require('./config');
const utils = require('./utils');

(async function main() {

    //make sure address is from right network
    const receivingAddress = "0x5Db7C6F212e281Cf546d066056A4C61BA46Ff8bd";
    const amountToSend = 0.0001;
    await transferWETH(amountToSend, receivingAddress);
})();

async function transferWETH(amountToSend, receivingAddress) {

    await displayStats();

    let receipt = await utils.transferWETH(amountToSend, receivingAddress);

    console.log(`Successully transfered ${amountToSend}. Transaction hash: ${receipt.transactionHash}`);

}

async function displayStats() {

    let contract = await utils.getContract();

    const gasPrice = await utils.getGasPrice();

    const balance_Eth = await utils.getEthBalance();

    const balance_Weth = await utils.getWethBalance(contract);

    console.log(`gas price: ${gasPrice}`);
    console.log(`ETH balance: ${balance_Eth}`);
    console.log(`WETH balance: ${balance_Weth}`);
}





