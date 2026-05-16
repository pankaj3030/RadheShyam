import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  isVeg: boolean
}

export interface CartItem {
  item: MenuItem
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: MenuItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.item.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { item, quantity: 1 }] }
        })
      },
      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.item.id !== itemId),
        }))
      },
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.item.id === itemId ? { ...i, quantity } : i
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, i) => total + i.item.price * i.quantity, 0)
      },
      getTotal: () => {
        return get().getSubtotal()
      },
      getItemCount: () => {
        return get().items.reduce((count, i) => count + i.quantity, 0)
      },
    }),
    {
      name: 'radheshyam-cart',
    }
  )
)

export const menuItems: MenuItem[] = [
  {
    id: 'chole-bhature',
    name: 'Chole Bhature',
    price: 90,
    description: 'Fluffy deep-fried bread served with spiced chickpea curry, a North Indian classic',
    image: '/items/chole-bhature.png',
    category: 'Mains',
    isVeg: true,
  },
  {
    id: 'aloo-kachori',
    name: 'Aloo Kachori',
    price: 50,
    description: 'Crispy puffed puri stuffed with spiced potato filling, served with tangy chutneys',
    image: '/items/aloo-kachori.png',
    category: 'Mains',
    isVeg: true,
  },
  {
    id: 'samosa-chaat',
    name: 'Samosa Chaat',
    price: 60,
    description: 'Crushed samosas topped with chickpeas, yogurt, chutneys, and crunchy sev',
    image: '/items/samosa-chaat.png',
    category: 'Snacks',
    isVeg: true,
  },
  {
    id: 'samosa',
    name: 'Samosa',
    price: 20,
    description: 'Crispy golden triangular pastry filled with spiced potatoes and peas',
    image: '/items/samosa.png',
    category: 'Snacks',
    isVeg: true,
  },
  {
    id: 'paneer-bread-pakoda',
    name: 'Paneer Bread Pakoda',
    price: 40,
    description: 'Bread stuffed with spiced paneer, dipped in gram flour batter and deep fried',
    image: '/items/paneer-bread-pakoda.png',
    category: 'Snacks',
    isVeg: true,
  },
  {
    id: 'bread-pakoda',
    name: 'Bread Pakoda',
    price: 25,
    description: 'Classic bread fritters coated in spiced gram flour batter, crispy and golden',
    image: '/items/bread-pakoda.png',
    category: 'Snacks',
    isVeg: true,
  },
  {
    id: 'sweet-lassi',
    name: 'Sweet Lassi',
    price: 50,
    description: 'Creamy chilled yogurt drink blended with sugar, a perfect refreshing cooler',
    image: '/items/sweet-lassi.png',
    category: 'Beverages',
    isVeg: true,
  },
  {
    id: 'namkeen-lassi',
    name: 'Namkeen Lassi',
    price: 50,
    description: 'Savory spiced yogurt drink with cumin and salt, traditional and refreshing',
    image: '/items/namkeen-lassi.png',
    category: 'Beverages',
    isVeg: true,
  },
]
