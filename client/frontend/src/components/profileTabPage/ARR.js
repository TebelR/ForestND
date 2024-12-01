import React, { useState, useEffect, useRef } from 'react';
import DataGrid from 'react-data-grid';
import '../../Styles/ProfilePage.css'
import 'react-data-grid/lib/styles.css';

function ARR({ columns, rows }) {
  const [,setDimensions] = useState({ width: 0, height: 0 });
  const observedElementRef = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (observedElementRef.current) {
      observer.observe(observedElementRef.current);
    }

    // Cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div  className='ARR' ref={observedElementRef} >
      <DataGrid className='data-grid' columns={columns} rows={rows} />
    
    </div>
  );
}

export default ARR;