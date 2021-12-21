import './App.css';
// import { Button } from 'react-bootstrap';
import Header from './components/Header'
import {Routes,Route} from 'react-router-dom'
import CertData from './components/CertData'
import Chart1 from './components/Chart1'
import Chart2 from './components/Chart2' 
function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<CertData />} />
          <Route path="/chart1" element={<Chart1 />} />
          <Route path="/chart2" element={<Chart2 />} />
        </Routes>
    </div>
  );
}

export default App;
