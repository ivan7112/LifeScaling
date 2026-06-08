
import express from 'express';
import cors from "cors";
import {handler} from "./src/frontend/build/handler.js";

import { loadApiArboles } from './src/backend/api/apiBackend.js';


const app=express();
const PORT=3000;

app.use(cors());

loadApiArboles(app);

app.use(handler);

app.get("/",(req,res)=>{
    res.send("Welcome to the start of this adventure");
})

app.listen(PORT,()=>{
    console.log("Servidor Corriendo");
})