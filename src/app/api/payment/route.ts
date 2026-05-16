import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, orderId, upiId } = body

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      )
    }

    // Generate UPI payment URI
    const upiUri = `upi://pay?pa=${upiId || 'rnsrestaurant@ybl'}&pn=Radhe%20Shyam%20Restaurant&am=${amount}&cu=INR&tn=Order%20${orderId || 'Payment'}&ref=${orderId || Date.now()}`

    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(upiUri, {
      width: 256,
      margin: 2,
      color: {
        dark: '#1a472a', // Dark green matching the brand
        light: '#ffffff',
      },
    })

    return NextResponse.json({
      success: true,
      qrCode: qrDataUrl,
      upiUri,
      amount,
    })
  } catch (error) {
    console.error('QR generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}
