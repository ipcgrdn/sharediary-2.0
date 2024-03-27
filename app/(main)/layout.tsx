import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({children,}: Props) => {
    return (
        <>
        <MobileHeader />
        <Sidebar className="hidden lg:flex bg-gradient-to-t from-[#CC95C0] via-[#DBD4B4] to-[#7AA1D2] z-20"/>
          <main className="lg:pl-[200px] h-full p-3 pt-[50px] lg:pt-3 bg-gradient-to-tl from-[#CC95C0] via-[#DBD4B4] to-[#7AA1D2]">
            <div className="h-full bg-white rounded-lg drop-shadow-md flex flex-col z-30">
              {children}
            </div>
          </main>
        </>
    )
};

export default MainLayout;