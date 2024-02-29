// this hook for : 1. add items, 2. remove items, 3. clear cart, 4. keep track of cart items

import { Product } from '@/payload-types'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

export type CartItem = {
  product: Product
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(   // -------- will make data persist if reload happend
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== id
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {  // configuration object for persist()
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)