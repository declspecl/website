"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface BranchComboboxProps {
    selectedBranch: string;
    setSelectedBranch: (branch: string) => void;
    allBranches: string[];
}

export function BranchCombobox({ allBranches, selectedBranch, setSelectedBranch }: BranchComboboxProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {selectedBranch ? allBranches.find((branch) => branch === selectedBranch) : "Select branch..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]" side="bottom">
                <Command>
                    <CommandInput placeholder="Search branch..." />
                    <CommandList>
                        <ScrollArea className="h-24">
                            <CommandEmpty>No branch found.</CommandEmpty>
                            <CommandGroup>
                                {allBranches.map((branch) => (
                                    <CommandItem
                                        key={branch}
                                        value={branch}
                                        onSelect={(currentselectedBranch) => {
                                            setSelectedBranch(currentselectedBranch);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check className={cn("mr-2 h-4 w-4", selectedBranch === branch ? "opacity-100" : "opacity-0")} />
                                        {branch}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
