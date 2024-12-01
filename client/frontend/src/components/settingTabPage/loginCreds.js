import React, { useState, useEffect, useRef } from 'react';
import DataGrid from 'react-data-grid';
import '../../Styles/ProfilePage.css'
import Switch from 'react-switch'; 
import InfoCard from '../InfoCard';

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false); 

    const handleToggle = (checked) => {
        setIsAdmin(checked); // Update isAdmin based on toggle state
    };
    return (
        <div className='Admin'>
          
          <div className='AdminToggle'>
            <h1>Login Cerentials</h1>
            <div className='AdminInfo'>
                <InfoCard title='Username:' info='Admin' iseditable={true} />
                <InfoCard title='Password:' info={isAdmin ? 'Enabled' : 'Disabled'} iseditable={true} />
            </div>

            < div className='changePassword'>
            
                <Link to="/Home">change Password?</Link>

            
            </div>
          </div>
        </div>
    );
}

export default Admin;