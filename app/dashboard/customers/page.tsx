import Customers from "@/components/dashboard/customers";
export const revalidate = 20;

export default function Page(){
    return (
      <>
        <Customers />
      </>
    )
}