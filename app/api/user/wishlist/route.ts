import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/userServices"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, wishlist } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const success = await UserService.updateUserWishlist(userId, wishlist || [])

    if (!success) {
      return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Wishlist updated successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Wishlist update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
