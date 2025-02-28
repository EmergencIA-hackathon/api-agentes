import { theftDataExtractionAgent } from "../agents/theftAgent.js";
import { violenceDataExtractionAgent } from "../agents/violenceAgainstWomenAgent.js"
import { extractorTheftAgentPromptTemplate, extractorViolenceAgentPromptTemplate } from "../agents/promptTemplates.js";

async function extractTheftData(text) {
    try{
        const prompt = await extractorTheftAgentPromptTemplate.invoke({
            text: text
        })

        const theftJson = await theftDataExtractionAgent.invoke(prompt)

        return theftJson;
    } catch(error){
        console.error(error);
        return null;
    }
}

async function extractViolenceData(text) {
    try {
        // Gera o prompt e faz a extração dos dados
        const prompt = await extractorViolenceAgentPromptTemplate.invoke({ text });
        const violenceJson = await violenceDataExtractionAgent.invoke(prompt);

        // Garantindo que violenceJson seja um objeto válido
        const extractedViolenceData = {};

        // Verifique se violenceJson é um objeto não nulo
        if (violenceJson && typeof violenceJson === "object") {
            // Processa os tipos de violência
            for (const [violenceType, data] of Object.entries(violenceJson)) {
                if (Array.isArray(data)) {
                    // Filtra apenas os objetos onde pelo menos um campo seja `true`
                    const filteredArray = data.filter(obj =>
                        Object.values(obj).some(value => value === true)
                    );

                    if (filteredArray.length > 0) {
                        extractedViolenceData[violenceType] = filteredArray;
                    }
                } else if (typeof data === "object" && data !== null) {
                    // Trata o caso específico do feminicídio, que é um único objeto e não um array
                    const filteredData = Object.fromEntries(
                        Object.entries(data).filter(([_, value]) => value === true)
                    );

                    if (Object.keys(filteredData).length > 0) {
                        extractedViolenceData[violenceType] = filteredData;
                    }
                }
            }
        }

        // Se algum dado foi extraído, retorna o objeto estruturado
        if (Object.keys(extractedViolenceData).length > 0) {
            return { "Violência contra a mulher": extractedViolenceData };
        }

        // Se não houver dados extraídos, retorna um objeto vazio
        return { "Violência contra a mulher": {} };

    } catch (error) {
        console.error("Erro ao extrair dados de violência:", error);
        return { "Violência contra a mulher": {} }; // Retorna um objeto vazio em caso de erro
    }
}


async function extractSpecializedData(text, crimesArray) {
    const crimesObj = {
        "Roubo": extractTheftData,
        "Violência contra a mulher": extractViolenceData
    }

    let specializedJsonArr = []

    let crimeType;
    for (let i = 0; i < crimesArray.length; i++) {
        crimeType = crimesArray[i];
        specializedJsonArr.push(await crimesObj[crimeType](text));
    }

    return specializedJsonArr;
}


export { extractSpecializedData };
