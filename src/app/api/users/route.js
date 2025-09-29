import { NextResponse } from "next/server"
import { getUsersCollection } from "@lib/mongodb"


export async function GET() {
  try {
    const collection = await getUsersCollection();
    const users = await collection.find({}).toArray();
    return NextResponse.json(users);
  } catch (err) {
    console.error("Erro detalhado:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {

    try{
        const collection = await getUsersCollection()
        const { userName, senha } = await req.json()

        if(!userName || !senha){
            return NextResponse.json(
                { Error:"preencha o Username, senha"},
                { status: 400}
            )
        }
        const resposta = await collection.insertOne({
            userName,
            senha,
            createdAt: new Date()
        })

        return NextResponse.json(
            { message: " Usuario cadastrado com sucesso!", id: resposta.insertedId},
            { status: 201}
        )
    }catch(err){
        console.error("Erro no Post", err)
        return NextResponse.json({ error: "Erro ao cadastrar aluno"},{ status: 500 })
    }
    
}

export async function PUT(req) {

    try{
        const collection = await getUsersCollection()
        const { id, userName,senha } = await req.json()

        if( !id ){
            return NextResponse.json(
                { error: "Informe o ID do usuário para atualizar"},
                { status: 400}
            )
        }
        const updateDoc = {};
        if(userName) updateDoc.userName = userName;
        if(senha) updateDoc.senha = senha;

        const resposta = await collection.updateOne(
            {id: new Object(id)},
            { $set: updateDoc}
        )

        if(resposta.matchedCount === 0){
            return NextResponse.json(
                { error: "usuario nao encontrado" },
                { status: 404}
            )
        }

        return NextResponse.json(
            { message: "usuario atualizado com sucesso"},
            { status: 200 }
        )

    }catch(err){
        console.log("erro no PUT",err)
        return NextResponse.json(
            { error:"ERRO AO ATUALIZAR USUARIO" },
            { status: 500}
        )

    }
    
}

export async function DELETE(req) {
  try {
    const collection = await getUsersCollection();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Informe o ID do usuário para deletar" },
        { status: 400 }
      );
    }

    const resposta = await collection.deleteOne({ _id: new ObjectId(id) });

    if (resposta.deletedCount === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuário deletado com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro no DELETE:", err);
    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}