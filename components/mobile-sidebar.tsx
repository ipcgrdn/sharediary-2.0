import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="p-0 z-[100] w-[270px]" side='left'>
              <Sidebar />
            </SheetContent>
        </Sheet>
    )
}