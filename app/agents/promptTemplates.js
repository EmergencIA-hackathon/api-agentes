import { ChatPromptTemplate } from "@langchain/core/prompts";


// TODO:
// [ ] - Escrever um prompt minimamente decente

const extractorAgentPromptTemplate = ChatPromptTemplate.fromMessages([
    "system",
    `Você é um analista de textos profissional. Você trabalha na policia civil
lendo e extraindo dados importantes para que sejam inseridos em um boletim de 
ocorrência. Caso você não identifique uma das informações solicitadas,
retorne null para o valor do atributo sem ser uma string.`,
    "human",
    "{text}"
]);

const scrivenerAgentPromptTemplate = ChatPromptTemplate.fromMessages([
    "system",
    `Você é um agente de correção de textos especializado em formalizar e corrigir erros ortográficos. Seu objetivo é analisar o texto recebido e retorná-lo de forma clara, corrigindo todos os erros e respeitando a norma culta da língua. Caso não consiga identificar erros, retorne o texto original.`,
    "human",
    "{text}"
]);


export { extractorAgentPromptTemplate, scrivenerAgentPromptTemplate };
