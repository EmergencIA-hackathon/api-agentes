import { extractorAgent } from "../agents/agents.js";
import { extractorAgentPromptTemplate } from "../agents/promptTemplates.js";


const extractDataFromText = async (req, res, next) => {
    try {
        const prompt = await extractorAgentPromptTemplate.invoke({
            text: req.body.prompt
        });

        const response = await extractorAgent.invoke(prompt);

        const jsonPayload = {
            sucess: true,
            data: {
                text: response
            }
        };

        res.json(jsonPayload.data);

    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}


export { extractDataFromText }
