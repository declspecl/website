"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data
const mockRepositories = [
    "frontend-app",
    "backend-api",
    "mobile-app",
    "design-system",
    "documentation",
    "analytics-dashboard",
    "auth-service",
    "payment-gateway",
    "notification-service",
    "user-management"
];

const mockBranches = ["main", "develop", "feature/auth", "feature/payments", "bugfix/login", "release/v1.0"];

interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectRepo: (repo: string) => void;
}

export function CreateProjectDialog({ open, onOpenChange, onSelectRepo }: CreateProjectDialogProps) {
    const [selectedRepo, setSelectedRepo] = useState<string>("");
    const [selectedBranch, setSelectedBranch] = useState<string>("");

    const handleCreate = () => {
        if (selectedRepo) {
            onSelectRepo(selectedRepo);
            onOpenChange(false);

            // Reset form
            setSelectedRepo("");
            setSelectedBranch("");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>Select a GitHub repository and branch to create a new project.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="repository">Repository</Label>
                        <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                            <SelectTrigger id="repository">
                                <SelectValue placeholder="Select repository" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockRepositories.map((repo) => (
                                    <SelectItem key={repo} value={repo}>
                                        {repo}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedRepo && (
                        <div className="grid gap-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                                <SelectTrigger id="branch">
                                    <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockBranches.map((branch) => (
                                        <SelectItem key={branch} value={branch}>
                                            {branch}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={!selectedRepo}>
                        Create Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
