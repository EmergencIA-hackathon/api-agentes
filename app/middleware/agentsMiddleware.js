import { genericDataExtractionAgent } from "../agents/agents.js";
import { extractorAgentPromptTemplate, scrivenerAgentPromptTemplate } from "../agents/promptTemplates.js";
import { chatGPTModel } from "../agents/baseLLM.js";


const callScrivener = async (req, res, next) => {
    try {
        const prompt = await scrivenerAgentPromptTemplate.invoke({
            text: req.body.texto // Texto a ser corrigido
        });

        const formalizedResponse = await chatGPTModel.invoke(prompt);

        req.body.texto_formalizado = formalizedResponse.choices[0].message.content;
        next();
    } catch (error) {
        console.error("Erro ao formalizar o texto:", error);
        res.status(500).send("Erro ao formalizar o texto.");
    }
};


const extractSpecializedData = (text, crimesArray) => {
    // Esse código é temporário e não é representativo
    // do que a função deve e vai fazer no futuro.
    let specializedJsonArr = []

    for (let crime of crimesArray) {
        // Fazendo coisas com o texto formalizado...
        specializedJsonArr.push({ tipo_crime: crime });
    }

    return specializedJsonArr;
}


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



const callSpecializedAgents = (req, res) => {
    try {
        let ocurranceJson = req.body.genericJson;
        const crimeTypes = ocurranceJson.tipos_crimes;
        const text = req.body.texto_formalizado;

        ocurranceJson.dados_crimes = extractSpecializedData(text, crimeTypes);
        const dateTime = getDateTime();
        ocurranceJson.dados_data_hora.data_registro_ocorrencia = dateTime.date;
        ocurranceJson.dados_data_hora.horario_registro_ocorrencia = dateTime.time;

        res.json(ocurranceJson);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}


export { extractGenericData, callSpecializedAgents, callScrivener }