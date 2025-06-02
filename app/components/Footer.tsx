'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log('Subscribed email:', email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#FFD7E1] py-8 px-4 md:px-16 mx-auto max-w-screen-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 - Logo */}
        <div className="flex flex-col gap-1">
          <h3 className="font-WorkSans font-medium text-[9px] md:text-[9px] text-[#5A554C]">
            TEMADE
          </h3>
          <p className="font-WorkSans font-medium text-[9px] text-[#5A554C]">
            2025 ALL RIGHTS RESERVED
          </p>
        </div>

        {/* Column 2 - Links */}
        <div className="flex flex-col gap-2">
          <a href="#" className="font-WorkSans font-normal text-[12px] text-[#5A554C] hover:underline transition-all">
            INSTAGRAM
          </a>
          <a href="#" className="font-WorkSans font-normal text-[12px] text-[#5A554C] hover:underline transition-all">
            CONTACT US
          </a>
          <a href="#" className="font-WorkSans font-normal text-[12px] text-[#5A554C] hover:underline transition-all">
            ABOUT US
          </a>
        </div>

        {/* Column 3 - Policies */}
        <div className="flex flex-col gap-2">
          <a href="#" className="font-WorkSans font-normal text-[12px] text-[#5A554C] hover:underline transition-all">
            SHIPPING POLICY
          </a>
          <a href="#" className="font-WorkSans font-normal text-[12px] text-[#5A554C] hover:underline transition-all">
            TERMS OF SERVICE
          </a>
          <a href="#" className="font-WorkSans font-normal text-[12px] text-[#5A554C] hover:underline transition-all">
            PRIVACY POLICY
          </a>
        </div>

        {/* Column 4 - Newsletter */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
          <p className="font-WorkSans font-normal text-[12px] text-[#5A554C]">
            SUBSCRIBE TO OUR MAILING LIST
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-[230px] h-[27px] rounded-[6px] border-[1px] border-[#929292] placeholder-[#5A554C] px-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#5A554C]"
              style={{ fontFamily: 'Work Sans', fontWeight: 400 }}
              required
            />
            <button
              type="submit"
              className="bg-[#5A554C] text-white text-[12px] px-3 rounded-[6px] hover:bg-opacity-90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}