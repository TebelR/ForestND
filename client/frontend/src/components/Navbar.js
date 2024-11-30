import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faUser, faHome, faCog, faPieChart, faBriefcase } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbarTop'>
        <Link to='/Home'><FontAwesomeIcon icon={faHome} /><br />Home</Link>
        <Link to='/Analytics'><FontAwesomeIcon icon={faPieChart} /><br />Analytics</Link>
        <Link to='/REOs'><FontAwesomeIcon icon={faBriefcase} /><br />REOs</Link>
        <Link to='/Checkin'><FontAwesomeIcon icon={faCheckCircle} /><br />Check In</Link>
      </div>
      <div className='navbarBottom'>
        <Link to='/Settings'><FontAwesomeIcon icon={faCog} /></Link>
        <Link to='/Profile'><FontAwesomeIcon icon={faUser} /></Link>
      </div>
    </div>
  )
}

export default Navbar