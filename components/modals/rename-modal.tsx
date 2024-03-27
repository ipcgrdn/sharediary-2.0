"use client"

import { useRenameModal } from "@/store/use-rename-modal"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update);

    const { isOpen, onClose, initialValues, } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e,) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
        .then(() => {
            toast.success("제목이 변경되었습니다!")
            onClose();
        })
        .catch(() => toast.error("오류가 발생했습니다"));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        제목 변경하기
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    새로운 제목을 입력해주세요
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input disabled={pending} required maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="sidebar">
                                취소
                            </Button>
                        </DialogClose>
                            <Button type="submit" disabled={pending} variant="sidebarOutline">
                                저장
                            </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}