"use client";

import { Actions } from "@/components/actions";
import { Hint } from "@/components/sidebar-hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface InfoProps {
  diaryId: string;
}

const TapSeparator = () => {
    return (
        <div className="text-black/75 px-1.5">
            |
        </div>
    )
};

export const Info = ({ diaryId }: InfoProps) => {
    const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: diaryId as Id<"boards">,
  });

  if (!data) return;

  return (
    <div className="absolute top-4 left-4 bg-black/5 rounded-md px-1.5 h-12 flex items-center justify-center shadow-md">
        <Hint label="홈" side="bottom" sideOffset={10}>
      <Button variant="sidebar" className="px-2">
        <Link href="/diary">
          <Image src="/Sharediary_logo.png" alt="Logo" height={30} width={30} />
        </Link>
      </Button>
      </Hint>
      <TapSeparator />
      <Hint label="이름 편집" side="bottom" sideOffset={10}>
      <Button variant="sidebar" className="text-base font-bold px-2" onClick={() => onOpen(data._id, data.title)}>
        {data.title}
      </Button>
      </Hint>
      <TapSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
            <Hint label="메뉴" side="bottom" sideOffset={10}>
                <Button variant="sidebar" size="icon">
                    <Menu />
                </Button>
            </Hint>
        </div>
      </Actions>
    </div>
  );
};
