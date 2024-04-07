import BottomBar from "@/components/shared/BottomBar";
import LeftBar from "@/components/shared/LeftBar";
import Topbar from "@/components/shared/TopBar";
import { currentUser } from "@clerk/nextjs";

export default async function RootLayout({ children }: { children: React.ReactNode}){
  const user = await currentUser();
  return(
      <div className="flex flex-col justify-between h-screen">
        <Topbar />
        <div className="flex">
          <LeftBar userId={user!.id} />
          <div className="flex-1 sm:ml-24 lg:ml-56 pt-16 ">
          {children}
          </div>
        </div>

        <BottomBar userId={user!.id} />
      </div>
  )
}