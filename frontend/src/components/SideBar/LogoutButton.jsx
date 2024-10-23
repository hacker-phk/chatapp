import React from 'react'
// import {BIlogout} from 'react-icons/bi'
import { CiLogout } from "react-icons/ci";

function LogoutButton() {
  return (
    <div className='mt-auto'>
        <CiLogout className='w-6 h-6 text-white cursor-pointer'/>
    </div>
  )
}

export default LogoutButton