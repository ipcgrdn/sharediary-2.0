"use client"

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils"; 
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FeedButtonProps {
    orgId: string;
    disabled?: boolean;
};

export const FeedButton = ({orgId, disabled,}: FeedButtonProps) => { 
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId,
            title: "제목 없음"
        })
        .then((id) => {
            toast.success("피드가 생성되었습니다!")
            router.push(`/diary/${id}`)
        })
        .catch(() => toast.error("오류가 발생하였습니다"))
    }

    return ( 
        <button disabled={pending || disabled} onClick={onClick} className={cn("col-span-1 aspect-[100/127] rounded-lg bg-black/10 hover:bg-black/15 flex flex-col items-center justify-center py-6", (pending ||disabled) && "bg-black/15 hover:black/15 cursor-not-allowed")} >
            <div />
            <Plus className="h-12 w-12 stroke-1" />
            <p className="text-sm font-medium mt-1">
                새로운 피드
            </p>
        </button>
    )
}