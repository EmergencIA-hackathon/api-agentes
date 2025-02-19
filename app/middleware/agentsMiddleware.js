import { genericDataExtractionAgent } from "../agents/agents.js";
import { theftDataExtractionAgent } from "../agents/theftAgent.js";
import { extractorAgentPromptTemplate, extractorTheftAgentPromptTemplate } from "../agents/promptTemplates.js";


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

const extractTheftData = async (req, res, next) => {
    try{
        const prompt = await extractorTheftAgentPromptTemplate.invoke({
            text:req.body.texto_formalizado
        })

        const theftJson = await theftDataExtractionAgent.invoke(prompt)

        req.body.theftJson = theftJson;
        next(); // esse next faz o que ?
    } catch(error){
        console.error(error);
        res.status(500).send(error);
    }
}

export { extractGenericData, callSpecializedAgents }
