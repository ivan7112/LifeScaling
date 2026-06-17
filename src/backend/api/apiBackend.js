
import {MongoClient, ServerApiVersion} from 'mongodb';

async function loadApiArboles(app){
    
    
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


    app.get('/graphs',(req,res)=>{
        const data=col.find();
        return data;

    })


}


async function connectToDB(client){
    await client.connect();
}

export {loadApiArboles};