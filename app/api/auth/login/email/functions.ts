import { cookies } from "next/headers";
import { auth, lucia } from "../../auth";
import { redirect } from "next/navigation";

export function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}
//some functions not related to auth
export function stringDateToYearDays(stringDate:string){
    //takes a string like Tue Dec 31 2024 and returns 366 as in the number of days in a year that string is
    const dayTokens = stringDate.split(" ")
    const months = [
        {
            month:"Jan",
            days: 31
        },
        {
            month:"Feb",
            days: parseInt(dayTokens[3]) % 4 === 0 ? 29 : 28
        },
        {
            month: "Mar",
            days:31
        },
        {
            month:"Apr",
            days:30
        },
        {
            month:"May",
            days:31
        },
        {
            month:"Jun",
            days:30
        },
        {
            month:"Jul",
            days:31
        },
        {
            month:"Aug",
            days:31
        },
        {
            month:"Sep",
            days:30
        },
        {
            month:"Oct",
            days:31
        },
        {
            month:"Nov",
            days:30
        },
        {
            month:"Dec",
            days:31
        }
    ]
    let days = 0;
    let accumulatedDays = 0
    for (let i = 0; i < months.length; i++){
        if(months[i].month === dayTokens[1]){
            accumulatedDays += parseInt(dayTokens[2])
            break
        }
        accumulatedDays += months[i].days
    }
    days = accumulatedDays;
    return days
}

export function isWithinAWeek(base:string, target:string){
    const baseTokens = base.split(" ");
    const targetTokens = target.split(" ")
    if(baseTokens[3] !== targetTokens[3]){
        return false
    }
    const baseDays = stringDateToYearDays(base);
    const targetDays = stringDateToYearDays(target);
    return baseDays - targetDays < 8
}

export function isWithinAMonth(base:string, target:string){
    const baseDays = stringDateToYearDays(base);
    const targetDays = stringDateToYearDays(target);
    return baseDays - targetDays < 31
}

export async function signOut(){
    const cookie = cookies();
    const {session} = await auth()
    if(!session){
        return redirect("/login")
    }
    await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/")
}