import React, { Fragment } from 'react';
import { BrowserRouter as Router,Routes ,Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {

  return (

      <Router>
        <Fragment>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/Login' element={<Login/>} />
            </Routes>
          </div>
         
        </Fragment>
      </Router>
     
     
    
  )
}

export default App
