import express from "express";
import { Router } from "express";
import { callScrivener } from "../middleware/agentsMiddleware.js";

// Configuração do roteador
const router = Router();
const app = express();
app.use(express.json()); // Middleware para interpretar JSON


// Rota POST para receber o texto
router.post("/escrivao", callScrivener, async (req, res) => {
    try {
        // Envia o texto formalizado para o agente genérico
        await extractGenericData(req, res); // Chama diretamente e aguarda a execução

        const jsonData = {
            texto_corrigido: req.body.texto_formalizado,
            // Adicione outros campos conforme necessário
        };

        // Retornar o JSON como resposta
        res.json(jsonData);
    } catch (error) {
        console.error("Erro ao enviar para o agente genérico:", error);
        res.status(500).send("Erro ao enviar para o agente genérico.");
    }
});


export default router;