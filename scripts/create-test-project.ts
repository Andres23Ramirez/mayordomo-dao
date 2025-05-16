import pkg from "hardhat";
import { Contract } from "ethers";
const { ethers, artifacts } = pkg;

async function main() {
  console.log("Connecting to contract...");

  const FarmingProjectsArtifact = await artifacts.readArtifact(
    "FarmingProjects"
  );
  const FarmingProjects = (await ethers.getContractAt(
    FarmingProjectsArtifact.abi,
    "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
  )) as unknown as Contract;

  console.log("Creating test project...");

  const title = "Café Especial Alto de los Andes";
  const description =
    "Proyecto de café orgánico especial cultivado en las alturas de los Andes colombianos. Nuestro café es producido por una cooperativa de 25 familias cafeteras que mantienen prácticas agrícolas sostenibles y comercio justo. El proyecto busca mejorar la infraestructura de procesamiento y expandir los cultivos orgánicos.";
  const location = "Vereda El Progreso, Pitalito, Huila, Colombia";
  const imageUrl =
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"; // Imagen de cultivo de café
  const targetAmount = ethers.parseEther("2.5"); // 2.5 ETH

  try {
    console.log("\nProject details:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Location:", location);
    console.log("Image URL:", imageUrl);
    console.log("Target Amount:", ethers.formatEther(targetAmount), "ETH");

    console.log("\nSending transaction...");
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
    console.log("\nProject created successfully!");
  } catch (error) {
    console.error("\nError creating project:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
