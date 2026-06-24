"use client"

import { QuantitySelector } from "@/app/(public)/components/quantity-selector";
import { Card } from "@/app/components/card";
import { Image } from "@/app/components/image";
import { useCart } from "@/app/contexts/cart.context";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaCreditCard, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";

enum EStep {
  CART,
  ADDRESS,
  PAYAMENT,
  OVERVIEW,
  STATUS
}

interface IStep {
  icon: IconType,
  label: string,
  value: EStep
}

const STEPS: Array<IStep> = [
  { icon: IoCart, label: "Carrinho", value: EStep.CART },
  { icon: FaMapMarkerAlt, label: "Endereço", value: EStep.ADDRESS },
  { icon: FaCreditCard, label: "Pagamento", value: EStep.PAYAMENT },
  { icon: FaEye, label: "Revisão", value: EStep.OVERVIEW },
  { icon: FaCircleCheck, label: "Concluir", value: EStep.STATUS }
]

function Step({ data, step }: { data: IStep, step: EStep }) {
  const Icon = data.icon;

  return (
    <div className={`flex flex-row gap-1.5 items-center ${data.value === step ? "text-[#00BC99]" : "text-slate-400"} select-none`}>
      <Icon size={20} />
      <span>{data.label}</span>
    </div>
  )
}

export default function Page() {
  const [step, setStep] = useState<EStep>(EStep.CART)
  const { cart } = useCart()
  return (
    <main className="p-2">
      <Card className="flex flex-row items-center gap-6 justify-center">
        {
          STEPS.map((st, i) => (
            <>
              <Step key={`step-${i}`} data={st} step={step} />
              {i < (STEPS.length - 1) && <div className="w-4 h-1 bg-gray-300" />}
            </>
          ))
        }
      </Card>
      <Card>
        <ul>
          {
            cart.products
              .map((prd, i) => (
                <>
                  <li className="flex flex-row gap-2">
                    <Image 
                      alt={prd.name}
                      src={prd.photo}
                      height={72}
                      width={72}
                      size={55}
                    />
                    <div>
                      <div>{prd.name}</div>
                      <div>{prd.categoryID}</div>
                      <QuantitySelector amount={prd.amount} setAmount={() => { }} />

                    </div>
                  </li>
                  {i < (cart.products.length - 1) && (<div />)}
                </>
              ))
          }
        </ul>
      </Card>
    </main>
  );
}