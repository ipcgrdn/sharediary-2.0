"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const EmptyFeed = () => {
    const router= useRouter();
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if(!organization) return;

        mutate({
            orgId: organization.id,
            title: "제목 없음"
        })
        .then((id) => {
            toast.success("피드가 생성되었습니다!")
            router.push(`/diary/${id}`)
        })
        .catch(() => toast.error("오류가 발생했습니다"))
    }

    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/empty-feed.png" height={140} width={140} alt="empty"/>
            <h2 className="text-2xl font-semibold mt-6"> 다이어리가 비어있습니다 </h2>
            <p className="text-muted-foreground text-sm mt-2">
                당신의 하루를 기록해보세요!
            </p>
            <div className="mt-6">
                <Button disabled={pending} variant="rose" onClick={onClick}>
                    다이어리 쓰기
                </Button>
            </div>
        </div>
    )
}