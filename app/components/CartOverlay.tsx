'use client';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

type CartOverlayProps = {
    onClose: () => void;
};

export default function CartOverlay({ onClose }: CartOverlayProps) {
    const { cartItems, increaseQty, decreaseQty, removeItem, getTotal } = useCart();
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* Overlay Background */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/40 z-30"
            />

            {/* Cart Panel */}
            <div
                className="fixed top-0 right-0 h-full w-full sm:w-[590px] bg-[#FFFBEB] shadow-lg z-50 transition-transform duration-300 ease-in-out translate-x-0"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <div className='flex items-center'>
                        <h2 className="text-[28px] font-semibold text-[#222222]">My Cart</h2>
                        {totalQuantity > -1 && (
                            <span className=" text-[18px] font-semibold px-[15px] py-[5px] bg-[#CA6F86] rounded-[30px] text-white ml-2">
                                {totalQuantity}
                            </span>

                        )}
                    </div>
                    <button onClick={onClose}>
                        <X className="w-6 h-6 text-[#475367]" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)] font-WorkSans">
                    {cartItems.length === 0 ? (
                        <p className="text-sm text-gray-500">No items in cart yet.</p>
                    ) : (
                        cartItems.map(item => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between  p-4 "
                            >
                                <div className="flex gap-3 justify-between w-full">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-[210px] h-[190px] object-cover rounded"
                                        />
                                        <div className='space-y-3'>
                                            <h3 className="text-[16px] font-medium text-[#222222]">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                Color: {item.color}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Size: {item.size} 
                                            </p>
                                           
                                            <div className="flex items-center gap-2 ">
                                                <div className='border border-[#ADADAD] rounded-[5px] flex items-center space-x-3 px-2 py-1'>
                                                    <button
                                                        onClick={() => decreaseQty(item.id)}
                                                        className="p-1 "
                                                    >
                                                        <Minus className="w-4 h-4 text-[#A9A9A9]" />
                                                    </button>
                                                    <span className="text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQty(item.id)}
                                                        className="p-1 "
                                                    >
                                                        <Plus className="w-4 h-4 text-[#CA6F86]" />
                                                    </button>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="ml-1">
                                                    <Trash2 className="w-4 h-4 text-[#98A2B3]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xl text-[#222222] pt-[25px] font-semibold">
                                        ₦{item.price.toLocaleString()}
                                    </p>
                                </div>


                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 border-t px-5 py-4 ">
                    <div className="flex justify-between font-semibold text-[#5A554C] mb-3">
                        <span>Total</span>
                        <span>₦{getTotal().toLocaleString()}</span>
                    </div>
                    <button
                        className="w-full bg-[#222222] text-white py-2 rounded-[5px]"
                        disabled={cartItems.length === 0}
                    >
                        GO TO CHECKOUT
                    </button>
                </div>
            </div>
        </>
    );
}
