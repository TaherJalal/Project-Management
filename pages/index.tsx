import React from 'react'
import Navbar from './components/Navbar'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from 'next/image'

function index() {
  return (
    <>
      <Navbar />
      <div className='flex w-screen px-10 gap-10'>
        <Parallax pages={1}>
          <div className='flex flex-col justify-center gap-3 w-2/4'>
            <h3 className='text-4xl'>Lorem ipsum.</h3>
            <p className=''>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
              architecto eos suscipit modi explicabo quod aliquid reprehenderit,
              et ut nulla cumque ab obcaecati neque dolore consequuntur fugit
              eius omnis. Doloribus.
            </p>
          </div>
          <ParallaxLayer offset={0} speed={0.3}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src='/Ilustrations/Illustration 1.png'
                height={500}
                width={500}
                alt=''
              />
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
}

export default index