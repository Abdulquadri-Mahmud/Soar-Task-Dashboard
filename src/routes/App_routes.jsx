import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';

export default function App_routes() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Layout/>}>
            {/* admin routes */}
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/settings' element={<Settings/>}/>
          </Route>
      </Routes>
    </Router>
  )
}
