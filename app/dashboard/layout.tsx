import SideNav from "@/components/dashboard/sideNav"
import { Metadata } from "next"
import { auth } from "../api/auth/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title:"Dashboard"
}
export default async function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    const {user} = await auth();
    if(!user){
      return redirect("/login")
    }
    return (
      <section className="flex min-h-screen w-full">
        <SideNav />
        {children}
      </section>
    )
  }