"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import {
  getOrCreateCart,
  addToCart as medusaAddToCart,
  removeFromCart as medusaRemoveFromCart,
  retrieveCart,
  removeStoredCartId,
} from "@/lib/medusa"
import type { MedusaLineItem } from "@/lib/medusa"

export interface CartContextType {
  items: MedusaLineItem[]
  itemCount: number
  subtotal: number
  currencyCode: string
  isOpen: boolean
  isLoading: boolean
  cartId: string | null
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  clearCart: () => void
  refreshCart: () => Promise<void>
  resetCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null)
  const [items, setItems] = useState<MedusaLineItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const refreshCart = useCallback(async () => {
    if (!cartId) {
      setItems([])
      return
    }
    try {
      const cart = await retrieveCart(cartId)
      if (cart) {
        setItems(cart.items || [])
      }
    } catch {
      // Cart might be expired
      setCartId(null)
      setItems([])
    }
  }, [cartId])

  // Initialize cart on mount
  useEffect(() => {
    async function init() {
      setIsLoading(true)
      try {
        const cart = await getOrCreateCart()
        if (cart) {
          setCartId(cart.id)
          setItems(cart.items || [])
        }
      } catch {
        // Silent fail - cart will be created on first add
      } finally {
        setIsLoading(false)
        setIsInitialized(true)
      }
    }
    init()
  }, [])

  const addItem = useCallback(async (variantId: string, quantity: number = 1) => {
    setIsLoading(true)
    try {
      let currentCartId = cartId
      if (!currentCartId) {
        const cart = await getOrCreateCart()
        if (!cart) throw new Error("Could not create cart")
        currentCartId = cart.id
        setCartId(cart.id)
      }
      const updatedCart = await medusaAddToCart(currentCartId, variantId, quantity)
      if (updatedCart) {
        setItems(updatedCart.items || [])
      }
      setIsOpen(true) // Open cart drawer on add
    } catch (error) {
      console.error("Error adding item:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cartId])

  const removeItem = useCallback(async (lineItemId: string) => {
    if (!cartId) return
    setIsLoading(true)
    try {
      const updatedCart = await medusaRemoveFromCart(cartId, lineItemId)
      if (updatedCart) {
        setItems(updatedCart.items || [])
      }
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cartId])

  const clearCart = useCallback(() => {
    // Remove all items sequentially (makes API calls)
    if (!cartId) return
    setIsLoading(true)
    Promise.all(items.map((item) => medusaRemoveFromCart(cartId!, item.id)))
      .then(() => {
        setItems([])
      })
      .finally(() => setIsLoading(false))
  }, [cartId, items])

  const resetCart = useCallback(() => {
    // Clear cart state WITHOUT API calls - used after order completion
    setItems([])
    setCartId(null)
    removeStoredCartId()
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
  const currencyCode = items[0]?.unit_price ? "PAB" : "PAB"

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        currencyCode,
        isOpen,
        isLoading,
        cartId,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((v) => !v),
        addItem,
        removeItem,
        clearCart,
        resetCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
