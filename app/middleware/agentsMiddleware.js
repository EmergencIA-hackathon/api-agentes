import { genericDataExtractionAgent } from "../agents/agents.js";
import { scrivenerAgent } from "../agents/scrivenerAgent.js";
import { extractorAgentPromptTemplate, scrivenerAgentPromptTemplate } from "../agents/promptTemplates.js";
import { extractSpecializedData } from "./agentsFunctions.js";
import { getDateTime } from "./functions.js"


const transcribeText = async (req, res, next) => {
    try {
        const prompt = await scrivenerAgentPromptTemplate.invoke({
            text: req.body.texto_informal
        })

        req.body.texto_formalizado = await scrivenerAgent.invoke(prompt);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}


const extractGenericData = async (req, res, next) => {
    try {
        const prompt = await extractorAgentPromptTemplate.invoke({
            text: req.body.texto_formalizado
        });

        const genericJson = await genericDataExtractionAgent.invoke(prompt);


        req.body.genericJson = genericJson;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

const callSpecializedAgents = async (req, res) => {
    try {
        let ocurranceJson = req.body.genericJson;
        const crimeTypes = ocurranceJson.tipos_crimes;
        const text = req.body.texto_formalizado;

        ocurranceJson.dados_crimes = await extractSpecializedData(text, crimeTypes);
        const dateTime = getDateTime();
        ocurranceJson.dados_data_hora.data_registro_ocorrencia = dateTime.date;
        ocurranceJson.dados_data_hora.horario_registro_ocorrencia = dateTime.time;

        res.json(ocurranceJson);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export { transcribeText, extractGenericData, callSpecializedAgents }
