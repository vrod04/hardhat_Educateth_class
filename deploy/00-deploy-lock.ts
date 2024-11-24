import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {developmentChains, networkConfig} from "../helper-hardhat-config";
import  verify from "../helper-functions";

const deployLock: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const {getNamedAccounts, deployments,  network } = hre;
    const { deploy, log} = deployments;
    const { deployer } = await getNamedAccounts();
    
    const currentTime = Math.floor(Date.now() / 1000);
    const unlockTime = currentTime + 60;

    const args: any[] = [
        unlockTime,
    ];

    log("----------------------------------------------------");
    log("Deploying Lock with unlockTime: ", unlockTime, " seconds");

    const lock: DeployResult = await deploy("Lock", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    });

    if (!developmentChains.includes(network.name)) {
        await verify(lock.address, args);
    }
    log("----------------------------------------------------");
}

export default deployLock;