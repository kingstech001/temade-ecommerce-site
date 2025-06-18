"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cartItems, getTotal } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = getTotal()
  const tax = subtotal * 0.1
  const shipping = 1000
  const total = subtotal + tax + shipping

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    city: "",
    state: "",
    phone: user?.phone || "",
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cartItems.length === 0) return

    setIsProcessing(true)

    try {
      if (user?._id) {
        // Create order in database
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            items: cartItems,
            shippingAddress: formData,
            paymentMethod: "card", // You can make this dynamic
            subtotal,
            tax,
            shipping,
            total,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          alert("Order placed successfully!")
          router.push("/account")
        } else {
          throw new Error("Failed to create order")
        }
      } else {
        // Guest checkout - just show success message
        console.log("Guest Order:", formData, cartItems)
        alert("Order placed successfully!")
      }
    } catch (error) {
      console.error("Order error:", error)
      alert("Failed to place order. Please try again.")
    }

    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB] py-10 px-4 md:px-16">
      <nav className="text-sm sm:text-base text-gray-600 mb-6">
        <ul className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="text-pink-600 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={``} className="text-pink-600 hover:underline">
              cart
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-500">Checkout</li>
        </ul>
      </nav>

      {!user && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-blue-800">
            <Link href="/auth/login" className="underline font-medium">
              Sign in
            </Link>{" "}
            or{" "}
            <Link href="/auth/register" className="underline font-medium">
              create an account
            </Link>{" "}
            to save your order history and track your purchases.
          </p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="text-[#CA6F86] hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10">
          {/* Left column: Order summary + form */}
          <div className="order-2 lg:order-1">
            <div className="bg-[#F2E5E8] p-6 rounded-[5px] shadow-sm mb-4">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-[#222222]">Order Summary</h2>
                {totalQuantity > -1 && (
                  <span className="text-sm md:text-base font-semibold px-3 py-1 bg-[#CA6F86] rounded-full text-white ml-2">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-[20px] text-[#222222]">{item.name}</p>
                        <p className="text-xs text-gray-500">Color: {item.color}</p>
                        <p className="text-xs text-gray-400">Size: {item.size}</p>
                      </div>
                    </div>
                    <p className="text-[18px] text-[#222222] font-semibold">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-[#D3D3D3]">
              <h2 className="text-[24px] font-semibold text-[#222222]">Delivery Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#333] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md p-3 outline-[#CA6F86] bg-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#333] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md p-3 outline-[#CA6F86] bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#333] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-3 outline-[#CA6F86] bg-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-[#333] mb-1">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md p-3 outline-[#CA6F86] bg-transparent"
                  >
                    <option value="">Select a state</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Kano">Kano</option>
                    <option value="Rivers">Rivers</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-[#333] mb-1">
                    Town/City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md p-3 outline-[#CA6F86] bg-transparent"
                  >
                    <option value="">Select a city</option>
                    <option value="Ikeja">Ikeja</option>
                    <option value="Wuse">Wuse</option>
                    <option value="Nsukka">Nsukka</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Kano City">Kano City</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#333] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md p-3 outline-[#CA6F86] bg-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right column: Payment section */}
          <div className="order-1 lg:order-2 p-6 rounded-lg shadow-sm space-y-4 border border-[#D3D3D3]">
            <h2 className="text-[24px] font-semibold text-[#222222]">Payment Information</h2>

            <div className="space-y-4">
              <h2 className="text-[15px] font-semibold text-[#222222]">Pay With</h2>
              <div className="space-y-2 border-y py-5">
                <label htmlFor="card" className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" id="card" name="paymentMethod" value="card" className="hidden peer" required />
                  <div className="w-5 h-5 rounded-full border border-[#D0D5DD] peer-checked:border-[#F56630] flex items-center justify-center peer-checked:bg-[#F56630] transition-all duration-200">
                    <div className="w-[18px] h-[18px] rounded-full peer-checked:bg-[#F56630] peer-checked:block border-2 border-white"></div>
                  </div>
                  <span className="text-sm text-[#222222]">Debit or Credit Card</span>
                </label>

                <label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" id="paypal" name="paymentMethod" value="paypal" className="hidden peer" />
                  <div className="w-5 h-5 rounded-full border border-[#D0D5DD] peer-checked:border-[#F56630] flex items-center justify-center peer-checked:bg-[#F56630] transition-all duration-200">
                    <div className="w-[18px] h-[18px] rounded-full peer-checked:bg-[#F56630] peer-checked:block border-2 border-white"></div>
                  </div>
                  <span className="text-sm text-[#222222]">Pay on Delivery</span>
                </label>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <h2 className="text-[15px] font-semibold text-[#222222]">Enter Card Information</h2>

              <div>
                <label htmlFor="cardholder" className="block text-sm text-[#222222] mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardholder"
                  name="cardholder"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F56630]"
                  required
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm text-[#222222] mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F56630]"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="expiry" className="block text-sm text-[#222222] mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F56630]"
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="cvc" className="block text-sm text-[#222222] mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    placeholder="123"
                    maxLength={4}
                    inputMode="numeric"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F56630]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 space-y-2 text-[#475367] text-sm font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>₦{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₦{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span className="text-[#1D2739] text-base font-semibold">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#222222] text-white py-3 rounded-md hover:bg-[#111] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : `Pay ₦${total.toLocaleString()}`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
