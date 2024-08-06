import { clientPromise } from "@/app/api/mongodb";
import { CapitalForm, PercentForm } from "./SettingsForm";
import { auth } from "@/app/api/auth/auth";

export default async function Settings(){
    const {user} = await auth()
    if(!user){
        return;
    }
    const client = await clientPromise;
    const db = client.db("BusinessManager");
    const businesses = db.collection("businesses");
    const business = await businesses.findOne({userId:user.id.toString()});
    if (!business){
        return
    }
    const sign = business.currency === "naira" ? "₦" : "$";
    return (
        <>
         <div className="flex w-full flex-col items-center justify-evenly gap-4 pt-4">
             <div>
                <h2 className="text-2xl">Business Settings</h2>
             </div>
             <div className="flex flex-col items-center justify-center text-center gap-1 p-4">
                <h3 className="text-xl">Capital and Expenses Settings ({sign})</h3>
                <p>Add your total business capital and expense used a week, for profit generation</p>
                <CapitalForm userId={user.id.toString()} />
             </div>
             <div className="flex flex-col items-center justify-center gap-1 text-center p-4">
                <h3 className="text-xl">Pay Cycle:</h3>
                <p>On what basis do you earn income.</p>
                <PercentForm userId={user.id.toString()} />
             </div>
         </div>
        </>
    )
}