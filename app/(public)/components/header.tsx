"use client"

import { Button } from "@/app/components/button"
import { CATEGORIES } from "@/app/mocks/categories"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { HiMenu } from "react-icons/hi"
import { IoCart, IoClose } from "react-icons/io5"
import { MdFavorite } from "react-icons/md"

function HeaderButton({ children, onClick }: { children: ReactNode, onClick?: () => void }) {
    return (
        <Button onClick={onClick} className="h-6 w-6 hover:bg-[#03738C22] hover:text-[#00BC99] cursor-pointer rounded-md flex items-center justify-center">
            {children}
        </Button>
    )
}

export function Header() {
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <header className="w-full">
                <div className="h-10 bg-[#012E40] text-white flex flex-row items-center gap-2 px-2">
                    <div className="h-full flex-1 flex flex-row items-center gap-2">
                        <HeaderButton onClick={() => setShow(true)}>
                            <HiMenu />
                        </HeaderButton>
                        <Link href={"/"}>
                            <h1>Marketplace</h1>
                        </Link>
                    </div>
                    <div className="h-full flex-1 flex flex-row justify-end items-center gap-2 p-2">
                        {/* FAVORITOS */}
                        <HeaderButton>
                            <MdFavorite />
                        </HeaderButton>
                        {/* CARRINHO */}
                        <HeaderButton>
                            <IoCart />
                        </HeaderButton>
                        {/* LOGIN */}
                        <Link href="/login" className="bg-[#00BC99] hover:bg-[#03738C88] text-[10px] font-semibold rounded-lg px-4 py-1">Login</Link>
                    </div>
                </div>
                <div className="bg-[#03738c] text-white w-full">
                    <ul className="flex flex-row justify-center flex-wrap items-center text-[10px] text-center">
                        {
                            CATEGORIES
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(vl => (
                                    <Link key={`category-${vl.id}`} href={vl.path}>
                                        <li className="px-2 hover:bg-[#00BC99] h-6 flex items-center justify-center">
                                            {vl.name}
                                        </li>
                                    </Link>
                                ))
                        }
                    </ul>
                </div>
            </header>
            <section className={`absolute h-svh bg-white shadow-lg rounded-tr-md rounded-br-md transition-all duration-700 ease-in-out ${show ? "w-50" : "w-0"}`}>
                <div className="relative">
                    {show && (<button onClick={() => setShow(false)} className="absolute -right-3 top-2 bg-[#00BC99] flex items-center justify-center text-white h-6 w-6 rounded-md cursor-pointer hover:text-[#012E40] shadow-lg">
                        <IoClose />
                    </button>)}
                </div>
            </section>
        </>
    )
}