import { genericDataExtractionAgent } from "../agents/agents.js";
import { extractorAgentPromptTemplate } from "../agents/promptTemplates.js";
import { extractSpecializedData } from "./agentsFunctions.js";


function getDateTime() {
    let dateObj = new Date();

    const time = dateObj.toTimeString().slice(0,5);
    const day = dateObj.getDate() > 9 ? dateObj.getDate() : `0${dateObj.getDate()}`;
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    
    const dateTime = {
        date: `${day}/${month}/${year}`,
        time: time
    };

    return dateTime;
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

export { extractGenericData, callSpecializedAgents }
