import { NextRequest, NextResponse } from 'next/server'

// Faridabad sector coordinates (approximate center of Faridabad)
const RESTAURANT_LAT = 28.4089
const RESTAURANT_LNG = 77.3178

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { latitude, longitude, address } = body

    // If coordinates provided, calculate distance
    if (latitude && longitude) {
      const distance = calculateDistance(RESTAURANT_LAT, RESTAURANT_LNG, latitude, longitude)
      const deliveryCharge = distance <= 1 ? 0 : 20

      return NextResponse.json({
        distance: Math.round(distance * 100) / 100,
        deliveryCharge,
        isFreeDelivery: distance <= 1,
        message: distance <= 1
          ? 'Free delivery! You are within 1 km radius.'
          : `₹20 delivery charge applies. Distance: ${distance.toFixed(1)} km`,
      })
    }

    // If only address provided, estimate based on area keywords in Faridabad
    if (address) {
      const addr = address.toLowerCase()
      
      // Areas within 1 km of restaurant (central Faridabad areas)
      const nearbyAreas = [
        'sector 12', 'sector 13', 'sector 14', 'sector 15', 'nIT',
        'old faridabad', 'railway station', 'nahar singh stadium',
        'sector 16', 'sector 17', 'sector 11', 'sector 10',
      ]
      
      const isNearby = nearbyAreas.some(area => addr.includes(area))
      const deliveryCharge = isNearby ? 0 : 20
      const estimatedDistance = isNearby ? 0.8 : 2.5

      return NextResponse.json({
        distance: estimatedDistance,
        deliveryCharge,
        isFreeDelivery: isNearby,
        message: isNearby
          ? 'Free delivery! Your area is within 1 km radius.'
          : '₹20 delivery charge applies for your delivery area.',
      })
    }

    return NextResponse.json(
      { error: 'Please provide either coordinates or address' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Delivery calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate delivery charge' },
      { status: 500 }
    )
  }
}
