import logo from './logo.svg';
import './App.css';
import  {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import CommdBranch from './components/CommdBranch';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';
import ProfilePage from './Pages/ProfilePage';


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
        <Route path="/Profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;