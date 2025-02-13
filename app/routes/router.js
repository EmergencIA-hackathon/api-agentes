import express from "express";
import { extractGenericData, callSpecializedAgents } from "../middleware/agentsMiddleware.js";


const agentsRouter = express.Router();
agentsRouter.use(express.json());


//                 /NomeDoAgente/AçãoDoAgente
agentsRouter.post("/generico/extrair", extractGenericData, callSpecializedAgents);


export { agentsRouter };
