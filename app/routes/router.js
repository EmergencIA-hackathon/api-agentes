import express from "express";
import { extractDataFromText } from "../middleware/agentsMiddleware.js";


const agentsRouter = express.Router();
agentsRouter.use(express.json());


//                 /NomeDoAgente/AçãoDoAgente
agentsRouter.post("/generico/extrairDados", extractDataFromText);


export { agentsRouter };
