import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const farmingProjects = await ethers.getContractAt(
    "FarmingProjects",
    "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
  );

  // Obtener el contador de proyectos
  const counter = await farmingProjects.projectCounter();
  console.log(`Total projects: ${counter}`);

  // Eliminar cada proyecto
  for (let i = 1; i <= counter; i++) {
    try {
      console.log(`Deleting project ${i}...`);
      const tx = await farmingProjects.deleteProject(i);
      await tx.wait();
      console.log(`Project ${i} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting project ${i}:`, error);
    }
  }

  console.log("All projects deleted!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
