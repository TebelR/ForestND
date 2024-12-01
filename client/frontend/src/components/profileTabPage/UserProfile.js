import React from 'react'
import InfoCard from '../InfoCard'
import '../../Styles/ProfilePage.css'
import activeIcon from '../../assets/activeStatus.png'
import inactiveIcon from'../../assets/inActiveStatus.png'

function UserProfile({status,
    userPhoto,
     rank,
      dob,
       Fname, 
       Lname,
        Mname,
         serviceNum,
          phone,
           email, 
           address,
            postalCode,
             city, Province}) {
                
  return (
    <div className='userProfile'>

        
        <div className='child memberInfo'>
            <h1 >Member Information</h1>
            <div className='InitialInfo'>
                <InfoCard title='Rank:' info={rank} iseditable={false} />
                <infoCard title='SN:' info={serviceNum} iseditable={false} />
                <InfoCard title='First:' info={Fname} iseditable={false} />
                <InfoCard title='Last:' info={Lname} iseditable={false} />
                <InfoCard title='Middle:' info={Mname} iseditable={false} />
                <InfoCard title='SN:' info={serviceNum} iseditable={false} />
                <InfoCard title='DOB:' info={dob} iseditable={false} />
                
                <InfoCard title='Cell:' info={phone} iseditable={false} />
            </div>

            <div className=' ContactInfo'>
                <InfoCard title='Email' info={email} iseditable={true}  size='large'/>
                <InfoCard title='Address' info={address} iseditable={false} size='large' />
                <InfoCard title = "Postal Code" info={postalCode} iseditable={false}/>
                <InfoCard title="City" info={city} iseditable={false}/>
                <InfoCard title="Province" info={Province} iseditable={true}/>
            </div>
        </div>



        <div className='child photoContainer'>
            <div className='memberPhoto'>
            <img src={userPhoto} alt="" />
            {status.toLowerCase() === 'active' ?
            
            (<div className='status'>
               <img src={activeIcon} alt="" />
            </div>) 
            : (<div className='status'>
               <img src={inactiveIcon} alt="" />
            </div>)}
            </div>
          
        </div>


        <div className='child EmergencyInfo'>
            <h1>Emergency Info</h1>
            <div className='InitialInfo'>
                <InfoCard title='Unit:' info={Fname} isEditable={false} />
                <InfoCard title='Unit UIC:' info={Lname} isEditable={false} />
                <InfoCard title='Trade:' info={Mname} isEditable={false} />
                <InfoCard title='MOSID:' info={serviceNum} isEditable={false} />
                <InfoCard title='Position:' info={dob} isEditable={false} />
            </div>
        </div>
    </div>
  )
}
           
export default UserProfile
