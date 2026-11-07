"use client"

import Image from "next/image"
import Link from "next/link"
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight, FiMinus, FiPlus } from "react-icons/fi"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/medusa"

export default function CartDrawer() {
  const { items, itemCount, subtotal, currencyCode, isOpen, closeCart, removeItem, updateItem, isLoading } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`fixed top-0 right-0 z-[91] h-full w-full sm:w-[440px] bg-paper shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Cotización"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div>
            <h2 className="font-display text-2xl text-ink">Su cotización</h2>
            <p className="text-xs text-text-3 mt-0.5">{itemCount} {itemCount === 1 ? "artículo" : "artículos"}</p>
          </div>
          <button onClick={closeCart} className="p-2 rounded-full text-text-2 hover:text-ink hover:bg-paper-2 transition-all" aria-label="Cerrar">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-paper-2 flex items-center justify-center mb-6">
              <FiShoppingBag className="w-6 h-6 text-text-3" />
            </div>
            <h3 className="font-display text-xl text-ink mb-2">Aún no hay artículos</h3>
            <p className="text-sm text-text-2 mb-8 max-w-xs">Agregue mobiliario desde el catálogo y envíenos la lista para recibir una cotización formal.</p>
            <Link href="/productos" onClick={closeCart} className="btn btn-ink">
              Ver catálogo <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-line">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-4">
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-paper-2">
                      {item.thumbnail ? (
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-2xl text-text-3">{item.title.charAt(0)}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/productos/${item.product_handle}`} onClick={closeCart} className="text-sm font-medium text-ink hover:text-teal transition-colors line-clamp-2">
                        {item.title}
                      </Link>
                      <p className="text-xs text-text-3 mt-1">{formatPrice(item.unit_price, currencyCode)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="inline-flex items-center border border-line rounded-full">
                          <button onClick={() => updateItem(item.id, item.quantity - 1)} disabled={isLoading} className="p-1.5 text-text-2 hover:text-ink disabled:opacity-40" aria-label="Restar">
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-medium text-ink">{item.quantity}</span>
                          <button onClick={() => updateItem(item.id, item.quantity + 1)} disabled={isLoading} className="p-1.5 text-text-2 hover:text-ink disabled:opacity-40" aria-label="Sumar">
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} disabled={isLoading} className="p-1.5 text-text-3 hover:text-error transition-colors disabled:opacity-40" aria-label="Eliminar">
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line bg-paper px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-2">Subtotal estimado</span>
                <span className="font-display text-2xl text-ink">{formatPrice(subtotal, currencyCode)}</span>
              </div>
              <p className="text-[11px] text-text-3">Precios de referencia. La cotización formal incluye entrega e instalación.</p>
              <Link href="/checkout" onClick={closeCart} className="btn btn-teal w-full">
                Solicitar cotización <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
