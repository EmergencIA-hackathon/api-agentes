import z from "zod";
import { chatGPTModel } from "./baseLLM.js";


// Agente de extração de dados genéricos

const victimData = z.object({
    nome:                       z.nullable(z.string()).describe(`Nome da vítima do delito.`),
    documento_identificacao:    z.nullable(z.string()).describe(`Documento de identificação da vítima (Quaiser documentos que possam ser usados como identificação pessoal no Brasil)`),
    idade:                      z.nullable(z.string()).describe(`Idade da vítima do delito.`),
});

const offenders = z.object({
    nome:                       z.nullable(z.string()).describe(`Nome da vítima do delito.`),
    caracteristicas_fisicas:    z.nullable(z.string()).describe(`Características físicas de quem cometeu o delito.`),
    documento_identificacao:    z.nullable(z.string()).describe(`Documento de identificação de quem cometeu o delito. (Quaiser documentos que possam ser usados como identificação pessoal no Brasil)`)
});

const eyewitnesses = z.object({
    nome:                       z.nullable(z.string()).describe(`Nome da testemunha.`),
    documento_identificacao:    z.nullable(z.string()).describe(`Documento de identificação da testemunha. (Quaiser documentos que possam ser usados como identificação pessoal no Brasil)`),
    email_contato:              z.nullable(z.string()).describe(`Email de contato da testemunha.`),
    tel_contato:                z.nullable(z.string()).describe(`Telefone de contato da testemunha.`),
    relato:                     z.nullable(z.string()).describe(`Relato da testemunha sobre a ocorrência, se houver.`),
    vinculo_vitima:             z.nullable(z.string()).describe(`Vinculo que a testemunha possui com a vítima.`),
    vinculo_envolvidos:         z.array(z.nullable(z.string()).describe(`Vinculo que a testemunha possui com a vítima.`)),
});

const crimesCommited = z.nullable(z.string()).describe(`Tipo de crime efetuado na ocorrência`)

const genericDataSchema = z.object({
    dados_vitima:       z.nullable(victimData),
    dados_testemunhas:  z.nullable(z.array(eyewitnesses)),
    dados_envolvidos:   z.nullable(z.array(offenders)),
    tipos_crimes:       z.nullable(z.array(crimesCommited)),
    dados_crimes:       z.null()
});

const genericDataExtractionAgent = chatGPTModel.withStructuredOutput(genericDataSchema);


export { genericDataExtractionAgent as extractorAgent };
