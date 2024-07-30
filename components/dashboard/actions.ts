"use server"

import { revalidatePath } from "next/cache"

export async function revalidate(){
    revalidatePath("/dashboard/invoices");
    revalidatePath("/dashboard/customers");
}