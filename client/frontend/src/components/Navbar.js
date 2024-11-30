import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Navbar.css"
function Navbar() {
  return (
    <div className='Navbar'>
    <div className='commonNav'>
        <Link to='/'>Login</Link>
        <Link to='/Home'>Home</Link>
    </div>
    <div className='ProfileNav'>
        <Link to='/Settings'>Settings</Link>
        <Link to='/Profile'>Profile</Link>
    </div>
    </div>
  )
}

export default Navbar