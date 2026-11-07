"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import {
  getOrCreateCart,
  addToCart as medusaAddToCart,
  removeFromCart as medusaRemoveFromCart,
  updateCartItem as medusaUpdateCartItem,
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
  updateItem: (lineItemId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  clearCart: () => void
  refreshCart: () => Promise<void>
  resetCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null)
  const [items, setItems] = useState<MedusaLineItem[]>([])
  const [currencyCode, setCurrencyCode] = useState("PAB")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const refreshCart = useCallback(async () => {
    if (!cartId) {
      setItems([])
      return
    }
    try {
      const cart = await retrieveCart(cartId)
      if (cart) setItems(cart.items || [])
    } catch {
      setCartId(null)
      setItems([])
    }
  }, [cartId])

  useEffect(() => {
    async function init() {
      setIsLoading(true)
      try {
        const cart = await getOrCreateCart()
        if (cart) {
          setCartId(cart.id)
          setItems(cart.items || [])
          if (cart.currency_code) setCurrencyCode(cart.currency_code.toUpperCase())
        }
      } catch {
        // Silent fail - cart will be created on first add
      } finally {
        setIsLoading(false)
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
      if (updatedCart) setItems(updatedCart.items || [])
      setIsOpen(true)
    } catch (error) {
      console.error("Error adding item:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cartId])

  const updateItem = useCallback(async (lineItemId: string, quantity: number) => {
    if (!cartId) return
    setIsLoading(true)
    try {
      const updatedCart = quantity <= 0
        ? await medusaRemoveFromCart(cartId, lineItemId)
        : await medusaUpdateCartItem(cartId, lineItemId, quantity)
      if (updatedCart) setItems(updatedCart.items || [])
    } catch (error) {
      console.error("Error updating item:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cartId])

  const removeItem = useCallback(async (lineItemId: string) => {
    if (!cartId) return
    setIsLoading(true)
    try {
      const updatedCart = await medusaRemoveFromCart(cartId, lineItemId)
      if (updatedCart) setItems(updatedCart.items || [])
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsLoading(false)
    }
  }, [cartId])

  const clearCart = useCallback(() => {
    if (!cartId) return
    setIsLoading(true)
    Promise.all(items.map((item) => medusaRemoveFromCart(cartId, item.id)))
      .then(() => setItems([]))
      .finally(() => setIsLoading(false))
  }, [cartId, items])

  const resetCart = useCallback(() => {
    // Clear cart state WITHOUT API calls - used after the cart became an order
    setItems([])
    setCartId(null)
    removeStoredCartId()
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items, itemCount, subtotal, currencyCode, isOpen, isLoading, cartId,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((v) => !v),
        addItem, updateItem, removeItem, clearCart, resetCart, refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
