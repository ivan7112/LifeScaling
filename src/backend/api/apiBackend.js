
import {MongoClient, ServerApiVersion} from 'mongodb';
import dns from "node:dns/promises";
import { ObjectId } from 'mongodb';

async function loadApiArboles(app){
    dns.setServers(["1.1.1.1"]);    
    
    let mongoUri='mongodb+srv://ivanneo711_db_user:WxVmDuIcVexnm3Bi@graphdb.imvucly.mongodb.net/?appName=GraphDB';

    const client=new MongoClient(mongoUri, {serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true

    }, family:4});
    
    connectToDB(client).then(()=>{
        console.log("Db conectada");
    }).catch((e)=>{
        console.log("Error al conectar a la DB. El error es: ", e);
    });

    const db=client.db('GraphDB');
    const col=db.collection('trees');

    const BASE_URL_API="/api/v1";

    //GET
    app.get(BASE_URL_API+'/graphs',async (req,res)=>{
        const data=await col.find().toArray();
        res.status(200);
        return res.json(data)
    });

    app.get(BASE_URL_API+"/graphs/:id",async (req,res)=>{
        const data=await col.findOne({_id:new ObjectId(req.params.id)});
        console.log(req.params.id);
        res.status(200);
        return res.json(data);
    });

    //POST
    app.post(BASE_URL_API+'/graphs',async (req,res)=>{
        if(!(req.body.nodes && req.body.edges && req.body.name &&req.body.image)) res.sendStatus(400);
        //Verificar sintáxis nodos-edges? Replicados?

        await col.insertOne({nodes:req.body.nodes, edges:req.body.edges, name:`${req.body.name}`,
            image:`${req.body.image}`});
        return res.sendStatus(201);
    });

    app.post(BASE_URL_API+'/graphs/:id',async (req,res)=>{
        return res.sendStatus(405);
    });

    //PUT

    app.put(BASE_URL_API+'/graphs/:id', async (req,res)=>{

        if(!(req.body.nodes && req.body.edges && req.body.name)) res.sendStatus(400);

        await col.updateOne({_id:`${req.params.id}`},
            {$set:{nodes:`${req.body.nodes}`,edges:`${req.body.edges}`,name:`${req.body.name}`}});
        res.sendStatus(200);
    });

    app.put(BASE_URL_API+'/graphs', async (req,res)=>{
        res.sendStatus(405);
    });


    //DELETE

    app.delete(BASE_URL_API+'/graphs',async (req,res)=>{
        await col.deleteMany({});
        res.sendStatus(200);
    });

    app.delete(BASE_URL_API+'/graphs/:id', async (req,res)=>{
        await col.deleteOne({_id:new ObjectId(req.params.id)});
        return res.sendStatus(200);
    });


}

//---------------------------------- Usar connect, close en cada operación?
async function connectToDB(client){
    await client.connect();
}

async function disconnect(client){
    await client.close();
}

export {loadApiArboles};