import { Ubuntu } from "next/font/google";
import Link from "next/link";

const ubuntu = Ubuntu({weight:["500"], subsets:["latin"]})
export default function Nav(){
    return (
        <>
        <div>
            <nav className={`flex items-center p-8 bg-[#071952] text-[#EBF4F6]  justify-between lg:flex-row md:flex-row ${ubuntu.className}`}>
              <div>
                <h2 className="text-xl">Business Manager</h2>
              </div>
              <div className="lg:flex gap-8 md:flex hidden">
                <Link href={'/'}>Home</Link>
                <Link href={'#about'}>About</Link>
                <Link href={'/login'}>Login</Link>
              </div>
            </nav>
        </div>
        </>
    )
}