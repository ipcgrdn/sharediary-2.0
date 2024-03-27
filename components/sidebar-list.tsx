'use client'

import { OrganizationSwitcher, useOrganizationList } from "@clerk/nextjs"
import { SidebarIcon } from "./sidebar-icon";

export const SidebarList = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    if(!userMemberships.data?.length) return null;

    return (
        <ul className="space-y-4 py-2">
            {userMemberships.data?.map((mem) => (
                <SidebarIcon key={mem.organization.id} 
                id={mem.organization.id} name={mem.organization.name} imageUrl={mem.organization.imageUrl}/>
            ))}
        </ul>
    )
}