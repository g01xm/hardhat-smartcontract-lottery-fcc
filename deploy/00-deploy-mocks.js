const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium, it costs 0.25 Link per request
const GAS_PRICE_LINK = 1e9 // 1000000000 //link per gas.

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("local network detected! Deploying mocks.....")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true,
            // waitConfirmations: network.config.blockConfirmations || 1,
        })

        log("Mock deployed.....")
        log("-------------------")
    }
}
module.exports.tags = ["all", "mocks"]
