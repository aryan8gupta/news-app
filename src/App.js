import './App.css';

import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 5;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar/>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
        
          <Route exact path='/general' element={<News keys='1' setProgress={setProgress} pageSize={pageSize} country='in' category='general'/>}></Route>
          <Route exact path='/business' element={<News keys='2' setProgress={setProgress} pageSize={pageSize} country='in' category='business'/>}></Route>
          <Route exact path='entertainment' element={<News keys='3' setProgress={setProgress} pageSize={pageSize} country='in' category='entertainment'/>}></Route>
          <Route exact path='/health' element={<News keys='4' setProgress={setProgress} pageSize={pageSize} country='in' category='health'/>}></Route>
          <Route exact path='/science' element={<News keys='8' setProgress={setProgress} pageSize={pageSize} country='in' category='science'/>}></Route>
          <Route exact path='/sports' element={<News keys='6' setProgress={setProgress} pageSize={pageSize} country='in' category='sports'/>}></Route>
          <Route exact path='/technology' element={<News keys='7' setProgress={setProgress} pageSize={pageSize} country='in' category='technology'/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;