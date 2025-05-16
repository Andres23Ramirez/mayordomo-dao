import { useState, useCallback, useEffect } from "react";
import { useWriteContract, usePublicClient } from "wagmi";
import { CONTRACTS } from "../config/contracts";

export type ProjectDetails = {
  id: number;
  owner: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  targetAmount: bigint;
  currentAmount: bigint;
  isActive: boolean;
};

interface FarmingProjectsHook {
  loading: boolean;
  error: string | null;
  projectDetails: ProjectDetails[];
  createNewProject: (
    title: string,
    description: string,
    location: string,
    imageUrl: string,
    targetAmount: bigint
  ) => Promise<string | null>;
  investInProjectFn: (
    projectId: number,
    amount: bigint
  ) => Promise<string | null>;
}

export function useFarmingProjects(): FarmingProjectsHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails[]>([]);
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const fetchProjectDetails = useCallback(
    async (projectId: number): Promise<ProjectDetails | null> => {
      if (!publicClient) return null;

      try {
        const result = await publicClient.readContract({
          address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
          abi: CONTRACTS.FARMING_PROJECTS.ABI,
          functionName: "getProjectDetails",
          args: [BigInt(projectId)],
        });

        if (!result) return null;

        const [
          owner,
          title,
          description,
          location,
          imageUrl,
          targetAmount,
          currentAmount,
          isActive,
        ] = result as [
          string,
          string,
          string,
          string,
          string,
          bigint,
          bigint,
          boolean
        ];

        return {
          id: projectId,
          owner,
          title,
          description,
          location,
          imageUrl,
          targetAmount,
          currentAmount,
          isActive,
        };
      } catch (err) {
        console.error(`Error fetching project ${projectId}:`, err);
        return null;
      }
    },
    [publicClient]
  );

  const fetchAllProjects = useCallback(async () => {
    if (!publicClient) return;

    setLoading(true);
    setError(null);

    try {
      const counter = (await publicClient.readContract({
        address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
        abi: CONTRACTS.FARMING_PROJECTS.ABI,
        functionName: "projectCounter",
      })) as bigint;

      const count = Number(counter);
      const projects = await Promise.all(
        Array.from({ length: count }, (_, i) => fetchProjectDetails(i + 1))
      );

      setProjectDetails(
        projects.filter((p): p is ProjectDetails => p !== null)
      );
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : "Error fetching projects");
    } finally {
      setLoading(false);
    }
  }, [publicClient, fetchProjectDetails]);

  useEffect(() => {
    if (publicClient) {
      fetchAllProjects();
    }
  }, [publicClient]);

  const createNewProject = useCallback(
    async (
      title: string,
      description: string,
      location: string,
      imageUrl: string,
      targetAmount: bigint
    ): Promise<string | null> => {
      try {
        const result = await writeContractAsync({
          address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
          abi: CONTRACTS.FARMING_PROJECTS.ABI,
          functionName: "createProject",
          args: [title, description, location, imageUrl, targetAmount],
        });

        // Esperar un poco y actualizar
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await fetchAllProjects();

        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error creating project");
        return null;
      }
    },
    [writeContractAsync, fetchAllProjects]
  );

  const investInProjectFn = async (projectId: number, amount: bigint) => {
    try {
      if (!writeContractAsync) {
        throw new Error("Contract not initialized or wallet not connected");
      }

      const tx = await writeContractAsync({
        address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
        abi: CONTRACTS.FARMING_PROJECTS.ABI,
        functionName: "investInProject",
        args: [BigInt(projectId)],
        value: amount,
      });

      // Esperar un poco y actualizar los proyectos
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await fetchAllProjects();

      return tx;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    loading,
    error,
    projectDetails,
    createNewProject,
    investInProjectFn,
  };
}
