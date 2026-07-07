"use client"

import { QuantitySelector } from "@/app/(public)/components/quantity-selector";
import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";
import { useCategory } from "@/app/contexts/category.context";
import { useEffect, useState } from "react";

function Item({ data }: { data: IProductCart }) {
    const { getOneById } = useCategory()
    const { add, remove } = useCart()
    const [amount, setAmount] = useState(data.amount);

    const category = getOneById(String(data.categoryID))

    useEffect(() => {
        if (amount > data.amount) {
            add({ ...data, amount: 1 })
        } else if (amount < data.amount) {
            remove({ ...data, amount: 1 })
        }
    }, [amount])

    return (
        <div className="flex flex-row gap-2">
            <Image
                alt={data.name}
                src={data.photo}
                height={72}
                width={72}
                size={55}
            />
            <div className="flex-1 flex flex-row items-center justify-between">
                <div>
                    <div className="font-bold">{data.name}</div>
                    <div className="text-xs text-slate-400">{category?.name || "Não identificado"}</div>
                    <QuantitySelector amount={amount} setAmount={setAmount} />
                </div>
                <div className="font-bold text-lg">{(data.price * data.amount).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
            </div>
        </div>
    )
}

export function Cart({ onNext }: { onNext: () => void }) {
    const { cart } = useCart()

    return (
        <div className="flex flex-row gap-2">
            <div className="flex-1">
                <Card>
                    <ul>
                        {
                            cart.products
                                .map((prd, i) => (
                                    <li key={prd.id}>
                                        <Item data={prd} />
                                        {i < (cart.products.length - 1) && (<div className="border-b border-slate-200 my-2 w-1/2 self-center" />)}
                                    </li>
                                ))
                        }
                    </ul>
                </Card>
            </div>
            <Card>
                <div className="text-xl font-bold">Total {cart.total.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
                <Button onClick={onNext}>Avançar</Button>
            </Card>
        </div>
    )
}