
import express from 'express';
import cors from "cors";
import {handler} from "./src/frontend/build/handler.js";

import { loadApiArboles } from './src/backend/api/apiBackend.js';

let BASE_URL_API="./api/v1";


const app=express();
const PORT=3000;

app.use(cors());

loadApiArboles(app);

app.use(handler);



app.listen(PORT,()=>{
    console.log("Servidor Corriendo");
})