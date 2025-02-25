import { theftDataExtractionAgent } from "../agents/theftAgent.js";
import {
    batteryAgentPromptTemplate,
    extractorTheftAgentPromptTemplate,
} from "../agents/promptTemplates.js";
import { batteryDataExtractionAgent } from "../agents/batteryAgent.js";

async function extractTheftData(text) {
    try {
        const prompt = await extractorTheftAgentPromptTemplate.invoke({
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
