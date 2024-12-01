import logo from './logo.svg';
import './App.css';
import  {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import CommdBranch from './components/CommdBranch';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';
import ProfilePage from './Pages/ProfilePage';
import CheckinPage from './Pages/CheckinPage';
import REOsPage from './Pages/REOsPage';
import AnalyticsPage from './Pages/AnalyticsPage';
import SettingsPage from './Pages/SettingsPage';


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Analytics" element={<AnalyticsPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/REOs" element={<REOsPage />} />\
        <Route path="/Settings" element={<SettingsPage/>} />
      </Routes>
    </div>
  );
}

export default App;