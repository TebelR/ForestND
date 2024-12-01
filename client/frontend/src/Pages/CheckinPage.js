import React, { useState } from 'react';
import '../Styles/CheckinPage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CheckinPage() {
    const [date, setDate] = useState(new Date());
    const [checkIns, setCheckIns] = useState({}); // Track check-ins

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleCheckIn = () => {
        const dateString = date.toDateString();
        const newCheckIns = { ...checkIns };

        // Initialize the check-in for the date if it doesn't exist
        if (!newCheckIns[dateString]) {
            newCheckIns[dateString] = { checkIn: false }; // Default checkIn to false
        }

        // Only update if not checked in yet
        if (!newCheckIns[dateString].checkIn) {
            newCheckIns[dateString].checkIn = true; // Set checkIn to true
            setCheckIns(newCheckIns);
        }
    };

    const tileClassName = ({ date, view }) => {
        const dateString = date.toDateString();
        // Add a class if the date has a check-in
        if (checkIns[dateString]?.checkIn) {
            return 'checked-in';
        }
        return null;
    };

    return (
        <div className="CheckinPage">

            <h1 className='title'>TeamTrack</h1>
            <div className="Calendar">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    tileClassName={tileClassName} // Set the class for each tile
                />
            </div>

            <div className='eventList'>
            <h1>Check-in</h1>
            <h2> {date.toDateString()}:</h2>
                <ul>
                    {checkIns[date.toDateString()] && checkIns[date.toDateString()].checkIn ? (
                        <li>*you have checked in*</li>
                    ) : (
                        <li>Not checked-in</li>
                    )}
                </ul>
                <div className='checkin'>
                   
                    <button onClick={handleCheckIn} disabled={checkIns[date.toDateString()]?.checkIn} 
                    style={{ backgroundColor: checkIns[date.toDateString()]?.checkIn ? '#bcc1ca' : '#8f94ee' }}
                    >
                        {checkIns[date.toDateString()]?.checkIn ? 'Checked In' : 'Check In'}
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default CheckinPage;