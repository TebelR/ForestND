import React, { useState } from 'react';
import UserProfile from '../components/profileTabPage/UserProfile';
import Employment from '../components/profileTabPage/Employment';
import Qualifications from '../components/profileTabPage/Qualifications';
import PaCE from '../components/profileTabPage/PaCE';
import ARR from '../components/profileTabPage/ARR';
import userPhoto from '../assets/profile.png';
import SearchBar from '../components/SearchBar';
import Courses from '../components/profileTabPage/Courses';
import FeedbackNotes from '../components/analyticsTabPage/FeedbackNote';
import '../Styles/AnalyticsPage.css';


const data = {
  serviceNum: "X0005",
  name: "test",
  rank: "Private",
  dob: "1980-01-01",
  position: "Det Mbr",
  status: "Active",
  unit: "test",
  Unit_UIC: "test", 
  Trade: "Signal Op",
  phone: "123-456-7890",
  MOSID: "test",
  MOS: "test",
  Position: "Rad Det 2",
  // Add other data properties as needed
};

const columns = [];
const rows = [];

const arrcolumns = [
  //Event ,Date From , Date To, Role, Notes, Sent to
  { key: 'event', name: 'Event' },
  { key: 'dateFrom', name: 'Date From' }, 
  { key: 'dateTo', name: 'Date To' },
  { key: 'role', name: 'Role' },
  { key: 'notes', name: 'Notes' },
  { key: 'sentTo', name: 'Sent to' },
];

const arrrows = [
  { event: 'Event 1', dateFrom: '2023-01-01', dateTo: '2023-01-02', role: 'Role 1', notes: 'Notes 1', sentTo: 'Sent to 1' },
  { event: 'Event 2', dateFrom: '2023-02-01', dateTo: '2023-02-02', role: 'Role 2', notes: 'Notes 2', sentTo: 'Sent to 2' },
  { event: 'Event 3', dateFrom: '2023-03-01', dateTo: '2023-03-02', role: 'Role 3', notes: 'Notes 3', sentTo: 'Sent to 3' },
];

const courseColumns = [
  //Title, Date Staerted, Date Completed, Serial, Location, Status, Description, Approved By
  { key: 'title', name: 'Title' },
  { key: 'dateStarted', name: 'Date Started' },
  { key: 'dateCompleted', name: 'Date Completed' },
  { key: 'serial', name: 'Serial' },
  { key: 'location', name: 'Location' },
  { key: 'status', name: 'Status' },
  { key: 'description', name: 'Description' },
  { key: 'approvedBy', name: 'Approved By' },
]

const courseRows = [
  { title: 'Course 1', dateStarted: '2023-01-01', dateCompleted: '2023-01-02', serial: '1234', location: 'Location 1', status: 'Completed', description: 'Description 1', approvedBy: 'John Doe' },
  { title: 'Course 2', dateStarted: '2023-02-01', dateCompleted: '2023-02-02', serial: '1234', location: 'Location 2', status: 'Completed', description: 'Description 2', approvedBy: 'John Doe' },
  { title: 'Course 3', dateStarted: '2023-03-01', dateCompleted: '2023-03-02', serial: '1234', location: 'Location 3', status: 'Completed', description: 'Description 3', approvedBy: 'John Doe' },
]

const qualscolumns = [
  //Date aquired
  //Expiry, serial , Description, Approved By
  { key: 'title', name: 'Title' },
  { key: 'dateAquired', name: 'Date aquired' },
  { key: 'expiry', name: 'Expiry' },
  { key: 'serial', name: 'Serial' },
  { key: 'description', name: 'Description' },
  { key: 'approvedBy', name: 'Approved By' },
];

const qualsrows = [
  { title: 'Driver Wheel common', dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem   ipusum     lorem ipusum', approvedBy: 'John Doe' },
  { title:'Basic first Aid' , dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem ipusum  lorem ipusum', approvedBy: 'John Doe' },
  { title: 'Driver Wheel common', dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem   ipusum     lorem ipusum', approvedBy: 'John Doe' },
  { title:'Basic first Aid' , dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem ipusum  lorem ipusum', approvedBy: 'John Doe' },
  { title: 'Driver Wheel common', dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem   ipusum     lorem ipusum', approvedBy: 'John Doe' },
  { title:'Basic first Aid' , dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem ipusum  lorem ipusum', approvedBy: 'John Doe' },
  { title: 'Driver Wheel common', dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem   ipusum     lorem ipusum', approvedBy: 'John Doe' },
  { title:'Basic first Aid' , dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem ipusum  lorem ipusum', approvedBy: 'John Doe' },
  { title: 'Driver Wheel common', dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem   ipusum     lorem ipusum', approvedBy: 'John Doe' },
  { title:'Basic first Aid' , dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem ipusum  lorem ipusum', approvedBy: 'John Doe' },
  { title: 'Driver Wheel common', dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem   ipusum     lorem ipusum', approvedBy: 'John Doe' },
  { title:'Basic first Aid' , dateAquired: '2023-01-01', expiry: '2024-01-01', serial: '1234', description: 'lorem ipusum lorem ipusum  lorem ipusum', approvedBy: 'John Doe' },
];



function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Profile');


  const renderContent = () => {
    switch (activeTab) {
      case 'Feedback Notes':
        return (
          <div className='content2'>
            <FeedbackNotes />
          </div>
        );
      case "MAP":
        return <div className='content2'>
         Map
        </div>;
      case 'Job Description':
        return <div className='content2'> 
        Job Description
        </div>;
      case 'RER/PDR':
        return <div className='content2'>
        RER/PDR
        </div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className='container'>
      <SearchBar />
      <div className='header'>
        <h1 className='title2'>{data.position}</h1>
      </div>  
      <div className='tabs'>
        <ul>
          {['Feedback Notes', "MAP",'Job Description', 'RER/PDR'].map(atab => (
            <li key={atab} className={activeTab === atab ? 'active' : ''} onClick={() => setActiveTab(atab)}>
              <a href="#">{atab}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className='content'>
        <div className='Profile'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;