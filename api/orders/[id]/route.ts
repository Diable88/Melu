import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET() {
  try {
    const orders = await db.getOrders()
    return NextResponse.json({
      success: true,
      data: orders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tableNumber, items, totalAmount, notes } = body

    // Validate required fields
    if (!tableNumber || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    const order = await db.createOrder({
      tableNumber,
      items,
      totalAmount,
      status: "pending",
      notes,
    })

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: "Order created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
