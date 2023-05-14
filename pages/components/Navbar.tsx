import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="font-montserrat font-medium text-lg flex justify-between px-5 py-1 dark:bg-zinc-900 dark:text-white text-black bg-emerald-200">
      <div className="flex gap-5 font-montserrat">
        <Link href="/">Home</Link>
      </div>

      <div className="flex gap-5 font-montserrat">
        <Link href="/about">About Us</Link>
        <Link href="/auth/signin">Register/Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
