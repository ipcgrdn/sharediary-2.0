"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Hint } from "./sidebar-hint";

export const SidebarButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="pt-2">
          <Hint label="다이어리를 생성해보세요" side="top" align="start" sideOffset={10} >
            <button className="bg-black/15 h-full w-full rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition">
              <Plus />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
