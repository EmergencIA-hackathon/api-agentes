import express from "express";
import { extractDataFromText } from "../middleware/agentsMiddleware.js";


const agentsRouter = express.Router();
agentsRouter.use(express.json());


agentsRouter.post("/extract", extractDataFromText);


export { agentsRouter };
