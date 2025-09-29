import  { MongoClient } from "mongodb"

const uri = process.env.URIMONGOLOCAL;
const dbName = process.env.MONGODB_DB;

let client
let clientPromise

if(!uri){
    throw new Error("Defina URIMONGOLOCAL no arquivo .env.local")
}

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  await clientPromise;
  return client.db(dbName);
}


export async function getUsersCollection() {
  const db = await connectDB();
  return db.collection("apiWeb"); 
}