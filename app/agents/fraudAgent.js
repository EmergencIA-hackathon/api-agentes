import z from "zod";
import { chatGPTModel } from "./baseLLM.js";

const victimBankData = z.object({
    bankName: z.nullable(z.string()).describe(`Nome do banco da vitima.`),
    account: z.nullable(z.string()).describe(`Numero da conta da vitima.`),
    account: z.nullable(z.string()).describe(`Numero da agencia bancaria da vitima`),
    fraudValue: z.nullable(z.float()).describe(`Valor subtraido da conta da vitima`)
})

const offenderBankData = z.object({
    bankName: z.nullable(z.string()).describe(`Nome do banco da estelionatario.`),
    account: z.nullable(z.string()).describe(`Numero da conta da estelionatario.`),
    account: z.nullable(z.string()).describe(`Numero da agencia bancaria da estelionatario`),
    pixKey: z.nullable(z.string()).describe(`Chave pix do estelionatario`)
})

const victimCreditCard = z.object({
    creditCardBanner: z.nullable(z.string()).describe(`Bandeira do cartao de credito da vitima.`),
    creditCardNumber: z.nullable(z.string()).describe(`Numero do cartao de credito da vitima.`),
    creditCardValidity: z.nullable(z.string()).describe(`Validade do cartao de credito da vitima`),
    creditCardSecurityCode: z.nullable(z.float()).describe(`Codigo de seguranca do cartao de credito da vitima`)
})

const siteInfos = z.object({
    siteAddress: z.nullable(z.string()).describe(`Endereco do site usado no golpe.`),
    account: z.nullable(z.string()).describe(`Conta que aplicou o golpe da vitima, exemplo @ do instagran ou tiktok.`),
})

const documentData = z.object({
    type: z
        .nullable(z.string())
        .describe(
            `Tipo do documento falsificado, como por exemplo rg, cnh, passaporte ou outro.`
        ),
    number: z.nullable(z.string()).describe(`Numero do documento falsificado.`),
});

const productData = z.object({
    name: z.nullable(z.string()).describe(`Nome do objeto falso vendido.`),
    description: z
        .nullable(z.string())
        .describe(`Descricao do objeto falsa vendido.`),
    marca: z.nullable(z.string()).describe(`Marca do objeto falso vendido.`),
});

const contractData = z.object({
    type: z
        .nullable(z.string())
        .describe(`Tipo do falso contrato, por exemplo contrato de formatura, contrato de prestacao de algum servico, contrato de aluguel, entre outros.`),
    description: z
        .nullable(z.string())
        .describe(`Descricao resumida do contrato.`),
    date: z.nullable(z.string()).describe(`Data de assinatura do contrato falso.`),
    companyName: z.nullable(z.string()).describe(`Nome da empresa ou pessoa contratada.`),
    cnpj_cpf: z.nullable(z.string()).describe(`CNPJ da empresa ou CPF da pessoa contratada.`),
});



const fraudDataSchema = z.object({
    dados_bancarios_vitima: z.nullable(z.array(victimBankData)),
    dados_bancarios_acusado: z.nullable(z.array(offenderBankData)),
    dados_cartao_vitima: z.nullable(z.array(victimCreditCard)),
    informacoes_sites: z.nullable(z.array(siteInfos)),
    documentos_falsificados: z.nullable(z.array(documentData)),
    produtos_falsos_vendidos: z.nullable(z.array(productData)),
    dados_contratos: z.nullable(z.array(contractData)),
})

export const fraudDataExtractionAgent = 
    chatGPTModel.whithStructuredOutput(fraudDataSchema)