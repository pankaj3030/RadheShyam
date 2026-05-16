'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Phone,
  Clock,
  Star,
  ChevronRight,
  X,
  Truck,
  ShieldCheck,
  Leaf,
  Utensils,
  GlassWater,
  CircleDot,
  ArrowRight,
  Navigation,
  CheckCircle2,
  Loader2,
  Menu as MenuIcon,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { useCartStore, menuItems, type MenuItem, type CartItem } from '@/store/cart-store'

// ─── Hero Section ────────────────────────────────────────────────
function HeroSection({ onOrderNow }: { onOrderNow: () => void }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.png"
          alt="Radhe Shyam Restaurant Interior"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30 text-sm px-4 py-1">
              <Star className="w-3.5 h-3.5 mr-1 fill-amber-400" />
              Now Open in Faridabad
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/logo.png"
                alt="Radhe Shyam Logo"
                width={80}
                height={80}
                className="rounded-full border-2 border-amber-400/50 shadow-lg"
              />
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                  Radhe Shyam
                </h1>
                <p className="text-amber-300/90 text-lg sm:text-xl tracking-[0.3em] uppercase mt-1">
                  Fresh • Authentic • Everyday
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-gray-300 text-lg sm:text-xl mb-8 max-w-lg leading-relaxed"
          >
            Experience the authentic flavors of North India. From crispy Samosas to fluffy Bhatures — every bite is a celebration of tradition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40 hover:scale-[1.02]"
              onClick={onOrderNow}
            >
              Order Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
            >
              View Menu
              <ChevronRight className="ml-1 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-wrap gap-6 mt-10 text-sm text-gray-300"
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Free delivery under 1 km</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Open 7 AM – 10 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-400" />
              <span>100% Vegetarian</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronUp className="w-6 h-6 text-white/50 rotate-180" />
      </motion.div>
    </section>
  )
}

