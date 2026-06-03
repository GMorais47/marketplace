"use client"

import { custumerRegisterStep02, CustumerRegistrationStep01Error, CustumerRegistrationStep02Error, validateEmail } from "@/app/actions/register_client";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { ECustomerRegistrationSteps, TCustomerRegister } from "@/app/interfaces/client";
import Link from "next/link";
import { Dispatch, SetStateAction, useActionState, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";

interface IProps {
    setClient: Dispatch<SetStateAction<Partial<TCustomerRegister>>>
    setStep: Dispatch<SetStateAction<ECustomerRegistrationSteps>>
}

const initialStateStep01: FormState<CustumerRegistrationStep01Error> = { success: false }

function Step01({ setStep, setClient }: IProps) {
    const [state, formAction, isPending] = useActionState(validateEmail, initialStateStep01)
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        if (!state.success && email !== "") {
            let message: string = "Ocorreu um erro desconhecido"

            if (state.errors && state.errors.email) {
                message = state.errors.email[0]
            } else if (state.message) {
                message = state.message
            }

            toast.error(message)
        } else if (state.success) {
            setClient(prev => ({
                ...prev,
                email: email
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
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Ex: joao.nascimento@seudominio.com"
            />
            <Button type="submit" disabled={isPending}>{isPending ? "Carregando" : "Avançar"}</Button>
        </form>
    )
}

const initialStateStep02: FormState<CustumerRegistrationStep02Error> = { success: false }

function Step02({ setStep, setClient }: IProps) {
    const [state, formAction, isPending] = useActionState(custumerRegisterStep02, initialStateStep02)
    const [name, setName] = useState<string>("")
    const [document, setDocument] = useState<string>("")
    const [dateOfBirth, setDateOfBirth] = useState<string>("")
    const [phone, setPhone] = useState<string>("")

    useEffect(() => {
        if (!state.success && (name !== "" || document !== "" || dateOfBirth !== "" || phone !== "")) {
            let message: string = "Ocorreu um erro desconhecido"

            if (state.errors && state.errors) {
                if (state.errors.name) message = state.errors.name[0]
                if (state.errors.document) message = state.errors.document[0]
                if (state.errors.dateOfBirth) message = state.errors.dateOfBirth[0]
                if (state.errors.phone) message = state.errors.phone[0]
            } else if (state.message) {
                message = state.message
            }

            toast.error(message)
        } else if (state.success) {
            setClient(prev => ({
                ...prev,
                name,
                document,
                dateOfBirth: dateOfBirth !== "" ? new Date(dateOfBirth) : undefined,
                phone
            }))
            setStep(ECustomerRegistrationSteps.STEP03)
        }
    }, [state])

    return (
        <form action={formAction} className="flex flex-col gap-2 mt-2">
            <Input id="name" name="name" value={name} onChange={e => setName(e.currentTarget.value)} required label="Nome Completo" maxLength={150} />
            <Input id="document" name="document" value={document} onChange={e => setDocument(e.currentTarget.value)} required label="CPF" maxLength={11} />
            <Input id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={e => setDateOfBirth(e.currentTarget.value)} type="date" label="Data de Nascimento" />
            <Input id="phone" name="phone" value={phone} onChange={e => setPhone(e.currentTarget.value)} type="tel" required label="Telefone" />
            <div className="flex flex-row items-center gap-2">
                <Button type="button" onClick={() => setStep(ECustomerRegistrationSteps.STEP01)}>Voltar</Button>
                <Button type="submit" disabled={isPending}>{isPending ? "Carregando" : "Avançar"}</Button>
            </div>
        </form>
    )
}

function Step03({ setStep, setClient }: IProps) {
    return (
        <form className="flex flex-col gap-2 mt-2">
            <div className="flex flex-row gap-2 items-center">
                <Input label="Endereço" />
                <Input label="Número" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Input label="Complemento" />
                <Input label="Bairro" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Input label="Cidade" />
                <select></select>
                <Input label="CEP" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Button type="button" onClick={() => setStep(ECustomerRegistrationSteps.STEP02)}>Voltar</Button>
                <Button type="submit">Avançar</Button>
            </div>
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
            case ECustomerRegistrationSteps.STEP02:
                return <Step02 setClient={setClient} setStep={setStep} />
            case ECustomerRegistrationSteps.STEP03:
                return <Step03 setClient={setClient} setStep={setStep} />
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