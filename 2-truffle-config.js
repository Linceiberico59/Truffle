 const HDWalletProvider = require ('truffle-hdwallet-provider');
  
 const mnemonic = 'wool venture birth skull circle sibling ankle grief poem spatial must suggest'
 
 module.exports = {
 networks: {
    development: {      
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/fe9119afef6944d79b5b8532c2359969"),
      network_id: 4
    }
  }
}
