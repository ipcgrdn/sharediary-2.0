import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { OrganizationProfile } from "@clerk/nextjs"

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="sidebar" className="justify-start h-[45px] w-full">
                    <Plus width={20} height={20}  className="mr-5"/>
                    초대하기
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    )
}