import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET() {
  try {
    const menuItems = await db.getMenuItems()
    return NextResponse.json({
      success: true,
      data: menuItems,
    })
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch menu items",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const menuItem = await db.createMenuItem(body)

    return NextResponse.json(
      {
        success: true,
        data: menuItem,
        message: "Menu item created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating menu item:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create menu item",
      },
      { status: 500 },
    )
  }
}
