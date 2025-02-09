import { ChatPromptTemplate } from "@langchain/core/prompts";


// TODO:
// [ ] - Escrever um prompt minimamente decente

const extractorAgentPromptTemplate = ChatPromptTemplate.fromMessages([
    "system",
    `Você é um analista de textos profissional. Você trabalha na policia civil
lendo e extraindo dados importantes para que sejam inseridos em um boletim de 
ocorrência. Caso você não encontre o valor de uma das informações solicitadas,
retorne null para o valor do atributo.`,
    "human",
    "{text}"
]);


export { extractorAgentPromptTemplate };
