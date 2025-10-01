'use client'

import { useState } from "react";


export default function Page(){

    const [userName,setNome] = useState()
    const [senha,setSenha] = useState()

    const salvarDados = async() => {

        try{
            event.preventDefault();
            const resposta = await fetch("/api/users",{
                method:"POST",
                headers:{"Content-type":"Application/json"},
                body: JSON.stringify({userName: userName, senha:senha})
            })
            if(resposta.ok){
                alert("oba deu certo")
            }


        }catch(err){
            return console.error("deu erro",err)
        }

    }



    return(
        <main>
            <form onSubmit={salvarDados}>
                <input type = "text" placeholder = "Digite o userName" onChange={(event) => setNome(event.target.value)}/>

                <input type = "text" placeholder = "Digite sua senha" onChange={(event) =>setSenha(event.target.value)}/>

                <button>salvar</button>
            </form>


        </main>
    )

}