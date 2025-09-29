import { NextResponse } from "next/server";
import { getUsersCollection } from "../../../../../lib/mongodb";

export async function POST (req) {
    try{ 
        const { userName, senha} = await req.json()
        if(!userName || !senha ){
            return NextResponse.json({ error: "userName e senha sao obrigatorios"})
        }

        const col = await getUsersCollection()
        const user = await col.findOne({ userName })

        if( !user || user.senha !== senha){
            return NextResponse.json({ error: "credenciais invalidas"},{ status:401})
        }
        //parte de credencial por enquanto
        const sessionValue = buffer.from(String(user._id)).toString("base64")

        const res = NextResponse.json(
            { message:"autenticado com sucesso", user: { _id: String(user_id),userName: user.name}},
            { status: 200 }
        )
        // Cookie HttpOnly (não acessível via JS). Em produção, assine/criptografe esse valor.
        res.cookies.set({
            name: "session",
            value: sessionValue,
            httpOnly: true,
            path:"/",
            maxAge: 60*60*24*7, //7dias
            sameSite:"lax"
        })

        return res;
    }catch(err){
        console.error("POST;api;auth;login error:",err)
        return NextResponse.json({ error: err?.message || "Erro no login"}, { status: 500})
    }
}