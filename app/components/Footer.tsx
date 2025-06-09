'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed email:', email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#FFD7E1] py-10 px-6 md:px-16 mx-auto max-w-screen-2xl">
      <div className="flex flex-col md:flex-row md:justify-between gap-10 flex-wrap">
        {/* Logo Section */}
        <div className="flex flex-col gap-2">
          <Link href="/">
            <Image
              src="/temade-icon.png"
              alt="Temade Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-[#5A554C] text-xs font-medium font-WorkSans">
            © 2025 ALL RIGHTS RESERVED
          </p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#5A554C] font-WorkSans">LINKS</p>
          <a href="#" className="text-sm text-[#5A554C] hover:underline font-WorkSans">Instagram</a>
          <a href="#" className="text-sm text-[#5A554C] hover:underline font-WorkSans">Contact Us</a>
          <a href="#" className="text-sm text-[#5A554C] hover:underline font-WorkSans">About Us</a>
        </div>

        {/* Policies */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#5A554C] font-WorkSans">POLICIES</p>
          <a href="#" className="text-sm text-[#5A554C] hover:underline font-WorkSans">Shipping Policy</a>
          <a href="#" className="text-sm text-[#5A554C] hover:underline font-WorkSans">Terms of Service</a>
          <a href="#" className="text-sm text-[#5A554C] hover:underline font-WorkSans">Privacy Policy</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3 w-full sm:w-auto max-w-md">
          <p className="text-sm font-WorkSans text-[#5A554C] font-medium">
            SUBSCRIBE TO OUR MAILING LIST
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-10 rounded-md border border-[#929292] placeholder-[#5A554C] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A554C] font-WorkSans py-2"
              required
            />
            <button
              type="submit"
              className="h-10 px-4 bg-[#5A554C] text-white rounded-md text-sm font-WorkSans hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
