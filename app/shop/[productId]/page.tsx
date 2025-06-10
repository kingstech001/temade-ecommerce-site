'use client';

import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { categoryImages } from '@/app/data/shopCategories';
import { Star } from 'lucide-react';

import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';

import { useCart } from '@/app/context/CartContext';

type ParamsType = {
    productId: string;
};

type Props = {
    params: Promise<ParamsType>;
};

export default function ProductDetailPage({ params }: Props) {
    const { productId } = use(params);
    const { addToCart } = useCart();

    const allProducts = Object.entries(categoryImages)
        .filter(([category]) => category !== 'All')
        .flatMap(([, items]) => items);

    const product = allProducts.find((item) => item.id === productId);
    if (!product) notFound();

    const category = Object.entries(categoryImages)
        .filter(([cat]) => cat !== 'All')
        .find(([, items]) => items.some((item) => item.id === productId))?.[0];

    const [mainImage, setMainImage] = useState(
        product?.colorVariants?.[0]?.images?.[0] ?? { src: '', alt: '' }
    );
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setNotification({ message: 'Please select a size', type: 'error' });
            return;
        }

        const selectedColorVariant = product.colorVariants.find((variant) =>
            variant.images.some((img) => img.src === mainImage.src)
        );
        const selectedColor = selectedColorVariant?.colorName || 'Unknown';

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: mainImage.src,
            size: selectedSize,
            color: selectedColor,
            quantity,
        });

        setNotification({ message: 'Added to cart successfully!', type: 'success' });
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto relative font-sans">
            {/* Breadcrumb */}
            <nav className="text-sm sm:text-base text-gray-600 mb-6">
                <ul className="flex flex-wrap gap-1">
                    <li><Link href="/" className="text-pink-600 hover:underline">Home</Link></li>
                    <li>/</li>
                    <li><Link href="/categories" className="text-pink-600 hover:underline">Categories</Link></li>
                    {category && (
                        <>
                            <li>/</li>
                            <li><Link href={`/categories/${category}`} className="text-pink-600 hover:underline">{category}</Link></li>
                        </>
                    )}
                    <li>/</li>
                    <li className="text-gray-500">{product.name}</li>
                </ul>
            </nav>

            {/* Main Section */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Images */}
                <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
                    {/* Thumbnails */}
                    <div className="flex w-full gap-3 max-smb:overflow-x-auto lg:flex-col lg:w-1/3">
                        {product.colorVariants.flatMap((variant) =>
                            variant.images.map((img, idx) => (
                                <button
                                    key={`${variant.colorName}-${idx}`}
                                    onClick={() => setMainImage(img)}
                                    className={`min-w-[5rem] sm:min-w-[7rem] h-28 sm:h-36 rounded-md border-2 transition-all duration-200 bg-cover bg-center ${img.src === mainImage.src ? 'border-pink-600' : 'border-gray-200'
                                        }`}
                                    style={{ backgroundImage: `url(${img.src})` }}
                                    aria-label="Select image variant"
                                />
                            ))
                        )}
                    </div>

                    {/* Main Image */}
                    <div className="w-full relative aspect-[3/4] max-w-[700px]">
                        <Image
                            src={mainImage.src}
                            alt={mainImage.alt}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            priority
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#030C26]">{product.name}</h1>

                    <div className="flex items-center gap-2 text-yellow-400">
                        {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">15 reviews</span>
                    </div>

                    <p className="text-3xl font-bold text-[#252525]">₦{product.price.toFixed(2)}</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    {/* Color */}
                    <div className="flex items-center gap-3">
                        <h2 className="font-semibold text-[#030C26]">Color:</h2>
                        <div className="flex gap-2 flex-wrap">
                            {product.colorVariants.map((variant, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(variant.images[0])}
                                    className={`w-6 h-6 rounded-full border-2 transition ${mainImage.src === variant.images[0].src ? 'border-pink-600' : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: variant.colorName }}
                                    title={variant.colorName}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="space-y-1">
                        <h2 className="font-semibold text-[#030C26]">Size:</h2>
                        <div className="flex gap-3 flex-wrap">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize((prev) => (prev === size ? '' : size))}
                                    className={`px-4 py-1.5 border rounded-lg text-sm transition ${selectedSize === size
                                        ? 'bg-[#8D2741] text-white border-[#8D2741]'
                                        : 'text-[#2C2C2C] border-gray-300 hover:border-[#8D2741]'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Cart */}
                    <div className="flex items-center flex-wrap gap-4">
                        <div className="flex items-center gap-6 border rounded px-4 py-2 text-lg">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-[#222222] text-white px-6 py-3 rounded-md text-base font-medium hover:bg-[#000000] transition w-full sm:w-auto"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <p className="text-sm text-gray-600"><span className="font-semibold text-[#030C26]">Material:</span> 100% Cotton</p>
                    <p className="text-sm text-gray-600"><span className="font-semibold text-[#030C26]">Category:</span> <span className="capitalize">{category}</span></p>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-center mb-6">Shop More From This Collection</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allProducts.slice(0, 6).map((item) => (
                        <Link href={`/shop/${item.id}`} key={item.id} className="group">
                            <Image
                                src={item.colorVariants[0].images[0].src}
                                alt={item.name}
                                width={300}
                                height={400}
                                className="rounded-md w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <p className="mt-2 text-sm font-medium text-center">{item.name}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Notification */}
            <div
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 max-w-sm shadow-lg rounded-lg px-5 py-3 text-sm font-medium transition-opacity duration-300 ${notification
                        ? notification.type === 'success'
                            ? 'bg-green-100 text-green-800 border border-green-400 opacity-100'
                            : 'bg-red-100 text-red-700 border border-red-400 opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }`}
                role="alert"
            >
                {notification?.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5" />
                ) : (
                    <XCircle className="w-5 h-5" />
                )}
                <span>{notification?.message}</span>
            </div>
        </div>
    );
}
