"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export default function Page() {
    const params = useParams<{ status: string }>()

    const size = 60
    return (
        <main className="h-dvh flex flex-col items-center justify-center gap-2">
            {
                params.status === "success" ?
                    <FaCheckCircle color="#00FF00" size={size} />
                    :
                    <IoIosCloseCircle color="#FF0000" size={size} />
            }
            <p className="text-sm text-slate-500">Um texto explicativo</p>
            <div>
                <Link href={"/"}>Voltar</Link>
            </div>
        </main>
    )
}