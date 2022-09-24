import LitJsSdk from 'lit-js-sdk/build/index.node.js';

export const encrypto = async () => {

    // -- init litNodeClient
    const litNodeClient = new LitJsSdk.LitNodeClient();

    await litNodeClient.connect();

    const messageToEncrypt = "🔥🔥🔥🔥🔥 THIS IS A SECRET MESSAGE 🔥🔥🔥🔥🔥 ";

    const chain = 'mumbai';

    const authSig = await signAuthMessage();

    const accessControlConditions = [
        {
            contractAddress: '',
            standardContractType: '',
            chain: 'mumbai',
            method: 'eth_getBalance',
            parameters: [':userAddress', 'latest'],
            returnValueTest: {
            comparator: '>=',
            value: '0',  // 0 ETH, so anyone can open
            },
        },
    ];

    // 1. Encryption
    // <Blob> encryptedString
    // <Uint8Array(32)> symmetricKey 
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(messageToEncrypt);

    // 2. Saving the Encrypted Content to the Lit Nodes
    // <Unit8Array> encryptedSymmetricKey
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
    });

    return { encryptedString, encryptedSymmetricKey };
}