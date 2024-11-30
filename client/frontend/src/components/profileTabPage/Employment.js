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
        <InfoCard title='Unit:' info={unit} isEditable={false} />
        <InfoCard title='Unit UIC:' info={Unit_UIC} isEditable={false} />
        <InfoCard title='Trade:' info={Trade} isEditable={false} />
        <InfoCard title='MOSID:' info={MOSID} isEditable={false} />
        <InfoCard title='Position:' info={Position} isEditable={false} />
    </div>
</div>
  )
}

export default employment