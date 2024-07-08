import { callback } from "./callback"

export async function GET(request: Request){
    callback(request)
    return Response.json({"hey":"world"})
}