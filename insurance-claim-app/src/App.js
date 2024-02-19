import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import MakeClaim from "./Pages/MakeClaim";
import ProcessClaim from "./Pages/ProcessClaim";
import VerifyClaim from "./Pages/VerifyClaim";

function App() {
  return (
    <div className="App">
      <h1>Insurance Company</h1>
      <div className='background-banner'></div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/MakeClaim' element={<MakeClaim />} /> 
          <Route path='/ProcessClaim' element={<ProcessClaim />} /> 
          <Route path='/VerifyClaim' element={<VerifyClaim />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
