"use client";

import { Octokit } from "octokit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BranchCombobox } from "./BranchCombobox";
import { RepositoryCombobox } from "./RepositoryCombobox";
import { LucideLoader2, LucidePlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CreateProjectButtonProps {
    accessToken: string;
    allRepositories: {
        id: number;
        name: string;
        description: string | null;
        url: string;
    }[];
}

export function CreateProjectButton({ accessToken, allRepositories }: CreateProjectButtonProps) {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRepository, setSelectedRepository] = useState<string>("");
    const [selectedRepositoryBranch, setSelectedRepositoryBranch] = useState<string>("");
    const [selectedRepositoryBranches, setSelectedRepositoryBranches] = useState<string[]>([]);
    const [projectCreationStatus, setProjectCreationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        let isCancelled = false;

        (async () => {
            const octokit = new Octokit({ auth: accessToken });
            const userInfo = await octokit.rest.users.getAuthenticated();

            if (!selectedRepository) {
                setSelectedRepositoryBranches([]);
                return;
            }

            let branches;
            try {
                branches = await octokit.rest.repos.listBranches({
                    repo: selectedRepository,
                    owner: userInfo.data.login
                });
            } catch (e) {
                setSelectedRepositoryBranches([]);
                return;
            }

            if (isCancelled) {
                return;
            }
            setSelectedRepositoryBranches(branches.data.map((branch) => branch.name));
            setSelectedRepositoryBranch(branches.data[0].name);
        })();

        return () => {
            isCancelled = true;
        };
    }, [accessToken, selectedRepository]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex flex-row gap-2">
                    <span>Create new project</span>
                    <LucidePlusCircle className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <RepositoryCombobox
                        selectedRepository={selectedRepository}
                        setSelectedRepository={setSelectedRepository}
                        allRepositories={allRepositories}
                    />

                    {selectedRepository && selectedRepositoryBranches && (
                        <BranchCombobox
                            allBranches={selectedRepositoryBranches}
                            selectedBranch={selectedRepositoryBranch}
                            setSelectedBranch={setSelectedRepositoryBranch}
                        />
                    )}
                </div>

                <Button disabled={projectCreationStatus === "loading"} onClick={async () => {
                    if (!selectedRepository || !selectedRepositoryBranch) return;

                    setProjectCreationStatus("loading");

                    try {
                        const response = await fetch("/api/repository", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                repositoryName: selectedRepository,
                                repositoryBranch: selectedRepositoryBranch
                            })
                        });
                    }
                    catch (e) {
                        setProjectCreationStatus("error");
                        return;
                    }

                    setProjectCreationStatus("success");
                    setIsDialogOpen(false);
                    
                    router.push(`/chat/${selectedRepository}`);
                }}>
                    {projectCreationStatus === "loading" ? <LucideLoader2 className="w-4 h-4 animate-spin" /> : "Create Project"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
