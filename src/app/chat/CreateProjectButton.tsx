"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RepositoryCombobox } from "./RepositoryCombobox";
import { useEffect, useMemo, useState } from "react";
import { Octokit } from "octokit";
import { BranchCombobox } from "./BranchCombobox";

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
    const [selectedRepository, setSelectedRepository] = useState<string>("");
    const [selectedRepositoryBranch, setSelectedRepositoryBranch] = useState<string>("");
    const [selectedRepositoryBranches, setSelectedRepositoryBranches] = useState<string[]>([]);

    useEffect(() => {
        let isCancelled = false;

        (async () => {
            const octokit = new Octokit({ auth: accessToken });
            const userInfo = await octokit.rest.users.getAuthenticated();

            let branches;
            try {
                branches = await octokit.rest.repos.listBranches({
                    repo: selectedRepository,
                    owner: userInfo.data.login
                });
            }
            catch (e) { 
                setSelectedRepositoryBranches([]);
                return;
            }

            if (isCancelled) return;
            setSelectedRepositoryBranches(branches.data.map((branch) => branch.name));
        })();

        return () => {
            isCancelled = true;
        }
    }, [accessToken, selectedRepository]);

    return (
        <Dialog>
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
                    <RepositoryCombobox selectedRepository={selectedRepository} setSelectedRepository={setSelectedRepository} allRepositories={allRepositories} />

                    {selectedRepository && selectedRepositoryBranches && (
                        <BranchCombobox allBranches={selectedRepositoryBranches} selectedBranch={selectedRepositoryBranch} setSelectedBranch={setSelectedRepositoryBranch} />
                    )}
                </div>

                <Button onClick={async () => {

                }}>Submit</Button>
            </DialogContent>
        </Dialog>
    );
}