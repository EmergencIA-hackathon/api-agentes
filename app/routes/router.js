import express from "express";
import { extractGenericData } from "../middleware/agentsMiddleware.js";


const agentsRouter = express.Router();
agentsRouter.use(express.json());


//                 /NomeDoAgente/AçãoDoAgente
agentsRouter.post("/generico/extrair", extractGenericData);


export { agentsRouter };
