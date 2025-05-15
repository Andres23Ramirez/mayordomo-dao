import { useState, useCallback } from "react";
import {
  useReadContract,
  useWriteContract,
  useWatchContractEvent,
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
  const [projectDetails] = useState<ProjectDetails[]>([]);

  const { writeContractAsync } = useWriteContract();

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
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error creating project");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [writeContractAsync]
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
    [writeContractAsync]
  );

  useReadContract({
    address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
    abi: CONTRACTS.FARMING_PROJECTS.ABI,
    functionName: "getProjectDetails",
    args: [BigInt(0)],
  });

  useWatchContractEvent({
    address: CONTRACTS.FARMING_PROJECTS.ADDRESS,
    abi: CONTRACTS.FARMING_PROJECTS.ABI,
    eventName: "ProjectCreated",
    onLogs(logs) {
      console.log("New project created:", logs);
      // Here we could fetch the updated project list
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
