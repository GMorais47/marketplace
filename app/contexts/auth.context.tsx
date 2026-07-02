"use client"

import { createContext, ReactNode, useEffect, useState } from "react";

interface IAuthContext {
    user: { id: string } | null;
}

const Context = createContext<IAuthContext>(null!);

export function AuthProvider({ children }: { children?: ReactNode }) {
    const [user, setUser] = useState<{ id: string } | null>(null)

    const getUser = async () => {
        try {
            const cookie = await cookieStore.get("user")
            if (cookie) {
                const { value } = cookie

                const temp = value ? JSON.parse(decodeURIComponent(value)) : null

                setUser(temp ? {
                    id: temp["id"]
                } : null)

            } else {
                setUser(null)
            }
        } catch (error) {
            setUser(null)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Context.Provider value={{ user }}>
            {children}
        </Context.Provider>
    )
}