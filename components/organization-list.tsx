import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { InviteButton } from "./invite-button";

export const OrganizationList = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");

  return (
    <div className="gap-y-2 flex flex-col">

      <div className="space-y-2">
        <Button
          variant="sidebar"
          className="justify-start h-[45px] w-full"
          asChild
        >
          <Link href={"/diary"}>
            <LayoutDashboard width={20} height={20} className="mr-5" />내
            다이어리
          </Link>
        </Button>

        <Button
          variant={favorites ? "sidebarOutline" : "sidebar"}
          className="justify-start h-[45px] w-full"
          asChild
        >
          <Link href={{ pathname: "/diary", query: { favorites: true } }}>
            <Star width={20} height={20} className="mr-5" />
            즐겨찾기
          </Link>
        </Button>
      </div>

      <InviteButton />
    </div>
  );
};
