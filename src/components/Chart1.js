import React,{useState,useEffect} from 'react'
import {Pie} from "react-chartjs-2";
import axios from 'axios'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function Chart1() {

  const [countOfCert, setCountOfCert] = useState(0);
  const [countOfExpiryCert, setCountOfExpiryCert] = useState(0);
  const getCerts = async () => {
    try {
        const Cert= await
        axios.get("http://127.0.0.1:8000/api/getdetails")
        setCountOfCert(Cert.data.allCert)
        setCountOfExpiryCert(Cert.data.expireCert)
        } catch (err) {
          console.error(err.message);
        }
    };
    useEffect(() => {
        getCerts();
    },[])

    const data = {
        labels: [
          'Expiry Certificates', 
          'All Certificates',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [countOfExpiryCert,countOfCert ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      };
      const config = {
        type: 'pie',
        data: data,
      };
    return (
      <>
                <h1> Chart for Expiry Certificates</h1>
        <div  style={{width: "500px",height: "500px",margin:'auto'}}  >
            <Pie  
                width='650' height='350'
                config={config}
                data={data} 
                
            />
        </div>
      </>

    )
}

export default Chart1
