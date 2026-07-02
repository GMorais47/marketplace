import { ReactNode } from "react";
import { Header } from "./components/header";
import { AuthProvider } from "../contexts/auth.context";

interface IProps {
    children: ReactNode
}

export default function Layout({ children }: Readonly<IProps>) {
    return (
        <AuthProvider>
            <Header />
            <main className="p-2 overflow-auto">
                {children}
            </main>
        </AuthProvider>
    )
}