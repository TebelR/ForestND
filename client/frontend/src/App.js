import logo from './logo.svg';
import './App.css';
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CommdBranch from './components/CommdBranch';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
        <Routes>
        <Route path="/" exact Component={LoginPage}/>
        <Route path="/Home" exact Component={HomePage}/>
        </Routes>
    </Router>
  </div>
  );
}

export default App;
