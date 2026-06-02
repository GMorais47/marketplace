import { z } from "zod"

export const Step01Schema = z.object({
    email: z.email("E-mail inválido"),
})