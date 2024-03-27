"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization, useAuth, useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { FeedList } from "./components/feed-list";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface DiaryPageProps {
    searchParams: {
        search?: string;
        favorites?: string;
    }
}

const Diary = ({searchParams}: DiaryPageProps) => {
  const { organization } = useOrganization();

  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    <div className="h-full flex flex-col items-center justify-center">
      {!organization ? (
        <>
          <Image src="/empty.jpeg" alt="empty" width={500} height={500} />
          <h2 className="text-2xl font-semibold mt-6">
            {" "}
            다이어리가 비어있어요{" "}
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            {" "}
            다이어리를 생성하고 당신의 하루를 나누어보세요{" "}
          </p>
          <div className="mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="rose">
                  다이어리 생성하기
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization />
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : (
        <FeedList orgId={organization.id} query={searchParams} />
      )}
    </div>
    </ConvexProviderWithClerk>
  );
};

export default Diary;
