"use client"

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { EmptyFavorites } from "./empty-favorites";
import { EmptyFeed } from "./empty-feed";
import { EmptySearch } from "./empty-search";
import { FeedCard } from "./feed-card";
import { FeedButton } from "./feed-button";

interface FeedListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

export const FeedList = ({orgId, query,}: FeedListProps) => {
    const data = useQuery(api.boards.get, { orgId, ...query, });

    if (data === undefined) {
        return (
            <div className="h-full w-full p-8">
                <h2 className="text-3xl">
                    {query.favorites ? "즐겨찾기" : "내 다이어리"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <FeedButton orgId={orgId} disabled />
                    <FeedCard.Skeleton />
                    <FeedCard.Skeleton />
                    <FeedCard.Skeleton />
                </div>
            </div>
        )
    }

    // if (!data?.length && query.search) {
    //     return <EmptySearch />;
    // }

    if (!data?.length && query.favorites) {
        return <EmptyFavorites />;
    }

    if (!data?.length) {
        return <EmptyFeed />;
    }

    return (
        <div className="h-full w-full p-8">
            <h2 className="text-3xl">
                {query.favorites ? "즐겨찾기" : "내 다이어리"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <FeedButton orgId={orgId} />
                {data?.map((feed) => (
                    <FeedCard key={feed._id} id={feed._id} title={feed.title} imageUrl={feed.imageUrl} authorId={feed.authorId} authorName={feed.authorName} createdAt={feed._creationTime} orgId={feed.orgId} isFavorite={feed.isFavorite} />
                ))}
            </div>
        </div>
    )
}