// ─── Menu Card Component ──────────────────────────────────────────
function MenuCard({ item, cartItem, onAdd, onRemove, onUpdate }: {
  item: MenuItem
  cartItem?: CartItem
  onAdd: () => void
  onRemove: () => void
  onUpdate: (qty: number) => void
}) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 bg-card">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 shadow-md">
            <Leaf className="w-3 h-3 mr-1" />
            VEG
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-amber-500 text-black font-bold text-sm px-3 py-1 shadow-md">
            ₹{item.price}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {cartItem && cartItem.quantity > 0 ? (
          <div className="flex items-center justify-between w-full bg-amber-50 dark:bg-amber-950/30 rounded-xl p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400"
              onClick={onRemove}
            >
              {cartItem.quantity === 1 ? <Trash2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
            </Button>
            <span className="font-bold text-amber-700 dark:text-amber-400 min-w-[2rem] text-center">
              {cartItem.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400"
              onClick={onAdd}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition-all hover:scale-[1.02]"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// ─── Menu Section ──────────────────────────────────────────────────
function MenuSection({ menuRef }: { menuRef: React.RefObject<HTMLDivElement | null> }) {
  const { items: cartItems, addItem, removeItem, updateQuantity } = useCartStore()
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Mains', 'Snacks', 'Beverages']
  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory)

  const categoryIcons: Record<string, React.ReactNode> = {
    All: <CircleDot className="w-4 h-4" />,
    Mains: <Utensils className="w-4 h-4" />,
    Snacks: <Leaf className="w-4 h-4" />,
    Beverages: <GlassWater className="w-4 h-4" />,
  }

  return (
    <section ref={menuRef} id="menu" className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3 text-amber-600 border-amber-600/30">
            Our Menu
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Fresh From Our Kitchen
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Every dish is prepared with love, using the freshest ingredients and authentic recipes
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black hover:bg-amber-600 shadow-md shadow-amber-500/20'
                  : 'border-border hover:border-amber-500/50 hover:text-amber-600'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryIcons[cat]}
              <span className="ml-2">{cat}</span>
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const cartItem = cartItems.find((ci) => ci.item.id === item.id)
            return (
              <MenuCard
                key={item.id}
                item={item}
                cartItem={cartItem}
                onAdd={() => {
                  addItem(item)
                  toast.success(`${item.name} added to cart`, {
                    duration: 1500,
                  })
                }}
                onRemove={() => {
                  removeItem(item.id)
                  toast.info(`${item.name} removed from cart`, {
                    duration: 1500,
                  })
                }}
                onUpdate={(qty) => updateQuantity(item.id, qty)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Features Section ──────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: '100% Vegetarian',
      description: 'Pure vegetarian food prepared with the freshest ingredients',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Free Delivery',
      description: 'Free delivery within 1 km radius. ₹20 for areas beyond',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Secure Payment',
      description: 'Pay easily via UPI QR code — safe and instant',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Quick Service',
      description: 'Fresh food prepared and delivered to you fast',
    },
  ]

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Cart Sheet ──────────────────────────────────────────────────
function CartSheet({ onCheckout }: { onCheckout: () => void }) {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount, clearCart } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const itemCount = getItemCount()
  const subtotal = getSubtotal()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-bold shadow-xl shadow-amber-500/30 transition-all hover:scale-105"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {itemCount > 0 ? (
            <>
              Cart
              <Badge className="ml-2 bg-black text-white rounded-full h-6 w-6 p-0 flex items-center justify-center text-xs">
                {itemCount}
              </Badge>
              <span className="ml-2">₹{subtotal}</span>
            </>
          ) : (
            'Cart'
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-amber-500" />
            Your Cart
            {itemCount > 0 && (
              <Badge className="bg-amber-500 text-black">{itemCount} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm">
              Add some delicious items from our menu!
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-3 py-4">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{cartItem.item.name}</h4>
                      <p className="text-sm text-amber-600 font-semibold">₹{cartItem.item.price * cartItem.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-md"
                        onClick={() =>
                          cartItem.quantity === 1
                            ? removeItem(cartItem.item.id)
                            : updateQuantity(cartItem.item.id, cartItem.quantity - 1)
                        }
                      >
                        {cartItem.quantity === 1 ? (
                          <Trash2 className="w-3 h-3 text-destructive" />
                        ) : (
                          <Minus className="w-3 h-3" />
                        )}
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{cartItem.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-md"
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-muted-foreground">Calculated at checkout</span>
              </div>
              <Separator />
              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg py-6 rounded-xl"
                onClick={() => {
                  setIsOpen(false)
                  onCheckout()
                }}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

// ─── Checkout Dialog ──────────────────────────────────────────────
function CheckoutDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, getSubtotal, clearCart } = useCartStore()
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
  })
  const [deliveryInfo, setDeliveryInfo] = useState<{
    distance: number
    deliveryCharge: number
    isFreeDelivery: boolean
    message: string
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [qrCode, setQrCode] = useState<string>('')
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderId, setOrderId] = useState<string>('')
  const [useLocation, setUseLocation] = useState(false)

  const subtotal = getSubtotal()
  const deliveryCharge = deliveryInfo?.deliveryCharge ?? 0
  const total = subtotal + deliveryCharge

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (open) {
      setStep('details')
      setDeliveryInfo(null)
      setQrCode('')
      setOrderId('')
    }
  }, [open])

  const calculateDelivery = async () => {
    setIsCalculating(true)
    try {
      if (useLocation && navigator.geolocation) {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: true,
          })
        })
        const res = await fetch('/api/delivery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        })
        const data = await res.json()
        setDeliveryInfo(data)
      } else {
        const res = await fetch('/api/delivery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: formData.address }),
        })
        const data = await res.json()
        setDeliveryInfo(data)
      }
    } catch {
      // Default: assume delivery charge
      setDeliveryInfo({
        distance: 2.5,
        deliveryCharge: 20,
        isFreeDelivery: false,
        message: '₹20 delivery charge applies for your delivery area.',
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const generateQR = async () => {
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, orderId: orderId || Date.now().toString() }),
      })
      const data = await res.json()
      if (data.success) {
        setQrCode(data.qrCode)
      }
    } catch {
      toast.error('Failed to generate QR code')
    }
  }

  const placeOrder = async () => {
    setIsOrdering(true)
    try {
      const newOrderId = `RS${Date.now().toString().slice(-8)}`
      setOrderId(newOrderId)

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          deliveryAddress: formData.address + (formData.landmark ? `, Near ${formData.landmark}` : ''),
          deliveryDistance: deliveryInfo?.distance || 0,
          deliveryCharge,
          subtotal,
          total,
          items: items.map((ci) => ({
            id: ci.item.id,
            name: ci.item.name,
            price: ci.item.price,
            quantity: ci.quantity,
            total: ci.item.price * ci.quantity,
          })),
        }),
      })

      const data = await res.json()
      if (data.success) {
        await generateQR()
        setStep('payment')
      } else {
        toast.error('Failed to place order. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsOrdering(false)
    }
  }

  const confirmPayment = () => {
    setStep('success')
    clearCart()
  }

  const isDetailsValid = formData.name && formData.phone && formData.address && deliveryInfo

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-500" />
                Checkout
              </DialogTitle>
              <DialogDescription>
                Enter your delivery details to complete your order
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Order Summary */}
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-semibold text-sm mb-2">Order Summary</h4>
                <div className="space-y-1.5">
                  {items.map((ci) => (
                    <div key={ci.item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {ci.item.name} × {ci.quantity}
                      </span>
                      <span>₹{ci.item.price * ci.quantity}</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    placeholder="House no., Street, Sector, Faridabad"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    placeholder="Near temple, park, etc."
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="mt-1"
                  />
                </div>

                {/* Location toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={useLocation ? 'default' : 'outline'}
                    size="sm"
                    className={`text-xs ${useLocation ? 'bg-amber-500 text-black hover:bg-amber-600' : ''}`}
                    onClick={() => setUseLocation(!useLocation)}
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    Use My Location
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    For accurate delivery calculation
                  </span>
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={calculateDelivery}
                  disabled={isCalculating || (!useLocation && !formData.address)}
                >
                  {isCalculating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-2" />
                  )}
                  Calculate Delivery Charge
                </Button>

                {deliveryInfo && (
                  <div className={`rounded-xl p-3 ${deliveryInfo.isFreeDelivery ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900' : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900'}`}>
                    <div className="flex items-center gap-2">
                      {deliveryInfo.isFreeDelivery ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Truck className="w-5 h-5 text-amber-600" />
                      )}
                      <span className={`text-sm font-medium ${deliveryInfo.isFreeDelivery ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                        {deliveryInfo.message}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-7">
                      Distance: {deliveryInfo.distance} km from restaurant
                    </p>
                  </div>
                )}
              </div>

              {/* Total */}
              {deliveryInfo && (
                <div className="bg-foreground/5 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Charge</span>
                    <span className={deliveryInfo.isFreeDelivery ? 'text-green-600' : ''}>
                      {deliveryInfo.isFreeDelivery ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">₹{total}</span>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg py-6 rounded-xl"
                onClick={placeOrder}
                disabled={!isDetailsValid || isOrdering}
              >
                {isOrdering ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <>
                    Place Order • ₹{total}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                Pay with QR Code
              </DialogTitle>
              <DialogDescription>
                Scan the QR code below with any UPI app to complete your payment
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 flex flex-col items-center text-center">
              <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                {qrCode ? (
                  <Image
                    src={qrCode}
                    alt="Payment QR Code"
                    width={220}
                    height={220}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-[220px] h-[220px] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                  </div>
                )}
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-2xl font-bold text-foreground">₹{total}</p>
                <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
              </div>

              <div className="w-full bg-muted/50 rounded-xl p-4 text-left space-y-1">
                <p className="text-sm font-medium">Payment Instructions:</p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                  <li>Scan the QR code above</li>
                  <li>Verify the amount: ₹{total}</li>
                  <li>Complete the payment</li>
                  <li>Click &quot;I&apos;ve Paid&quot; below</li>
                </ol>
              </div>
            </div>

            <DialogFooter className="flex-col gap-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6 rounded-xl"
                onClick={confirmPayment}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                I&apos;ve Paid ₹{total}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Your order will be confirmed once payment is verified
              </p>
            </DialogFooter>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-center justify-center text-green-600">
                <CheckCircle2 className="w-6 h-6" />
                Order Placed!
              </DialogTitle>
            </DialogHeader>

            <div className="py-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-14 h-14 text-green-600" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-muted-foreground mb-4">
                Your order has been placed successfully
              </p>

              <div className="bg-muted/50 rounded-xl p-4 w-full space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono font-semibold">{orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold text-green-600">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery to</span>
                  <span className="font-medium truncate ml-4">{formData.address}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                    Preparing
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                We&apos;ll call you at {formData.phone} to confirm your order
              </p>
            </div>

            <DialogFooter>
              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl"
                onClick={() => onOpenChange(false)}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Header ──────────────────────────────────────────────────────
function Header({ onOrderNow }: { onOrderNow: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Radhe Shyam Restaurant"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <h1 className={`font-bold text-lg leading-tight ${scrolled ? 'text-foreground' : 'text-white'}`}>
                Radhe Shyam
              </h1>
              <p className={`text-[10px] tracking-widest uppercase ${scrolled ? 'text-muted-foreground' : 'text-white/70'}`}>
                Fresh • Authentic • Everyday
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={scrollToMenu}
              className={`text-sm font-medium hover:text-amber-500 transition-colors ${scrolled ? 'text-foreground' : 'text-white/90'}`}
            >
              Menu
            </button>
            <a
              href="tel:+919876543210"
              className={`text-sm font-medium hover:text-amber-500 transition-colors flex items-center gap-1 ${scrolled ? 'text-foreground' : 'text-white/90'}`}
            >
              <Phone className="w-3.5 h-3.5" />
              Call Us
            </a>
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl"
              onClick={onOrderNow}
            >
              Order Now
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon className={`w-5 h-5 ${scrolled ? 'text-foreground' : 'text-white'}`} />
          </Button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-black rounded-b-xl"
            >
              <div className="py-3 space-y-2 px-2">
                <Button variant="ghost" className="w-full justify-start" onClick={scrollToMenu}>
                  Menu
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                  onClick={() => {
                    onOrderNow()
                    setMobileMenuOpen(false)
                  }}
                >
                  Order Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="R & S Restaurant"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-xl">
                  Radhe Shyam
                </h3>
                <p className="text-xs tracking-widest uppercase text-background/60">
                  Fresh • Authentic • Everyday
                </p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Bringing the authentic flavors of North India to Faridabad. At Radhe Shyam, every dish is a labor of love, made fresh daily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p className="hover:text-amber-400 cursor-pointer transition-colors">Our Menu</p>
              <p className="hover:text-amber-400 cursor-pointer transition-colors">Delivery Areas</p>
              <p className="hover:text-amber-400 cursor-pointer transition-colors">About Us</p>
              <p className="hover:text-amber-400 cursor-pointer transition-colors">Contact</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Faridabad, Haryana, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>7:00 AM – 10:00 PM (Everyday)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Free delivery within 1 km</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Radhe Shyam Restaurant. All rights reserved.</p>
          <p>Made with ❤️ in Faridabad</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page ──────────────────────────────────────────────────
export default function HomePage() {
  const menuRef = useRef<HTMLDivElement>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const { getItemCount } = useCartStore()

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOrderNow = () => {
    if (getItemCount() > 0) {
      setCheckoutOpen(true)
    } else {
      scrollToMenu()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderNow={handleOrderNow} />
      <main className="flex-1">
        <HeroSection onOrderNow={handleOrderNow} />
        <FeaturesSection />
        <MenuSection menuRef={menuRef} />

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-amber-500/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Hungry? We&apos;ll Deliver!
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Order your favorite North Indian dishes and get them delivered hot and fresh to your doorstep
              </p>
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-10 py-7 rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-105"
                onClick={handleOrderNow}
              >
                Order Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Cart & Checkout */}
      <CartSheet onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  )
}
