"use client"

import { Button } from "@/app/components/button"
import { Card } from "@/app/components/card"
import { useCart } from "@/app/contexts/cart.context"
import { useCheckout } from "@/app/contexts/checkout.context"
import { Dispatch, SetStateAction, useState } from "react"

function Item({ data, address, setAddress }: { data: IAddress, address: IAddress | null, setAddress: Dispatch<SetStateAction<IAddress | null>> }) {
    return (
        <div onClick={() => setAddress(data)} className="flex flex-row items-center gap-2 cursor-pointer">
            <input
                type="radio"
                checked={address == data}
                className="h-4 w-4"
                onChange={() => setAddress(data)}
            />
            <div>
                <div className="font-bold">{data.publicPlace}, {data.number}</div>
                <div className="text-sm">{data.complement}, {data.neighborhood}</div>
                <div className="text-sm">{data.city} - {data.state}</div>
                <div className="text-sm">{data.zipcode}</div>
            </div>
        </div>
    )
}

export function Address({ onNext, onPrevius }: { onNext: () => void, onPrevius: () => void }) {
    const [addresses, setAddresses] = useState<Array<IAddress>>([
        {
            city: "Cidade",
            complement: "Complemento",
            neighborhood: "Bairro",
            number: "Número",
            publicPlace: "Rua",
            state: "UF",
            zipcode: "CEP"
        },
        {
            city: "Cidade 2",
            complement: "Complemento",
            neighborhood: "Bairro",
            number: "Número",
            publicPlace: "Rua",
            state: "UF",
            zipcode: "CEP"
        }
    ])
    const { address, setAddress } = useCheckout()
    const { cart } = useCart()

    return (
        <div className="flex flex-row gap-2">
            <div className="flex-1">
                <Card>
                    <ul className="flex flex-col gap-2">
                        {
                            addresses
                                .map((ad, i) => (
                                    <li key={`ad-${i}`}>
                                        <Item data={ad} address={address} setAddress={setAddress} />
                                    </li>
                                ))
                        }
                    </ul>
                </Card>
            </div>
            <Card className="flex flex-col gap-2">
                <div className="font-bold text-lg">Total {cart.total.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
                <div className="flex flex-col gap-2">
                    <Button disabled={!address} onClick={onNext}>Avançar</Button>
                    <Button onClick={onPrevius}>Voltar</Button>
                </div>
            </Card>
        </div>
    )
}