import React from 'react'
import InfoCard from '../InfoCard'
import '../../Styles/UserProfile.css'
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
                <InfoCard title='Rank:' info={rank} isEditable={false} />
                <infoCard title='SN:' info={serviceNum} isEditable={false} />
                <InfoCard title='First:' info={Fname} isEditable={false} />
                <InfoCard title='Last:' info={Lname} isEditable={false} />
                <InfoCard title='Middle:' info={Mname} isEditable={false} />
                <InfoCard title='SN:' info={serviceNum} isEditable={false} />
                <InfoCard title='DOB:' info={dob} isEditable={false} />
                
                <InfoCard title='Cell:' info={phone} isEditable={false} />
            </div>

            <div className=' ContactInfo'>
                <InfoCard title='Email' info={email} isEditable={true}  size='large'/>
                <InfoCard title='Address' info={address} isEditable={false} size='large' />
                <InfoCard title = "Postal Code" info={postalCode} isEditable={false}/>
                <InfoCard title="City" info={city} isEditable={false}/>
                <InfoCard title="Province" info={Province} isEditable={true}/>
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
