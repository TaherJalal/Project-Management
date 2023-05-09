import axios from 'axios'
import Link from 'next/link'
import React, { useState , useEffect } from 'react'

function signup() {

  const [firstName , setFirstName] = useState<string>()
  const [lastName , setLastName] = useState<string>()
  const [email , setEmail] = useState<string>()
  const [password , setPassword] = useState<string>()
  const [token , setToken] = useState<string>()

  useEffect(() => {
    console.log(token)
  }, [token])
  

const register = async (e:any) => {
  e.oreventDefault()
  const { data } = await axios.post("http://localhost:3000/api/auth/signup" , {
  firstName,
  lastName,
  email,
  password
  })

 console.log(data)

}

  return (
    <div className='dark:bg-neutral-950 dark:text-white h-screen w-screen font-montserrat flex justify-center items-center'>

<form className='w-2/4 flex flex-col gap-4' onSubmit={register}>
        <h2 className='text-3xl'>Sign Up</h2>

          <div className='flex flex-col'>
          <h3 className='text-xl'>First Name</h3>
          <input type="text" className='text-black' onChange={(e) => setFirstName(e.target.value)}/>
          </div>

          <div className='flex flex-col'>
          <h3 className='text-xl'>Last Name</h3>
          <input type="text" className='text-black' onChange={(e) => setLastName(e.target.value)}/>
          </div>

          <div className='flex flex-col'>
          <h3 className='text-xl'>Email Address</h3>
          <input type="email" className='text-black' onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className='flex flex-col'>
          <h3 className='text-xl'>Password</h3>
          <input type="password" className='text-black' onChange={(e) => setPassword(e.target.value)}/>
          </div>

        <div className='flex gap-2'>
          <p className='capitalize text-sm'>have an account?</p><Link href="/auth/signin">Login Here</Link>
        </div>
          <button type='submit' className='text-xl'>Register</button>
      </form>

    </div>
  )
}

export default signup