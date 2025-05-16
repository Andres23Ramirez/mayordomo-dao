import { ethers } from "hardhat";

async function main() {
  console.log("Connecting to contract...");
  const contract = await ethers.getContractAt(
    "FarmingProjects",
    "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f"
  );

  const totalProjects = await contract.projectCounter();
  console.log(`Total projects found: ${totalProjects}`);

  let deletedCount = 0;
  let errorCount = 0;

  for (let i = 1; i <= totalProjects; i++) {
    console.log(`\nAttempting to delete project ${i}...`);
    try {
      const tx = await contract.deleteProject(i);
      await tx.wait();
      console.log(`Successfully deleted project ${i}`);
      deletedCount++;
    } catch (error) {
      console.log(`Error deleting project ${i}:`, error);
      errorCount++;
    }
  }

  console.log("\nDeletion summary:");
  console.log(`Total projects: ${totalProjects}`);
  console.log(`Successfully deleted: ${deletedCount}`);
  console.log(`Errors encountered: ${errorCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
