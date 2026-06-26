"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { useCart } from "./cart.context";

interface IContext {
    cart: ICart,
    address: IAddress | null,
    setAddress: Dispatch<SetStateAction<IAddress | null>>
    payament: any
}

const Context = createContext<IContext>(null!);

interface IProps {
    children?: ReactNode,
}

export function CheckoutProvider({ children }: IProps) {
    const { cart } = useCart()
    const [address, setAddress] = useState<IAddress | null>(null)
    return (
        <Context.Provider value={{ cart, address, setAddress, payament: null }}>
            {children}
        </Context.Provider>
    )
}

export function useCheckout() {
    const context = useContext(Context);
    if (!context) throw new Error("O 'useCheckout' deve ser utilizado dentro do 'CheckoutProvider'")
    return context
}