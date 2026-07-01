import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { Input } from "@/app/components/input";
import { useCheckout } from "@/app/contexts/checkout.context";

export function Overview() {
    const { cart, address, payment } = useCheckout()

    const onChange = () => { }
    return (
        <div className="flex flex-row gap-2">
            <div className="flex-1 flex flex-col gap-2">
                <Card title="Carrinho"></Card>
                <Card title="Endereço" className="grid grid-cols-4 gap-2">
                    <Input readOnly id="zipcode" name="zipcode" value={address?.zipcode} onChange={onChange} label="CEP" />
                    <div className="col-span-2">
                        <Input readOnly id="publicPlace" name="publicPlace" value={address?.publicPlace} onChange={onChange} label="Endereço" />
                    </div>
                    <Input readOnly id="number" name="number" value={address?.number} onChange={onChange} label="Número" />

                    <div className="col-span-2">
                        <Input readOnly id="complement" name="complement" value={address?.complement} onChange={onChange} label="Complemento" />
                    </div>
                    <div className="col-span-2">
                        <Input readOnly id="neighborhood" name="neighborhood" value={address?.neighborhood} onChange={onChange} label="Bairro" />
                    </div>

                    <div className="col-span-3">
                        <Input readOnly id="city" name="city" value={address?.city} onChange={onChange} label="Cidade" />
                    </div>
                    <Input readOnly id="state" name="state" value={address?.state} label="Estado" onChange={onChange} />
                </Card>
                <Card title="Pagamento" className="flex flex-col gap-2">
                    <Input readOnly onChange={onChange} value={payment.cardNumber} label="Número do Cartão" />
                    <Input readOnly onChange={onChange} value={payment.cardholder} label="Nome do Titular" />
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex-1">
                            <Input readOnly onChange={onChange} value={payment.expirationDate} label="Vencimento" />
                        </div>
                        <div className="flex-1">
                            <Input readOnly onChange={onChange} value={payment.cvv} label="Código de Segurança" />
                        </div>
                        <div className="flex-1">
                            <Input readOnly onChange={onChange} value={payment.document} label="Documento do Titular" />
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex flex-col gap-2">
                <Card></Card>
                <Card className="flex flex-col gap-2">
                    <Button>Finalizar</Button>
                    <Button>Voltar</Button>
                </Card>
            </div>
        </div>
    )
}