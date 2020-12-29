// Require the IOTA library
// const Iota = require('./bundle.js');
const IotaCore = require('@iota/core');

window.getNodeInfo = async function (nodeURL) {
    const iota = IotaCore.composeAPI({
        provider: nodeURL
    });

    var nodeInfoResponse = await iota.getNodeInfo();
    var stringifiedNodeInfo = JSON.stringify(nodeInfoResponse);

    return stringifiedNodeInfo;
}

window.getAddressFromSeed = async function (nodeURL, seed) {
    const iota = IotaCore.composeAPI({
        provider: nodeURL
    });

    var address = await iota.getNewAddress(seed);

    return address;
}

window.sendIota = async function (nodeURL, seed, recipientAddress, valueInIOTA, depth, minimumWeightMagnitude) {
    const iota = IotaCore.composeAPI({
        provider: nodeURL
    });

    const transfers = [
        {
            value: valueInIOTA,
            address: recipientAddress
        }
    ];

    const trytes = await iota.prepareTransfers(seed, transfers);

    const transactionInfoResponse = await iota.sendTrytes(trytes, depth, minimumWeightMagnitude);

    var stringifiedTransactionInfo = JSON.stringify(transactionInfoResponse);

    return stringifiedTransactionInfo;
}