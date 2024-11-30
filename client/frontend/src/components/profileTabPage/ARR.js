import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import React, { useState, useEffect, useRef } from 'react';


function ARR({ columns, rows }) {
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
    <div ref={observedElementRef} style={{ resize: 'both', overflow: 'auto' }}>
      <div className=' QualificationsInfo'>
    
    <DataGrid columns={columns} rows={rows} /></div>;
    </div>
  );
}

export default ARR;