import pkg from "hardhat";
import { Contract } from "ethers";
const { ethers, artifacts } = pkg;

async function main() {
  const FarmingProjectsArtifact = await artifacts.readArtifact(
    "FarmingProjects"
  );
  const FarmingProjects = (await ethers.getContractAt(
    FarmingProjectsArtifact.abi,
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  )) as unknown as Contract;

  console.log("Creating test project...");

  const title = "Test Farm Project";
  const description = "A test project for organic farming";
  const location = "Test Location";
  const imageUrl = "https://picsum.photos/400/300"; // URL de imagen aleatoria válida
  const targetAmount = ethers.parseEther("1"); // 1 ETH

  try {
    const tx = await FarmingProjects.createProject(
      title,
      description,
      location,
      imageUrl,
      targetAmount
    );

    console.log("Transaction sent:", tx.hash);
    console.log("Waiting for confirmation...");

    await tx.wait();

    console.log("Test project created successfully!");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Location:", location);
    console.log("Image URL:", imageUrl);
    console.log("Target Amount:", targetAmount.toString());
  } catch (error) {
    console.error("Error creating project:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
