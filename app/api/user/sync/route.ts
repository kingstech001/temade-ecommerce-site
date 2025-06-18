import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/userServices"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, cart, wishlist } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Sync user data
    const success = await UserService.syncUserData(userId, cart || [], wishlist || [])

    if (!success) {
      return NextResponse.json({ error: "Failed to sync user data" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "User data synced successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
