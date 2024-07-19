import SideNav from "@/components/dashboard/sideNav"
import { Metadata } from "next"

export const metadata: Metadata = {
    title:"Dashboard"
}
export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="flex min-h-screen">
        <SideNav />
        {children}
      </section>
    )
  }