import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: "Status is required",
        },
        { status: 400 },
      )
    }

    const order = await db.updateOrderStatus(params.id, status)

    return NextResponse.json({
      success: true,
      data: order,
      message: "Order status updated successfully",
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order status",
      },
      { status: 500 },
    )
  }
}
