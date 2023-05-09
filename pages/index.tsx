import React, {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Link from 'next/link'
import {AiOutlineHome, AiOutlineArrowDown , AiOutlineArrowUp , AiOutlinePlus} from "react-icons/ai"

function index() {

  const [token ,setToken] = useState<string>("")
  const [state , setState] = useState<boolean>(false)

  useEffect(() => {
      console.log(localStorage.getItem("token"))
      setToken(localStorage.getItem("token")!)
      console.log(token)
  },[])


  return (
  <>

  {
   token ? 
   (
    <div>
        <div className='h-screen w-72 bg-rose-300 flex flex-col font-montserrat'>

          <div className='p-3 pl-6 flex flex-col gap-4 text-2xl font-semibold'>

            <div className='flex gap-2 justify-center items-center'>
          <Link href="/" >Home</Link>
          <AiOutlineHome />
            </div>

          <div className='flex flex-col gap-2 justify-center items-center'>
               <div className='flex gap-2 justify-center items-center' onClick={state ? () => setState(false) : () => setState(true)}>
          <p>Spaces</p>
          {
            state ? 
            (
          <AiOutlineArrowDown  />
            ) 
            : 
            (
          <AiOutlineArrowUp />
            ) 
          }
            </div> 
            <AiOutlinePlus />
          </div>
        
          </div>

        </div>
    </div>
   )
   
   : 
   
   (
    <div>
      <Navbar /> 
      <Hero />
    </div>
   )
  }
 

  </>
  )}

export default index