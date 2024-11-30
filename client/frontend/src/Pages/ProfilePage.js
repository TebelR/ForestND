import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import '../Styles/ProfilePage.css';
import userPhoto from '../assets/profile.png';
const data = {
  "serviceNum": "X0005",
  "name": "test",
  "rank": "Private",
  "enrollmentDate": "2002-01-01",
  "drivingLicenseExpirationDate": "2023-01-01",
  "dob": "1980-01-01",
  "qualificationPacketID": 6,
  "coursePacketID": 6,
  "address": "test",
  "email": "test",
  "phone": "test",
  "dlnPackageID": 6,
  "position": "Det Mbr",
  "userPhoto": "../assets/profile.png"
};

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <UserProfile 
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
            postalCode={data.address}
            city={data.address}
            Province={data.address}
            
          />
        );
      case 'Employment':
        return <div>Employment Content</div>;
      case "APR's":
        return <div>APR's Content</div>;
      case 'Qualifications':
        return <div>Qualifications Content</div>;
      case 'Courses':
        return <div>Courses Content</div>;
      case 'PaCE':
        return <div>PaCE Content</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1>{
          data.position}</h1>
      </div>  
      <div className='tabs'>
        <ul>
          {/* Update the active tab on click */}
          <li onClick={() => setActiveTab('Profile')}><a href="#">Profile</a></li>
          <li onClick={() => setActiveTab('Employment')}><a href="#">Employment</a></li>
          <li onClick={() => setActiveTab("APR's")}><a href="#">APR's</a></li>
          <li onClick={() => setActiveTab('Qualifications')}><a href="#">Qualifications</a></li>
          <li onClick={() => setActiveTab('Courses')}><a href="#">Courses</a></li>
          <li onClick={() => setActiveTab('PaCE')}><a href="#">PaCE</a></li>
        </ul>
      </div>

      <div className='content'>
        <div className='Profile'>
          {renderContent()} {

          }
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;