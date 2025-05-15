import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  console.log("Deploying FarmingProjects contract...");

  const FarmingProjects = await ethers.getContractFactory("FarmingProjects");
  const farmingProjects = await FarmingProjects.deploy();

  await farmingProjects.waitForDeployment();

  const address = await farmingProjects.getAddress();
  console.log(`FarmingProjects deployed to: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
