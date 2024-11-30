import React, { useState, useEffect, useRef } from 'react';
import DataGrid from 'react-data-grid';
import '../../Styles/ProfilePage.css'

function Courses({ columns, rows }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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
    <div  className='Courses' ref={observedElementRef} style={{ resize: 'both', overflow: 'auto' }}>
       
      <DataGrid className='data-grid' columns={columns} rows={rows} />
    
    </div>
  );
}

export default Courses;