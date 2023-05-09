import React, {useState , useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'

function signin() {
  
  const [email ,setEmail] = useState<string>("")
  const [password ,setPassword] = useState<string>("")
  const [token ,setToken] = useState<string>("")

  useEffect(() => {
    console.log(token)
  },[token])

  const login = async (event:any) => {
    event.preventDefault()
  const {data} = await axios.post("http://localhost:3000/api/auth/signin", {
      email,
      password
    })

    setToken(data.token)
    localStorage.setItem("token" , data.token)
    window.location.reload()
  }

  return (
    <div className='dark:bg-neutral-950 dark:text-white h-screen w-screen font-montserrat flex justify-center items-center'>
      <form className='w-2/4 flex flex-col gap-4' onSubmit={login}>
        <h2 className='text-3xl'>Sign In</h2>

          <div className='flex flex-col'>
          <h3 className='text-xl'>Email Address</h3>
          <input type="email" className='text-black' onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className='flex flex-col'>
          <h3 className='text-xl'>Password</h3>
          <input type="password" className='text-black' onChange={(e) => setPassword(e.target.value)}/>
          </div>

        <div className='flex gap-2'>
          <p className='capitalize text-sm'>Don't Have an account</p><Link href="/auth/signup">Register Here</Link>
        </div>
          <button type="submit" className='text-xl'>Login</button>
      </form>
    </div>
  )
}

export default signin