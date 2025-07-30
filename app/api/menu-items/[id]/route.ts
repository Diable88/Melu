import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const menuItem = await db.getMenuItemById(params.id)
    return NextResponse.json({
      success: true,
      data: menuItem,
    })
  } catch (error) {
    console.error("Error fetching menu item:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Menu item not found",
      },
      { status: 404 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const menuItem = await db.updateMenuItem(params.id, body)

    return NextResponse.json({
      success: true,
      data: menuItem,
      message: "Menu item updated successfully",
    })
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update menu item",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.deleteMenuItem(params.id)
    return NextResponse.json({
      success: true,
      message: "Menu item deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete menu item",
      },
      { status: 500 },
    )
  }
}
