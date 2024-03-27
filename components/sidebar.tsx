import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn("flex h-full lg:w-[200px] lg:fixed left-0 top-0 px-4 flex-col", className,)}>

            <Link href='/' className="pt-4 pl-2 pb-7 flex items-center gap-x-2">
                <Image src="/Sharediary_logo.png" height={30} width={30} alt="ShareDiary"/>
                <h1 className="text-xl font-semibold">
                    ShareDiary
                </h1>
            </Link>
            
            <SidebarItem />

            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
            </div>
        </div>
    )
}