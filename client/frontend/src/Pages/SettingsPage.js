import React, { useState } from 'react';
import '../Styles/SettingsPage.css';
import Admin from '../components/settingTabPage/Admin';
import SearchBar from '../components/SearchBar';


const arrcolumns = [
    { key: 'key', name: 'Key' },
    { key: 'value', name: 'Value' },
];

const arrrows = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' },
];

function SettingsPage() {
    // Set the default active tab to 'Login'
    const [settingsActiveTab, setSettingsActiveTab] = useState('Login');

    const renderContent = () => {
        switch (settingsActiveTab) {
            case 'Login':
                return (
                    <div className='content1'>
                        {/* Add content for the Login tab here */}
                        <h2>Login Settings</h2>
                    </div>
                );
            case "Admin":
                return (
                    <div className='content1'>
                        {/* Add content for the Admin tab here */}
                        <Admin columns={arrcolumns} rows={arrrows}/>
                    </div>
                );
            case 'XYZ':
                return (
                    <div className='content1'>
                        {/* Add content for the XYZ tab here */}
                        <h2>XYZ Settings</h2>
                    </div>
                );
            case 'ASD':
                return (
                    <div className='content1'>
                        {/* Add content for the ASD tab here */}
                        <h2>ASD Settings</h2>
                    </div>
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className='container1'>
            <SearchBar />
            <div className='header1'>
                <h1 className='title1'>Settings</h1>
            </div>  
            <div className='tabs1'>
                <ul>
                    {['Login', "Admin", 'XYZ', 'ASD'].map(settingstab => (
                        <li key={settingstab} className={settingsActiveTab === settingstab ? 'active' : ''} onClick={() => setSettingsActiveTab(settingstab)}>
                            <a href="#">{settingstab}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='content1'>
                <div className='Profile1'>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;