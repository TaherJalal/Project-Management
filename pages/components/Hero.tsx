import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <div className='text-black dark:bg-neutral-950 dark:text-white bg-emerald-200'>

  <Parallax pages={3}>


    <ParallaxLayer offset={1} speed={0.5} >
    <div className='flex w-screen px-20 justify-center gap-5 py-7 font-montserrat'>
  <div className='flex flex-col justify-center gap-3 w-2/4'>
  <h3 className='text-4xl'>Lorem ipsum.</h3>
  <p className='text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione architecto eos suscipit modi explicabo quod aliquid reprehenderit, et ut nulla cumque ab obcaecati neque dolore consequuntur fugit eius omnis. Doloribus.</p>
  </div>
    <Image src="/Ilustrations/Illustration 1.png" height={600} width={600} alt=''/>
  </div>
    </ParallaxLayer>


    <ParallaxLayer offset={2} speed={-0.5}>
    <div className='flex w-screen px-20 justify-center gap-5 py-7 font-montserrat'>
  <div className='flex flex-col justify-center gap-3 w-2/4'>
  <h3 className='text-4xl'>Lorem ipsum.</h3>
  <p className='text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione architecto eos suscipit modi explicabo quod aliquid reprehenderit, et ut nulla cumque ab obcaecati neque dolore consequuntur fugit eius omnis. Doloribus.</p>
  </div>
    <Image src="/Ilustrations/Illustration 2.png" height={600} width={600} alt=''/>
  </div>
    </ParallaxLayer>


    <ParallaxLayer offset={3} speed={1}>
    <div className='flex w-screen px-20 justify-center gap-5 py-7 font-montserrat'>
  <div className='flex flex-col justify-center gap-3 w-2/4'>
  <h3 className='text-4xl'>Lorem ipsum.</h3>
  <p className='text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione architecto eos suscipit modi explicabo quod aliquid reprehenderit, et ut nulla cumque ab obcaecati neque dolore consequuntur fugit eius omnis. Doloribus.</p>
  </div>
    <Image src="/Ilustrations/Illustration 3.png" height={600} width={600} alt=''/>
  </div>
    </ParallaxLayer>


  </Parallax>

  </div>
  )
}

export default Hero