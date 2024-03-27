'use client'

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./feed-overlay";
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from "@clerk/nextjs";
import { FeedFooter } from "./feed-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface FeedCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
};

export const FeedCard = ({id, title, authorId, authorName, createdAt, imageUrl, orgId, isFavorite}: FeedCardProps) => {
    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "나" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    })

    const { 
        mutate: onFavorite, pending: pendingFavorite,
    } = useApiMutation(api.board.favorite);
    const {
        mutate: onUnFavorite, pending: pendingUnFavorite,
    } = useApiMutation(api.board.unFavorite);

    const toggleFavorite = () => {
        if(isFavorite) {
            onUnFavorite({ id })
                .catch(() => toast.error("오류가 발생했습니다"))
        } else {
            onFavorite({ id, orgId })
                .catch(() => toast.error("오류가 발생했습니다"))
        }
    };

    return (
        <Link href={`/diary/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1">
                    <Image src={imageUrl} alt={title} fill className="object-fill" />
                    <Overlay />
                    <Actions id={id} title={title} side="right" sideOffset={18}>
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>
                    </Actions>
                </div>
                <FeedFooter isFavorite={isFavorite} title={title} authorLabel={authorLabel} createdAtLabel={createdAtLabel} onClick={toggleFavorite} disabled={pendingFavorite || pendingUnFavorite} />
            </div>
        </Link>
    )
}

FeedCard.Skeleton = function FeedCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}