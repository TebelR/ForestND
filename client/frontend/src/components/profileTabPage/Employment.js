import React from 'react'
import InfoCard from '../InfoCard'
import '../../Styles/employmentPg.css'
function employment({
    unit ,
    Unit_UIC,
    Trade,
    MOSID,
    Position
}) {
  return (
 <div className='child EmploymentInfo'>
    <h1>Employment Info</h1>
    <div className='InitialInfo'>
        <InfoCard title='Unit:' info={unit} iseditable={false} />
        <InfoCard title='Unit UIC:' info={Unit_UIC} iseditable={false} />
        <InfoCard title='Trade:' info={Trade} iseditable={false} />
        <InfoCard title='MOSID:' info={MOSID} iseditable={false} />
        <InfoCard title='Position:' info={Position} iseditable={false} />
    </div>
</div>
  )
}

export default employment