"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface RepositoryComboboxProps {
    selectedRepository: string;
    setSelectedRepository: (repository: string) => void;
    allRepositories: {
        id: number;
        name: string;
        description: string | null;
        url: string;
    }[];
}

export function RepositoryCombobox({ allRepositories, selectedRepository, setSelectedRepository }: RepositoryComboboxProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {selectedRepository ? allRepositories.find((repository) => repository.name === selectedRepository)?.name : "Select repository..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]" side="bottom">
                <Command>
                    <CommandInput placeholder="Search repository..." />
                    <CommandList>
                        <ScrollArea className="h-80">
                            <CommandEmpty>No repository found.</CommandEmpty>
                            <CommandGroup>
                                {allRepositories.map((repository) => (
                                    <CommandItem
                                        key={repository.name}
                                        value={repository.name}
                                        onSelect={(currentselectedRepository) => {
                                            setSelectedRepository(currentselectedRepository);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check className={cn("mr-2 h-4 w-4", selectedRepository === repository.name ? "opacity-100" : "opacity-0")} />
                                        {repository.name}
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
