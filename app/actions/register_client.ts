"use server"

import { z } from "zod"
import { Step01Schema, Step02Schema } from "../schemas/register_client.schema"

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

export type CustumerRegistrationStep02Error = {
    name?: string[],
    document?: string[],
    dateOfBirth?: string[],
    phone?: string[]
}

export async function custumerRegisterStep02(prev: FormState<CustumerRegistrationStep02Error>, formData: FormData): Promise<FormState<CustumerRegistrationStep02Error>> {

    const validatedFields = Step02Schema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        const { properties } = z.treeifyError(validatedFields.error)
        return {
            success: false,
            errors: {
                name: properties?.name?.errors,
                document: properties?.document?.errors,
                dateOfBirth: properties?.dateOfBirth?.errors,
                phone: properties?.phone?.errors
            }
        }
    }

    const { name, document, dateOfBirth, phone } = validatedFields.data

    try {
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Erro Interno do Servidor" }
    }
}