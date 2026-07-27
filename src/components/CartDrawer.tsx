"use client"

import Image from "next/image"
import Link from "next/link"
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight, FiMinus, FiPlus } from "react-icons/fi"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/medusa"

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    currencyCode,
    isOpen,
    closeCart,
    removeItem,
    clearCart,
    isLoading,
  } = useCart()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[91] h-full w-full sm:w-[420px] bg-dark-surface border-l border-dark-border shadow-2xl transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/images/logo-isotipo-blanco.png"
                alt="Karven"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-primary">Mi Carrito</h2>
              <p className="text-xs text-text-muted">{itemCount} {itemCount === 1 ? "artículo" : "artículos"}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-dark-hover transition-all"
            aria-label="Cerrar carrito"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-140px)] px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-ivory-glow/10 border border-ivory/20 flex items-center justify-center mb-6">
              <FiShoppingBag className="w-8 h-8 text-ivory/60" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Carrito vacío</h3>
            <p className="text-sm text-text-muted mb-6 max-w-xs">
              Añada propiedades médicas de su interés para solicitar información.
            </p>
            <Link
              href="/propiedades"
              onClick={closeCart}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ivory text-dark-base font-medium rounded-lg hover:bg-ivory-light transition-all duration-300 text-sm"
            >
              Ver Propiedades
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="overflow-y-auto cart-scrollbar h-[calc(100%-280px)] px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-xl bg-dark-elevated border border-dark-border group hover:border-ivory/20 transition-all"
                  >
                    {/* Thumb */}
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-dark-surface">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-lg font-serif text-ivory/30">{item.title.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/propiedades/${item.product_handle}`}
                        onClick={closeCart}
                        className="text-sm font-medium text-text-primary hover:text-ivory-light transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-text-muted mt-1">
                        {formatPrice(item.unit_price, currencyCode)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-text-muted">Cant: {item.quantity}</span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-all self-start opacity-0 group-hover:opacity-100 disabled:opacity-30"
                      aria-label="Eliminar"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-dark-border bg-dark-surface/95 backdrop-blur-sm">
              <div className="px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Subtotal</span>
                  <span className="text-lg font-bold text-text-primary">
                    {formatPrice(subtotal, currencyCode)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 text-sm text-text-muted border border-dark-border rounded-lg hover:text-error hover:border-error/30 transition-all disabled:opacity-30"
                  >
                    Vaciar
                  </button>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex-1 px-4 py-3 text-sm font-medium text-center text-dark-base bg-ivory rounded-lg hover:bg-ivory-light transition-all duration-300 glow-ivory-subtle"
                  >
                    Solicitar Info
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
