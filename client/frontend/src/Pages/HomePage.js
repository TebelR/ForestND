import React from 'react'
import '../Styles/HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../components/SearchBar'
import CommdBranch from '../components/CommdBranch'
import GraphTools from '../components/GraphTools'
function HomePage() {
  return (
    <div className='HomePage'>
      <SearchBar />
      <div className="commdBranch">
        <CommdBranch />
      </div>
    </div>
  )
}

export default HomePage
