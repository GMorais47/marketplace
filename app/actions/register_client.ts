"use server"

import { z } from "zod"
import { Step01Schema } from "../schemas/register_client.schema"

export type CustumerRegistrationStep01Error = {
    email?: string[]
}

export async function validateEmail(prev: FormState<CustumerRegistrationStep01Error>, formData: FormData): Promise<FormState<CustumerRegistrationStep01Error>> {

    const validatedFields = Step01Schema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error)
        return {
            success: false,
            errors: {
                email: properties?.email?.errors,
            }
        }
    }

    const { email } = validatedFields.data

    try {
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor" }
    }
}