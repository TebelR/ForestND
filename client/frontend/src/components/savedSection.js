import React from 'react'
import axios from 'axios'
import "../Styles/savedSection.css";
import { useState, useEffect } from 'react';


function SavedSection({ loadFamily }) {//onRefresh
    const [treeFamiliesNames, setTreeFamiliesNames] = useState([]);

    const fetchFamilies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v0/getFamilyNames');
            setTreeFamiliesNames(response.data);
        } catch (err) {
            console.error(err);
            alert("Error while retrieving families");
        }
    };


    React.useEffect(() => {
        fetchFamilies();
    }, []);

    // React.useEffect(() => {
    //     if (typeof onRefresh === 'function') {
    //         onRefresh(() => {
    //             fetchFamilies();
    //         });
    //     }
    // }, [onRefresh]);


    return (
        <div className='savedSection'>
            <p>Saved Work</p>
            {treeFamiliesNames.map((family) => (
                <button
                    key={family}
                    className="saveButton"
                    onClick={() => loadFamily(family)}
                >
                    {family}
                </button>
            ))}
        </div>
    )
}

export default SavedSection