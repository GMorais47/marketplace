"use client"

import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { PRODUCTS } from "@/app/mocks/products";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { QuantitySelector } from "../../components/quantity-selector";
import { useState } from "react";
import { useCart } from "@/app/contexts/cart.context";
import { IoArrowRedoSharp } from "react-icons/io5";
import { Image } from "@/app/components/image";
import { useCategory } from "@/app/contexts/category.context";

export default function Page() {
  const { getOneById, data: categories } = useCategory();
  const { id } = useParams<{ id: string }>()
  const [amount, setAmount] = useState<number>(1)
  const { add } = useCart()

  if (isNaN(Number(id))) {
    toast.error("ID inválido!")
    return
  }

  const product = PRODUCTS.find(prd => prd.id === Number(id))

  if (!product) {
    toast.error("Produto não encontrado!")
    return
  }

  const category = getOneById(String(product.categoryID))

  const handleAdd = () => {
    add({ ...product, amount })
    toast.success("Adicionado com sucesso!")
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      {/* INFO PRODUTO */}
      <div className="flex flex-row flex-wrap gap-2">
        {/* INFO GERAL */}
        <Card className="flex-3 flex flex-row gap-2 flex-wrap">
          <Image
            alt={product.name}
            src={product.photo}
            height={400}
            width={400}
            size={160}
          />
          {/* INFOS */}
          <div className="flex-1">
            <Link href={category?.path || "#"} className="text-slate-400 text-[10px]">{category?.name || "Não identificado"}</Link>
            <h1 className="font-bold text-lg">{product.name}</h1>
            <div className="flex flex-row items-center gap-2">
              <div className="text-[10px] text-[#012E40]">{product.rating}</div>
              <ul className="text-slate-200 flex flex-row items-center gap-px">{
                Array.from({ length: 5 })
                  .map((_, i) => (
                    <li key={`rating-${i}`}>
                      <FaStar size={10} style={{
                        color: i + 1 <= product.rating ? "#03738C" : undefined
                      }} />
                    </li>
                  ))
              }</ul>
            </div>
            <div className="font-bold text-2xl text-[#03738C]">{product.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            })}</div>
            <p className="text-slate-400 text-sm text-justify max-w-100">{product.description}</p>
          </div>
        </Card>
        {/* ADICIONAIS */}
        <div className="flex-1.5 flex flex-col gap-2">
          {/* CARRINHO */}
          <Card className="flex flex-row items-center gap-2 flex-wrap">
            <QuantitySelector height={9} amount={amount} setAmount={setAmount} />
            <Button onClick={handleAdd} className="flex-1 flex flex-row items-center justify-center gap-2"><FaCartPlus /> Adicionar</Button>
          </Card>
          {/* VENDEDOR */}
          <Card title="Vendedor" className="flex flex-row gap-2 items-center">
            <Image
              alt={product.name}
              src={product.photo}
              height={40}
              width={40}
              size={30}
            />
            <div className="h-full flex-1 flex flex-row items-center gap-2">
              <div className="h-full flex-1 p-2">
                <div className="font-bold text-md">Nome do Vendedor</div>
                <div className="text-slate-400 text-[12px] flex flex-row items-center gap-2">
                  <div className="flex items-center gap-1.5"><span className="font-bold">5</span> <FaStar /></div>
                  <div><span className="font-bold">5</span> Produtos</div>
                </div>
              </div>
              <Link
                href={`/seller/${product.sellerID}`}
                className="bg-[#03738C] hover:bg-[#00BC99] transition-all duration-300 text-white px-2 py-1.5 text-xs rounded-lg font-bold flex
                 items-center gap-1.5"><IoArrowRedoSharp /> Visitar</Link>
            </div>
          </Card>
          {/* MAIS PRODUTOS DO VENDEDOR */}
          <Card title="Mais produtos do Vendedor">
            <ul>
              {
                PRODUCTS
                  .filter(prd => prd.sellerID === product.sellerID && prd.id !== product.id)
                  .slice(0, 3)
                  .map(prd => (
                    <li key={`seller-product-${prd.id}`} >
                      <Link
                        href={`${categories.find(cat => cat.id === String(prd.categoryID))?.path}/${prd.id}`}
                        className="flex flex-row items-center gap-2">
                        <Image
                          alt={prd.name}
                          src={prd.photo}
                          height={40}
                          width={40}
                          size={30}
                        />
                        <div className="h-full flex-1 p-2">
                          <div className="font-bold text-xs">{prd.name}</div>
                          <div className="text-[10px]">
                            {
                              prd.price.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL"
                              })
                            }
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))
              }
            </ul>
          </Card>
        </div>
      </div>

    </div>
  );
}