import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='Navbar'>
    <div className='NavbarContainer'>
        <Link to='/'>Login</Link>
        <Link to='/Home'>Home</Link>
    </div>
      
    </div>
  )
}

export default Navbar