"use client"

import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import type { Order } from "@/lib/models/User"

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user?._id) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    if (!user?._id) return

    setLoadingOrders(true)
    try {
      const response = await fetch(`/api/orders?userId=${user._id}`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    }
    setLoadingOrders(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#222222] mb-2">Welcome, {user.firstName}!</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#222222] mb-4">Account Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              {user.phone && (
                <p>
                  <span className="font-medium">Phone:</span> {user.phone}
                </p>
              )}
              <p>
                <span className="font-medium">Member since:</span> {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#222222] mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/wishlist" className="block text-[#CA6F86] hover:underline">
                View Wishlist ({user.wishlist?.length || 0} items)
              </Link>
              <Link href="/shop" className="block text-[#CA6F86] hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#222222] mb-4">Order History</h2>

          {loadingOrders ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-600">
              No orders yet.{" "}
              <Link href="/shop" className="text-[#CA6F86] hover:underline">
                Start shopping!
              </Link>
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id?.toString()} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order #{order._id?.toString().slice(-8)}</p>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₦{order.total.toLocaleString()}</p>
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.orderStatus === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.items.length} item(s) • {order.paymentMethod}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
