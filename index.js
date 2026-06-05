
import express from 'express';
const app=express();
const PORT=3000;



app.get("/",(req,res)=>{
    res.send("Welcome to the start of this adventure");
})

app.listen(PORT,()=>{
    console.log("Servidor Corriendo");
})