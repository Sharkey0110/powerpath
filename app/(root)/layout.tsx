import { BottomBar, Topbar } from "@/components/shared";
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