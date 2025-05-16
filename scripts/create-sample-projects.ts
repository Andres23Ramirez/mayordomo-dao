import pkg from "hardhat";
const { ethers } = pkg;

const sampleProjects = [
  {
    title: "Cultivo Sostenible de Café Orgánico",
    description:
      "Proyecto de café orgánico cultivado bajo sombra, siguiendo prácticas sostenibles y comercio justo. Beneficiará a 50 familias de agricultores locales.",
    specificAddress: "Vereda El Progreso",
    city: "Pitalito",
    department: "Huila",
    country: "Colombia",
    imageUrl:
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=800", // Imagen de cultivo de café
    targetAmount: ethers.parseEther("2.5"), // 2.5 ETH
  },
  {
    title: "Granja Hidropónica Comunitaria",
    description:
      "Sistema hidropónico para cultivo de verduras y hortalizas, utilizando tecnología de punta y energía solar. Producirá alimentos para 200 familias.",
    specificAddress: "Km 5 Vía Principal",
    city: "Medellín",
    department: "Antioquia",
    country: "Colombia",
    imageUrl:
      "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=800", // Imagen de cultivo hidropónico
    targetAmount: ethers.parseEther("1.8"), // 1.8 ETH
  },
  {
    title: "Apicultura Sustentable Maya",
    description:
      "Proyecto de apicultura tradicional maya para la producción de miel orgánica y conservación de abejas nativas. Incluye capacitación para 30 apicultores.",
    specificAddress: "Vereda San José",
    city: "Santa Marta",
    department: "Magdalena",
    country: "Colombia",
    imageUrl:
      "https://images.unsplash.com/photo-1587127964224-9ade55286dc3?w=800", // Imagen de apicultura
    targetAmount: ethers.parseEther("1.2"), // 1.2 ETH
  },
];

async function main() {
  const farmingProjects = await ethers.getContractAt(
    "FarmingProjects",
    "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
  );

  console.log("Creating sample projects...");

  for (const project of sampleProjects) {
    try {
      console.log(`Creating project: ${project.title}`);
      const tx = await farmingProjects.createProject(
        project.title,
        project.description,
        project.specificAddress,
        project.city,
        project.department,
        project.country,
        project.imageUrl,
        project.targetAmount
      );
      await tx.wait();
      console.log(`Project "${project.title}" created successfully!`);
      console.log("Details:", project);
      console.log("-------------------");
    } catch (error) {
      console.error(`Error creating project "${project.title}":`, error);
    }
  }

  console.log("All sample projects created!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
