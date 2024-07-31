import EditInvoice from "@/components/dashboard/EditForm";

export default function Page({params}:{params:{id:string}}){
  return (
    <><EditInvoice id={params.id} /></>
  )
}