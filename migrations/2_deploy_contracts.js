
var SimpleWallet = artifacts.require("../contracts/SimpleWallet.sol");
var ConvertLib = artifacts.require("./ConvertLib.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.deploy(SimpleWallet);
};
