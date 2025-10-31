import React from 'react'
import assets from '../assets/assets.js'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,120px)]' src={assets.NavBarLogo} alt="" />
      <button 
        onClick={() => setToken('')} 
        className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-2xl text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  )
}

export default Navbar
