import Image from "next/image";

export default function Topbar(){
    return(
        <header className=" z-10 fixed top-0 flex px-4 py-2 h1 justify-between items-center bg-primary w-screen">
            <div>
                <h1 className="h1">PowerPath</h1>
            </div>

            <div>
                <Image src='/logo.png' alt="logo" width={80} height={80} />
            </div>
        </header>
    )
}