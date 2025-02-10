import React from 'react'

const Navbar = () => {
  
  
  return (
    <nav className='bg-[#af7eeb] text-white flex justify-between py-3 px-5 text-lg'>
        <div className='font-bold'>
            iTask
        </div>
      <ul className='flex gap-5'>
        <li className='hover:font-bold cursor-pointer transition-all'>Home</li>
        <li className='hover:font-bold cursor-pointer transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
