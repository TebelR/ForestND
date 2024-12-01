import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FeedbackNote = () => {
    const [data, setData] = useState([
    //author, date, type, Evaluation Period , Note, Acknowledged by
    { author: 'John Doe', date: '2022-01-01', type: 'MAP', EvaluationPeriod: '2022-01-01', Note: 'This is a note.', AcknowledgedBy: 'John Doe' },
    { author: 'John Doe', date: '2022-01-01', type: 'MAP', EvaluationPeriod: '2022-01-01', Note: 'This is another note.', AcknowledgedBy: 'John Doe' },
    { author: 'John Doe', date: '2022-01-01', type: 'MAP', EvaluationPeriod: '2022-01-01', Note: 'This is another note.', AcknowledgedBy: 'John Doe' },
    { author: 'John Doe', date: '2022-01-01', type: 'MAP', EvaluationPeriod: '2022-01-01', Note: 'This is another note.', AcknowledgedBy: 'John Doe' }        // Add more rows as needed
    ]);

    const handleDropdownChange = (id, field, value) => {
        const updatedData = data.map((row) => (row.id === id ? { ...row, [field]: value } : row));
        setData(updatedData);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Feedback Notes',
                accessor: 'feedbackNotes',

                Cell: ({ row }) => (
                    <input
                        type="text"
                        value={row.original.feedbackNotes}
                        onChange={(e) => handleDropdownChange(row.original.id, 'feedbackNotes', e.target.value)}
                    />
                ),
            },
            {
                Header: 'MAP',
                accessor: 'map',
                Cell: ({ row }) => (
                    <FormControl fullWidth>
                        <InputLabel id={`map-label-${row.original.id}`}>Select MAP</InputLabel>
                        <Select
                            labelId={`map-label-${row.original.id}`}
                            value={row.original.map}
                            onChange={(e) => handleDropdownChange(row.original.id, 'map', e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Option 1">Option 1</MenuItem>
                            <MenuItem value="Option 2">Option 2</MenuItem>
                            <MenuItem value="Option 3">Option 3</MenuItem>
                        </Select>
                    </FormControl>
                ),
            },
            {
                Header: 'Job Description',
                accessor: 'jobDescription',
                Cell: ({ row }) => (
                    <input
                        type="text"
                        value={row.original.jobDescription}
                        onChange={(e) => handleDropdownChange(row.original.id, 'jobDescription', e.target.value)}
                    />
                ),
            },
            {
                Header: 'RER/PDR',
                accessor: 'rerPdr',
                Cell: ({ row }) => (
                    <FormControl fullWidth>
                        <InputLabel id={`rer-pdr-label-${row.original.id}`}>Select RER/PDR</InputLabel>
                        <Select
                            labelId={`rer-pdr-label-${row.original.id}`}
                            value={row.original.rerPdr}
                            onChange={(e) => handleDropdownChange(row.original.id, 'rerPdr', e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="RER">RER</MenuItem>
                            <MenuItem value="PDR">PDR</MenuItem>
                        </Select>
                    </FormControl>
                ),
            },
        ],
        [data] // Dependencies for useMemo
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} style={{ width: '100%', border: '1px solid black' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default FeedbackNote;