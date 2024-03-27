'use client';

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { SidebarList } from "./sidebar-list";
import { SidebarButton } from "./sidebar-button";
import { OrganizationList } from "./organization-list";
import { SearchInput } from "./search-input";
import { useOrganization } from "@clerk/nextjs";

export const SidebarItem = () => {
    const pathname = usePathname();
    const { organization } = useOrganization();
    
    return (
        <div className="flex flex-col gap-y-2 flex-1">

            <Button variant={pathname === '/diary' ? "sidebarOutline" : "sidebar"} className="justify-start h-[45px]" asChild>
                <Link href='/diary'>
                    <Home width={20} height={20} className="mr-5"/>
                    홈
                </Link>
            </Button>

            <Button variant={pathname === '/search' ? "sidebarOutline" : "sidebar"} className="justify-start h-[45px]" asChild>
                <Link href='/search'>
                    <Compass width={20} height={20} className="mr-5"/>
                    둘러보기
                </Link>
            </Button>

            <hr className="border-t border-black/25"/>
            
            {organization && (
                <OrganizationList />
            )}
            
            <hr className="border-t border-black/25"/>
            
            <SidebarButton />
            
            <SidebarList />
            
           
        </div>
    )
}