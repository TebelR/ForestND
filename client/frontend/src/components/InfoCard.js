import React from 'react';
import '../Styles/infoCard.css';
function InfoCard({ title, info, isEditable, size = "small" }) {
    return (
        <div className='controller'>
            <h3>{title}</h3>
            {size === "small" ? (
                <div className='small-card'>
                    {isEditable ? (
                        <div className='editable'>
                            <input type="text" value={info} />
                        </div>
                    ) : (
                        <div className='nonEditable'>
                            <p>{info}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className='large-card'>
                    {isEditable ? (
                        <div className='editable'>
                            <input type="text" value={info} />
                        </div>
                    ) : (
                        <div className='nonEditable'>
                            <p>{info}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default InfoCard;