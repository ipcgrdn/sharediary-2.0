import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                    <div className="h-[32px] w-full mr-4" >
                        <h1>© ShareDiary, Inc.</h1>
                    </div>
                <Button size='lg' variant='roseOutline' className="w-full">
                    <div className="h-[32px] w-[40px] mr-4 rounded-md">
                        정책
                    </div>
                </Button>
                <Button size='lg' variant='roseOutline' className="w-full">
                    <div className="h-[32px] w-[40px] mr-4 rounded-md">
                        약관
                    </div>
                </Button>
                <Button size='lg' variant='roseOutline' className="w-full">
                    <div className="h-[32px] w-[40px] mr-4 rounded-md">
                        쿠키 설정
                    </div>
                </Button>
                <Button size='lg' variant='roseOutline' className="w-full">
                    <div className="h-[32px] w-[40px] mr-4 rounded-md">
                        더 알아보기
                    </div>
                </Button>
            </div>
        </footer>
    )
}