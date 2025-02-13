import { extractorAgent } from "../agents/agents.js";
import { extractorAgentPromptTemplate } from "../agents/promptTemplates.js";


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


const extractGenericData = async (req, res, next) => {
    try {
        const prompt = await extractorAgentPromptTemplate.invoke({
            text: req.body.texto_formalizado
        });

        const genericJson = await extractorAgent.invoke(prompt);


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

        res.json(ocurranceJson);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}


export { extractGenericData, callSpecializedAgents }
