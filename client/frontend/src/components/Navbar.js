import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faPieChart } from '@fortawesome/free-solid-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbarTop'>
          <Link to='/Home'><FontAwesomeIcon icon={faHome} /><br/>Home</Link>
          <Link to='/Analytics'><FontAwesomeIcon icon={faPieChart} /><br/>Analytics</Link>
          <Link to='/REOs'><FontAwesomeIcon icon={faBriefcase} /><br/>REOs</Link>
      </div>
      <div classname='navbarBottom'>
          <Link to='/Settings'><FontAwesomeIcon icon={faCog} /><br/>Settings</Link>
          <Link to='/Profile'><FontAwesomeIcon icon={faUser} /><br/>Profile</Link>
      </div>
    </div>
  )
}

export default Navbar