import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='font-montserrat font-medium text-lg flex justify-between px-5 py-1'>

    <div className='flex gap-5 font-montserrat'>
  <Link href="/">Home</Link>
  <Link href="/space">Spaces</Link>
  <Link href="/">Blah</Link>
    </div>

  <div className='flex gap-5 font-montserrat'>
  <Link href="/about">About Us</Link>
  <Link href="/login">Register/Login</Link>
  </div>

  </div>
  )
}

export default Navbar