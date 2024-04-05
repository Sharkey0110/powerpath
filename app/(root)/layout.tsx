import BottomBar from "@/components/shared/BottomBar";
import Topbar from "@/components/shared/TopBar";
import { currentUser } from "@clerk/nextjs";

export default async function RootLayout({ children }: { children: React.ReactNode}){
  const user = await currentUser();
  return(
      <div className="flex flex-col justify-between h-screen">
        <Topbar />
        {children}
        <BottomBar userId={user!.id} />
      </div>
  )
}