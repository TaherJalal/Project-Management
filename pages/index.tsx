import React from 'react'
import Navbar from './components/Navbar'
import Image from 'next/image'
import { Parallax } from 'react-scroll-parallax';

function index() {
  return (
  <>
  <Navbar />
  <div className='flex w-screen px-20 justify-center gap-5'>
  <div className='flex flex-col justify-center gap-3 w-2/4'>
  <h3 className='text-4xl'>Lorem ipsum.</h3>
  <p className='text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione architecto eos suscipit modi explicabo quod aliquid reprehenderit, et ut nulla cumque ab obcaecati neque dolore consequuntur fugit eius omnis. Doloribus.</p>
  </div>
    <Parallax speed={10} translateY={[-20 ,20]}>
    <Image src="/Ilustrations/Illustration 1.png" height={600} width={600} alt=''/>
    </Parallax>
  </div>
  
  </>
  )}

export default index