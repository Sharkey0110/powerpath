import BottomBar from "@/components/shared/BottomBar";
import Topbar from "@/components/shared/TopBar";
import { auth } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode}){
  const { sessionClaims } = auth()
  return(
      <div className="flex flex-col justify-between h-screen">
        <Topbar />
        {children}
        <BottomBar />
      </div>
  )
}