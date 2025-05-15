import { useState, useCallback, useEffect } from "react";
import {
  useReadContract,
  useWriteContract,
  useWatchContractEvent,
  usePublicClient,
} from "wagmi";
import { CONTRACTS } from "../config/contracts";

export type ProjectDetails = {
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
  const { data: totalProjects } = useReadContract({
    address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
    abi: CONTRACTS.FARMING_PROJECTS.ABI,
    functionName: "projectCounter",
  });

  const fetchProjectDetails = useCallback(
    async (projectId: number) => {
      if (!publicClient) return null;

      try {
        const result = await publicClient.readContract({
          address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
          abi: CONTRACTS.FARMING_PROJECTS.ABI,
          functionName: "getProjectDetails",
          args: [BigInt(projectId)],
        });

        if (result) {
          const [
            owner,
            title,
            description,
            location,
            imageUrl,
            targetAmount,
            currentAmount,
            isActive,
          ] = result;
          return {
            owner,
            title,
            description,
            location,
            imageUrl,
            targetAmount,
            currentAmount,
            isActive,
          };
        }
      } catch (err) {
        console.error(`Error fetching project ${projectId}:`, err);
      }
      return null;
    },
    [publicClient]
  );

  const fetchAllProjects = useCallback(async () => {
    if (!totalProjects) return;

    setLoading(true);
    try {
      const count = Number(totalProjects);
      const projects = await Promise.all(
        Array.from({ length: count }, (_, i) => fetchProjectDetails(i + 1))
      );
      setProjectDetails(projects.filter((p) => p !== null) as ProjectDetails[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching projects");
    } finally {
      setLoading(false);
    }
  }, [totalProjects, fetchProjectDetails]);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  const createNewProject = useCallback(
    async (
      title: string,
      description: string,
      location: string,
      imageUrl: string,
      targetAmount: bigint
    ): Promise<string | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await writeContractAsync({
          address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
          abi: CONTRACTS.FARMING_PROJECTS.ABI,
          functionName: "createProject",
          args: [title, description, location, imageUrl, targetAmount],
        });
        await fetchAllProjects(); // Refresh the projects list after creating a new one
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error creating project");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [writeContractAsync, fetchAllProjects]
  );

  const investInProjectFn = useCallback(
    async (projectId: number, amount: bigint): Promise<string | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await writeContractAsync({
          address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
          abi: CONTRACTS.FARMING_PROJECTS.ABI,
          functionName: "investInProject",
          args: [BigInt(projectId)],
          value: amount,
        });
        await fetchAllProjects(); // Refresh the projects list after investing
        return result;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error investing in project"
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [writeContractAsync, fetchAllProjects]
  );

  useWatchContractEvent({
    address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
    abi: CONTRACTS.FARMING_PROJECTS.ABI,
    eventName: "ProjectCreated",
    onLogs() {
      fetchAllProjects();
    },
  });

  return {
    loading,
    error,
    projectDetails,
    createNewProject,
    investInProjectFn,
  };
}
