import { cookies } from  "next/headers"
import { getUsersCollection } from "../../../lib/mongodb";
import { ObjectId } from "mongodb"
import { redirect } from "next/dist/server/api-utils"

export default async function DashboardPage(){

    const cookieStore = cookies()
    const session = sessionStorage.get("session")?.value

    if(!session){
        redirect("/login")
    }

    const id = Buffer.from(session,"base64").toString("utf8")
    const col = await getUsersCollection()
    const user = await col.findOne({ _id: new ObjectId(id)})

    if(!user){
        redirect("/login")
    }

    const { senha, ...safe} = user
    safe._id = String(safe._id)

    return (
        <div style={{ padding: 24 }}>
          <h1>Bem-vindo, {safe.userName}!</h1>
          <p>ID: {safe._id}</p>
    
          <form action="/api/auth/logout" method="post">
            <button type="submit">Sair</button>
          </form>
        </div>
      );

}