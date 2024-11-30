import React from 'react'
import InfoCard from './InfoCard'
import '../Styles/UserProfile.css'
function UserProfile({userPhoto, rank, dob, Fname, Lname, Mname, serviceNum, phone, email, address, postalCode, city, Province}) {
  return (
    <div className='userProfile'>

        
        <div className='memberInfo'>
            <h1>Member Information</h1>
            <div className='InitialInfo'>
                <InfoCard title='Rank' info={rank} isEditable={false} />
                <infoCard title='SN' info={serviceNum} isEditable={false} />
                <InfoCard title='First Name' info={Fname} isEditable={false} />
                <InfoCard title='Last Name' info={Lname} isEditable={false} />
                <InfoCard title='Middle Name' info={Mname} isEditable={false} />
                <InfoCard title='Service Number' info={serviceNum} isEditable={false} />
                <infoCard title='DOB' info={dob} isEditable={false} />
                <infoCard title='Cellphone' info={phone} isEditable={true} />
            </div>

            <div className='ContactInfo'>
                <InfoCard title='Email' info={email} isEditable={true}  size='large'/>
                <InfoCard title='Address' info={address} isEditable={false} size='large' />
                <InfoCard title = "Postal Code" info={postalCode} isEditable={false}/>
                <InfoCard title="City" info={city} isEditable={false}/>
                <infoCard title="Province" info={Province} isEditable={false}/>
            </div>
        </div>



        <div className='photoContainer'>
            <div className='memberPhoto'>
            <img src={userPhoto} alt="" />
            </div>
            <img className='memberStatus' src=""  />
        </div>


        <div className='EmergencyInfo'>
            <infoCard title='Emergency Contact' info={Fname} isEditable={false} />
        </div>
    </div>
  )
}
              
export default UserProfile
