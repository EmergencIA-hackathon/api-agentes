import z from "zod";
import { chatGPTModel } from "./baseLLM.js";

const drugsData = z.object({
    name: z.nullable(z.string()).describe(`Nome da substancia(droga) que esta sendo vendida ou ofertada. Guarde nessa variavel com analogo a, por exemplo se no texto voce encontrar maconha, guaarde, substancia analoga a maconha, se encontrar no texto cocaina guarde substancia analoga a cocaina e assim com as demais possiveis drogas`),
    description: z
        .nullable(z.string())
        .describe(`Descricao da substancia.`),
    amount: z.nullable(z.string()).describe(`Quantidade aproximada, seja em gramas, em pacotes, em porcoes, qualquer informacao de quantidade que for encontrado no texto. Por exemplo se no texto houver, aproximadamente 1kg,nessa variavel guarde 1, se houver 5 pacotes aqui guarde 5`),
    unit: z.nullable(z.string()).describe(`Aqui guarde a unidade de medida da quantidade referenciada na variavel anterior, por exemplo se no texto houver, aproximadamente 1kg,nessa variavel guarde Kg, se houver 5 pacotes aqui guarde pacotes`),
    packaging: z.nullable(z.string()).describe(`Informacao sobre a emgalagem, se ja e o cigarro, se esta em pacotes pequenos, pacotes grandes, latas, garrafas, tabletes entre outros.`),
});

const trafficDataSchema = z.object({
    dados_substancia: z.nullable(z.arry(drugsData))
})

export const trafficDataExtrationAgent = chatGPTModel.whitStructuredOutput(trafficDataSchema)