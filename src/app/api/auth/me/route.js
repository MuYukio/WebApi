import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUsersCollection } from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { error } from "console";

export async function GET() {
    
    try{
        const cookieStore = cookies();
        const session = cookieStore.get("session")?.value

        if(!session)
            return NextResponse.json({ user: null}, { status: 200})

        const id = Buffer.from(session, "base64").toString("utf8")
        const col = await getUsersCollection()
        const user = await col.findOne({ _id: new ObjectId(id)})

        if(!user)
            return NextResponse.json({ user: null},{ status: 200})

        const { senha, ...safe } = user
        safe._id = String(safe._id)
        return NextResponse.json({ error: err?.message || "Erro"},{ status: 500})
    
    }catch(err){
        console.error("GET /API/auth/me error:",err)
        return NextResponse.json({ error: err?.message || "Erro"}, { status: 500})
    }

}