import React, { useState, useEffect, useRef } from 'react';
import DataGrid from 'react-data-grid';
import '../../Styles/ProfilePage.css'
import Switch from 'react-switch'; 
import 'react-data-grid/lib/styles.css';
import InfoCard from '../InfoCard';

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false); // Initialize isAdmin to false

    const handleToggle = (checked) => {
        setIsAdmin(checked); // Update isAdmin based on toggle state
    };
    return (
        <div className='Admin'>
          
          <div className='AdminToggle'>
            <h1>Enable Admin Tools</h1>
            <label>
            <Switch
                        onChange={handleToggle}
                        checked={isAdmin}
                        offColor="#0000"
                        onColor="#74B72E"
                        uncheckedIcon={false}
                        checkedIcon={false}
                    />
                </label>
            <div className='AdminInfo'>
                <InfoCard title='Username:' info='Admin' iseditable={true} />
                <InfoCard title='Password:' info={isAdmin ? 'Enabled' : 'Disabled'} iseditable={true} />
            </div>
            < div className='AdminInfo'>
            <button>
                Save
            </button>
            </div>
          </div>
        </div>
    );
}

export default Admin;