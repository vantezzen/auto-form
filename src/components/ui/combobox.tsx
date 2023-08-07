"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
  users,
  selectedUser,
  setSelectedUser,
}: {
  users: string[];
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-[#666]"
        >
          {selectedUser
            ? users.find((user) => user === selectedUser)
            : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative w-full p-0">
        <div className="w-full">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user}
                  onSelect={() => {
                    setSelectedUser((prevUser) =>
                      prevUser === user ? "" : user
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser === user ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
