import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, customerPhone, deliveryAddress, deliveryDistance, deliveryCharge, subtotal, total, items } = body

    if (!customerName || !customerPhone || !deliveryAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await db.order.create({
      data: {
        customerName,
        customerPhone,
        deliveryAddress,
        deliveryDistance: deliveryDistance || 0,
        deliveryCharge: deliveryCharge || 0,
        subtotal,
        total,
        items: JSON.stringify(items),
        status: 'pending',
        paymentMethod: 'qr_code',
      },
    })

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
