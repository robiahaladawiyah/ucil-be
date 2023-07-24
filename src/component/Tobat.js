import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Tobat = () => {
    const [obatData, setObatData] = useState([]);
useEffect(() => {
    fetchObatData();
        
      }, []);
    
const fetchObatData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/obat');
          const data = response.data;
    
          if (Array.isArray(data)) {
            setObatData(data);
          } else {
            console.error('Response data is not an array:', data);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (

    
        <div className="container"style={{ fontFamily: 'Arial', padding: '50px' }}>
    <h1 style={{ textAlign: 'center' }}>Obat Database</h1>
          <table style={{ width: '100%', border: '1px solid black', padding: '1px', borderRadius: '10px'}}>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'lightgray' }}>Obat ID</th>
                <th style={{ backgroundColor: 'lightgray' }}>Nama Obat</th>
                {/* <th style={{ backgroundColor: 'lightgray' }}>Medical Record No</th>
                <th style={{ backgroundColor: 'lightgray' }}>Dokter ID</th>
                <th style={{ backgroundColor: 'lightgray' }}>Date</th>
                <th style={{ backgroundColor: 'lightgray' }}>Time</th> */}
              </tr>
            </thead>
            <tbody>
              {obatData.map((obat) => (
                <tr key={obat.obat_id}>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{obat.obat_id}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{obat.nama_obat}</td>
                  {/* <td style={{ border: '1px solid black', padding: '5px' }}>{obat.medicalrecordNO}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{obat.dokter_id}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{obat.date}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{obat.time}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>    
      )
    
    
}
export default Tobat;