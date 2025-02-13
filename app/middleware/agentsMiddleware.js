import { extractorAgent } from "../agents/agents.js";
import { extractorAgentPromptTemplate } from "../agents/promptTemplates.js";


const extractGenericData = async (req, res, next) => {
    try {
        const prompt = await extractorAgentPromptTemplate.invoke({
            text: req.body.texto_formalizado
        });

        const genericJson = await extractorAgent.invoke(prompt);

        res.json(genericJson);
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}


export { extractGenericData }
