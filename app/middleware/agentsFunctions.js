import { theftDataExtractionAgent } from "../agents/theftAgent.js";
import { extractorTheftAgentPromptTemplate } from "../agents/promptTemplates.js";

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

async function extractSpecializedData(text, crimesArray) {
    const crimesObj = {
        "Roubo": extractTheftData
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
