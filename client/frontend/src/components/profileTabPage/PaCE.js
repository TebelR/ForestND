import React, { useState, useEffect, useRef } from 'react';
import DataGrid from 'react-data-grid';
import '../../Styles/ProfilePage.css'


const CustomSelectEditor = (props) => {
    const { onRowChange, row, column } = props;
  
    const handleChange = (event) => {
      onRowChange({ ...row, [column.key]: event.target.value });
    };
  
    return (
      <select value={row[column.key]} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>
    );
  };
const columns = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    {
      key: 'status',
      name: 'Status',
      editor: CustomSelectEditor,
    },
  ];
  
  const rows = [
    { id: 0, name: 'John Doe', status: 'active' },
    { id: 1, name: 'Jane Smith', status: 'inactive' },
    { id: 2, name: 'Bob Johnson', status: 'pending' },
  ];


function Courses() {
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

  const [data, setData] = useState(rows);

  const handleRowChange = (updatedRow) => {
    setData((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  };

  
  return (

    <div  className='Courses' ref={observedElementRef} >
      <DataGrid className='data-grid'   onrowChange={handleRowChange} columns={columns} rows={rows} />
      <></>
    </div>
  );
}

export default Courses;