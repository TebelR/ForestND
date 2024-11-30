import React, { useState } from 'react';
import UserProfile from '../components/profileTabPage/UserProfile';
import Employment from '../components/profileTabPage/Employment';
import Qualifications from '../components/profileTabPage/Qualifications';
import ARR from '../components/profileTabPage/ARR';
import '../Styles/ProfilePage.css';

import userPhoto from '../assets/profile.png';
import SearchBar from '../components/SearchBar';
import Courses from '../components/profileTabPage/Courses';



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
const columns = [
  //Date aquired
  //Expiry, serial , Description, Approved By
  { key: 'title', name: 'Title' },
  { key: 'dateAquired', name: 'Date aquired' },
  { key: 'expiry', name: 'Expiry' },
  { key: 'serial', name: 'Serial' },
  { key: 'description', name: 'Description' },
  { key: 'approvedBy', name: 'Approved By' },
];

const rows = [
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



function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className='content'>
            <UserProfile 
              status={data.status}
              userPhoto={userPhoto}
              rank={data.rank}
              dob={data.dob}
              Fname={data.name}
              Lname={data.name}
              Mname={data.name}
              serviceNum={data.serviceNum}
              phone={data.phone}
              email={data.email} 
              address={data.address}
            />
          </div>
        );
      case "ARR's":
        return <div className='content'>
          <ARR 
          columns={
            columns
          }
          rows={
            rows
          }
          />
        </div>;
      case 'Qualifications':
        return <div className='content'> 
        <Qualifications  
        columns={
          columns
        }
        rows={
          rows
        }
        />
        </div>;
      case 'Courses':
        return <div className='content'>
          <Courses 
          columns={
            columns
          }
          rows={
            rows
          }
          />
        </div>;
      case 'PaCE':
        return <div>PaCE Content</div>;
        case 'Employment':
          return <div className='content'>
            <Employment
              unit={data.unit}
              Unit_UIC={data.Unit_UIC}
              Trade={data.Trade}
              MOSID={data.MOSID}
              Position={data.Position}
              />
          </div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className='container'>
      <SearchBar />
      <div className='header'>
        <h1 className='title'>{data.position}</h1>
      </div>  
      <div className='tabs'>
        <ul>
          {['Profile', "ARR's", 'Employment','Qualifications', 'Courses', 'PaCE'].map(tab => (
            <li key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
              <a href="#">{tab}</a>
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

export default ProfilePage;