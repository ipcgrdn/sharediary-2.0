"use client";

import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import { Hint } from "./sidebar-hint";

interface IconProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const SidebarIcon = ({ id, name, imageUrl }: IconProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div>
      <div className="relative aspect-square w-[40px] h-[40px]">
        <Hint label={name} side="top" align="start" sideOffset={10}>
          <Image
            fill
            src={imageUrl}
            alt={name}
            onClick={onClick}
            className={cn(
              "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
              isActive && "opacity-100"
            )}
          />
        </Hint>
      </div>
    </div>
  );
};
