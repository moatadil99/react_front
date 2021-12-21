import './App.css';
// import { Button } from 'react-bootstrap';
import Header from './components/Header'
import {Routes,Route} from 'react-router-dom'
import CertData from './components/CertData'
import Chart1 from './components/Chart1'
import Chart2 from './components/Chart2' 
import Classes from './components/header.module.css'

function App() {
  return (
    <div className="App">
      
        <Header/>
        <h1 className={Classes.header}> All Certifications</h1>
        <Routes>
          <Route path="/main" element={<CertData />} />
          <Route path="/chart1" element={<Chart1 />} />
          <Route path="/chart2" element={<Chart2 />} />
        </Routes>
    </div>
  );
}

export default App;
