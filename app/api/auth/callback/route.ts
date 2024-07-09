import { callback } from "./callback"

export async function GET(request: Request){
    return (await callback(request));
}