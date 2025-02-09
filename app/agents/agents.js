import z from "zod";
import { chatGPTModel } from "./baseLLM.js";


// Agente especialista em extração de dados.

const victim_info = z.object({
    name: z.nullable(z.string()).describe(`Nome da vítima do delito.`),
    age: z.nullable(z.string()).describe(`Idade da vítima do delito.`),
});

const crime_info = z.object({
    type: z.nullable(z.string()).describe(`Tipo de delito cometido contra a vítima.`),
})

const schema = z.object({
    victim_info: victim_info,
    crime_info: crime_info
})

const extractorAgent = chatGPTModel.withStructuredOutput(schema);


export { extractorAgent };
