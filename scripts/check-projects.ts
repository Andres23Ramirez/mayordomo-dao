import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  console.log("Searching for active projects...");

  try {
    const farmingProjects = await ethers.getContractAt(
      "FarmingProjects",
      "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
    );

    const counter = await farmingProjects.projectCounter();
    console.log("\nTotal projects in counter:", counter.toString());

    if (counter.toString() === "0") {
      console.log("No projects found in the contract.");
      return;
    }

    let activeProjectsCount = 0;

    for (let i = 1; i <= counter; i++) {
      try {
        const [
          owner,
          title,
          description,
          location,
          ,
          targetAmount,
          currentAmount,
          isActive,
        ] = await farmingProjects.getProjectDetails(i);

        console.log(`\nProject ${i}:`);
        console.log(`Owner: ${owner}`);
        console.log(`Title: ${title}`);
        console.log(`Description: ${description}`);
        console.log(`Location: ${location}`);
        console.log(`Target Amount: ${ethers.formatEther(targetAmount)} ETH`);
        console.log(`Current Amount: ${ethers.formatEther(currentAmount)} ETH`);
        console.log(`Is Active: ${isActive}`);
        console.log("-------------------");

        if (isActive) activeProjectsCount++;
      } catch (error) {
        console.error(`Error fetching project ${i}:`, error);
      }
    }

    console.log(`\nTotal active projects found: ${activeProjectsCount}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
