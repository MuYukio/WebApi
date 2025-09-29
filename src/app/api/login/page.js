"use client"

import { useState } from "react"
import { useRouter } from "next/router"

export default function LoginPage(){

    const [userName, setUserName] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState("")
    const router = userRouter()

    async function handleSubmit(e){
        e.preventDefault()
        setDefaultResultOrder("")
        setLoading(true)


        try{
            const res = await fetch("/api/auth/login",{
                method: "POST",
                headers: { "Content-type" : "application/json"},
                body: JSON.stringify({ userName,senha})
            })

            const data = await res.json()
            if (!res.ok){
                setDefaultResultOrder(data.error || "Erro ao logar")
                setLoading(false)
                return
            }
            router.push("/dashboard")
        
        } catch(err){
            setError ("Error de rede")
        }finally{
            setLoading(false)
        }
    }
    return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username</label>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} style={{ width: "100%" }} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );


}