import React, { useEffect,useState } from 'react';
import {Line} from 'react-chartjs-2';
import { Chart , registerables  } from 'chart.js';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import InputGraphData from '../layout/InputGraphData';

const Home = () => {
    const [redirect, setRedirect] = useState(false);
    const [RoleAdmin, setRoleAdmin] = useState(false);
    const [username, setusername] = useState();
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const [ChartData , setChart] = useState({
      labels: [0,1,2,3,4],
      datasets: [{
      label: 'Value Dataset',
      data: [0,0,0,0,0],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]});
    useEffect(() => {
      const fetchData = setInterval ( async () => {
        setChart(ChartData);
        await axios(
          'https://localhost:7059/api/Graph/GraphData',
        ).then(function (response) {
          setChart({
              labels: response.data.map((data, index)=>index),
              datasets: [{
                label: 'Value Dataset',
                data: response.data.map((data)=>data.value),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
          }); 
        }).catch(function (error) {

          clearInterval(fetchData)
        
        })  
      },3000);
      //fetchData();
      return () => clearInterval(fetchData);
    
    }, []);




    useEffect(() => {
      const UserData = async () => {
        await axios.get(
          'https://localhost:7059/api/Auth/User',
          config,
          {withCredentials: true}
        )
        .then(function (response) {
          console.log(response);
          if(response.data.role === 'Admin'){
            setRoleAdmin(true);
            setusername(response.data.username);
          }else if(response.data.role === 'User'){
            setRoleAdmin(false);
            setusername(response.data.username);
          }else{
            setRedirect(true);
          }
        })
        .catch(function (error) {

          setRedirect(true);
            
          
        });

      };
      UserData();
  }, []);
    const Logout = () => {
      localStorage.removeItem("token");
      setRedirect(true);
      console.log(redirect);
    }
    if(redirect){
      return <Navigate to="/Login" />
    }
    Chart.register(...registerables);
    return (
      <div>
        <h3>Hello : {username}</h3><button type='submit' onClick={Logout} className='btn btn-danger'>Logout</button>
        <hr style={{marginTop : '10px'}}/>
        <div style={{marginTop : '30px'}}> 
          {RoleAdmin ? (
            <InputGraphData />
          ) : (
            ''
          )}
          <Line
            
            data={ChartData}
          />
        </div>
      </div>
    )
}

export default Home