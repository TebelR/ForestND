import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <div className='Navbar'>
        <Link to='/Home'><FontAwesomeIcon icon={faHome} /> Home</Link>
        <Link to='/'><FontAwesomeIcon icon={faSignOut} /> Login</Link>
        <Link to='/Settings'><FontAwesomeIcon icon={faCog} /> Settings</Link>
        <Link to='/Profile'><FontAwesomeIcon icon={faUser} /> Profile</Link>
    </div>
  )
}

export default Navbar