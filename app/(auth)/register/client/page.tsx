"use client"

import { CustumerRegistrationStep01Error, validateEmail } from "@/app/actions/register_client";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { ECustomerRegistrationSteps, TCustomerRegister } from "@/app/interfaces/client";
import Link from "next/link";
import { Dispatch, SetStateAction, useActionState, useEffect, useState } from "react"
import toast from "react-hot-toast";

interface IProps {
    setClient: Dispatch<SetStateAction<Partial<TCustomerRegister>>>
    setStep: Dispatch<SetStateAction<ECustomerRegistrationSteps>>
}

const initialStateStep01: FormState<CustumerRegistrationStep01Error> = { success: false }

function Step01({ setStep, setClient }: IProps) {
    const [state, formAction, isPending] = useActionState(validateEmail, initialStateStep01)

    useEffect(() => {
        if (!state.success) {
            let message: string = "Ocorreu um erro desconhecido"

            if (state.errors && state.errors.email) {
                message = state.errors.email[0]
            } else if (state.message) {
                message = state.message
            }

            toast.error(message)
        } else {
            const email = document.querySelector("#email") as HTMLInputElement
            console.log(email.value)
            setClient(prev => ({
                ...prev,
                email: email.value
            }))
            setStep(ECustomerRegistrationSteps.STEP02)
        }
    }, [state])

    return (
        <form action={formAction} className="flex flex-col gap-2 mt-2">
            <Input
                id="email"
                name="email"
                label="E-mail"
                required
                placeholder="Ex: joao.nascimento@seudominio.com"
            />
            <Button type="submit" disabled={isPending}>{isPending ? "Carregando" : "Avançar"}</Button>
        </form>
    )
}

export default function Page() {
    const [step, setStep] = useState<ECustomerRegistrationSteps>(ECustomerRegistrationSteps.STEP01)
    const [client, setClient] = useState<TCustomerRegister>({})

    const render = () => {
        switch (step) {
            case ECustomerRegistrationSteps.STEP01:
                return <Step01 setClient={setClient} setStep={setStep} />
        }
    }

    useEffect(() => console.log(client), [client])

    return (
        <>
            <div>
                <ul className="flex flex-row items-center gap-1.5">
                    {
                        Array.from({ length: 5 })
                            .map((_, i) => (
                                <li key={`step-${i}`} className={`h-2 w-2 ${i <= step ? "bg-[#1c4694]" : "bg-gray-200"} rounded-full`} />
                            ))
                    }
                </ul>
            </div>
            {render()}
            <p className="mt-4 text-sm font-light">Já possui uma conta? <Link href={"/login"} className="text-[#1C4694] font-semibold">Entrar</Link></p>
        </>
    )
}