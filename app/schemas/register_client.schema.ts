import { z } from "zod"

export const Step01Schema = z.object({
    email: z.email("E-mail inválido"),
})

export const Step02Schema = z.object({
    name: z.string("O nome é de preenchimento obrigatório"),
    document: z.string("O CPF é de preenchimento obrigatório"),
    dateOfBirth: z.string("A data de nascimento deve ser uma data válida").optional(),
    phone: z.string("O telefone é de preenchimento obrigatório")
})