"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({children, side, sideOffset, id, title}: ActionsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);
    
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/diary/${id}`,
        )
        .then(() => toast.success("링크가 복사되었습니다"))
        .catch(() => toast.error("오류가 발생하였습니다"))
    }

    const onDelete = () => {
        mutate({ id })
        .then(() => toast.success("피드가 삭제되었습니다"))
        .catch(() => toast.error("오류가 발생하였습니다"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => {e.stopPropagation()}} side={side} sideOffset={sideOffset} className="w-60">
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2"/>
                    링크 복사하기 
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
                    <Pencil className="h-4 w-4 mr-2"/>
                    제목 변경하기 
                </DropdownMenuItem>
                <ConfirmModal header="피드를 삭제하시겠습니까?" description="피드에 담겨있던 모든 내용이 지워집니다." disabled={pending} onConfirm={onDelete}>
                    <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal text-red-600">
                        <Trash2 className="h-4 w-4 mr-2"/>
                        삭제하기
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}