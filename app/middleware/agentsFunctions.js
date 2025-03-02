import {
    batteryAgentPromptTemplate,
    theftAgentPromptTemplate,
    fraudAgentPromptTemplate,
    trafficAgentPromptTemplate
} from "../agents/promptTemplates.js";
import { batteryDataExtractionAgent } from "../agents/specialized/batteryDataAgent.js";
import { theftDataExtractionAgent } from "../agents/specialized/theftDataAgent.js";
import { fraudDataExtractionAgent } from "../agents/specialized/fraudDataAgent.js"
import { trafficDataExtrationAgent } from "../agents/specialized/trafficDataAgent.js"

async function extractTrafficData(text) {
    try {
        const prompt = await trafficAgentPromptTemplate.invoke({
            text: text,
        })
        const trafficJson = await trafficDataExtrationAgent.invoke(prompt)

        console.log("Done extracting traffic data.");
        return trafficJson;
    }catch(error){
        console.error("Error while extracting trafic data:", error);
        return null;
    }
    
}

async function extractFraudData(text) {
    try {
        const prompt = await fraudAgentPromptTemplate.invoke({
            text: text,
        })
        const fraudJson = await fraudDataExtractionAgent.invoke(prompt)

        console.log("Done extracting fraud data.");
        return fraudJson;
    }catch(error){
        console.error("Error while extracting fraud data:", error);
        return null;
    }
    
}

async function extractTheftData(text) {
    try {
        const prompt = await theftAgentPromptTemplate.invoke({
            text: text,
        });

        const theftJson = await theftDataExtractionAgent.invoke(prompt);

        console.log("Done extracting theft data.");
        return theftJson;
    } catch (error) {
        console.error("Error while extracting theft data:", error);
        return null;
    }
}

async function extractBatteryData(text) {
    try {
        const prompt = await batteryAgentPromptTemplate.invoke({
            text: text,
        });

        const batteryJson = await batteryDataExtractionAgent.invoke(prompt);

        console.log("Done extracting battery data.");
        return batteryJson;
    } catch (error) {
        console.error("Error while extracting battery data:", error);
        return null;
    }
}

async function extractSpecializedData(text, crimesArray) {
    const crimesObj = {
        "Roubo": extractTheftData,
        "Lesao Corporal": extractBatteryData,
        "Estelionato": extractFraudData,
        "Tráfico de Drogas": extractTrafficData
    };

    let specializedJsonArr = [];

    let crimeType;
    for (let i = 0; i < crimesArray.length; i++) {
        crimeType = crimesArray[i];
        specializedJsonArr.push(await crimesObj[crimeType](text));
    }

    return specializedJsonArr;
}

export { extractSpecializedData };
