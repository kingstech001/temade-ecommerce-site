import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/userServices"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, cart } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const success = await UserService.updateUserCart(userId, cart || [])

    if (!success) {
      return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Cart updated successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Cart update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
