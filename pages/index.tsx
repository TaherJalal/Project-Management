import React, {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Link from 'next/link'
import {RxHamburgerMenu} from 'react-icons/rx'
import {AiOutlineHome, AiOutlineArrowDown , AiOutlineArrowUp , AiOutlineArrowLeft , AiOutlinePlus} from "react-icons/ai"
import {HiOutlineArrowLeft} from 'react-icons/hi'
function index() {

  const [token ,setToken] = useState<string>("")
  const [state , setState] = useState<boolean>(false)
  const [showSideBar , setShowSideBar] = useState<boolean>(false)
  const [spaces ,setSpaces] = useState([])
  const [newSpaceState , setNewSpaceState] = useState(false)

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
      {
        !showSideBar ? 
        (
          <div className='w-20 h-screen flex justify-center py-3 bg-rose-300' onClick={() => setShowSideBar(true)}>
            <div className='flex justify-end'>
            <RxHamburgerMenu size={40}/>
            </div>
          </div>
        )
        :
        (
          <div className='h-screen w-72 bg-rose-300 flex flex-col font-montserrat'>

          <div className='p-3 pl-6 flex flex-col gap-4 text-2xl font-semibold'>
<div className='flex justify-end'>

            <HiOutlineArrowLeft size={40} onClick={() => setShowSideBar(false)}/>
</div>

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


            <div className='flex gap-2 justify-center items-center' onClick={newSpaceState ? () => setNewSpaceState(false) : () => setNewSpaceState(true)}>

            <AiOutlinePlus />
            {
            newSpaceState 
            ?

            (
            <form className='text-black'>
            <input type="text" placeholder='Space Name' className='text-sm rounded-sm text-center' />
            </form>
            )

            :

            (
            <></>   
            )

            }
            
            </div>

          </div>
        
          </div>

        </div>
        )
      }

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