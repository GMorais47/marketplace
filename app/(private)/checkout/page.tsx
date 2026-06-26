"use client"

import { Card } from "@/app/components/card";
import { useCart } from "@/app/contexts/cart.context";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { FaCreditCard, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import { Cart } from "./(steps)/cart";
import { Address } from "./(steps)/address";

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

function Step({ data, step, setStep }: { data: IStep, step: EStep, setStep: Dispatch<SetStateAction<EStep>> }) {
  const Icon = data.icon;

  return (
    <div
      onClick={() => step > data.value ? setStep(data.value) : null}
      className={`${step > data.value ? "cursor-pointer hover:text-[#00BC99]" : ""} flex flex-row gap-1.5 items-center ${data.value === step ? "text-[#00BC99]" : "text-slate-400"} select-none`}>
      <Icon size={20} />
      <span>{data.label}</span>
    </div>
  )
}

export default function Page() {
  const [step, setStep] = useState<EStep>(EStep.CART)

  const render = () => {
    switch (step) {
      case EStep.CART:
        return <Cart onNext={() => setStep(EStep.ADDRESS)} />
      case EStep.ADDRESS:
        return <Address onNext={() => setStep(EStep.PAYAMENT)} onPrevius={() => setStep(EStep.CART)} />
    }
  }

  return (
    <main className="p-2">
      <Card className="flex flex-row items-center gap-6 justify-center mb-2 flex-wrap">
        {
          STEPS.map((st, i) => (
            <>
              <Step key={`step-${i}`} data={st} step={step} setStep={setStep} />
              {i < (STEPS.length - 1) && <div className="w-4 h-1 bg-gray-300" />}
            </>
          ))
        }
      </Card>
      {render()}
    </main>
  );
}