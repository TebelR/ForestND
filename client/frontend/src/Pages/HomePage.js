import React from 'react'
import '../Styles/HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../components/SearchBar'
import CommdBranch from '../components/CommdBranch'

function HomePage() {
  return (
    <div className='HomePage'>
      <SearchBar/>
      <CommdBranch/>
    </div>
  )
}

export default HomePage
