import { FaCartPlus } from "react-icons/fa";
import { Card } from "../components/card";
import { CATEGORIES } from "../mocks/categories";
import { PRODUCTS } from "../mocks/products";

export default function Page() {
  return (
    <>
      <section>
        <h2>Mais Vendidos</h2>
        <ul className="border w-full p-2 flex flex-row gap-2 items-center">
          {
            PRODUCTS.map((prd) => (
              <li key={`best-sellers-prd-${prd.id}`}>
                <Card>
                  <div className="border p-2"></div>
                  <div>
                    <div className="text-[10px]">{prd.name}</div>
                    <div className="text-[8px]">
                      {
                        CATEGORIES
                          .find(ct => ct.id === prd.categoryID)?.name || "Não Identificado"
                      }
                    </div>
                    <div className="text-[8px]">
                      {
                        CATEGORIES // Alterar futuramente
                          .find(ct => ct.id === prd.sellerID)?.name || "Não Identificado"
                      }
                    </div>
                    <div className="text-xs font-bold text-right text-[#03738C]">
                      {
                        prd.price
                          .toLocaleString("pt-br", {
                            style: "currency", currency: "BRL"
                          })
                      }
                    </div>
                    <button className="bg-[#03738C] text-white flex items-center justify-center rounded-md p-2 cursor-pointer">
                      <FaCartPlus size={10}/>
                    </button>
                  </div>
                </Card>
              </li>
            ))
          }
        </ul>
      </section>
    </>
  );
}