const Migrations = artifacts.require("ClaimContract");
module.exports = function (deployer) {
 deployer.deploy(Migrations);
};