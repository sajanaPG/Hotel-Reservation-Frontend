
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Rooms from './pages/Rooms';
import Success from './components/Success'
import { useState } from 'react';
import LandingPage from './pages/LandingPage';

function App() {
  const [bookingData, setBookingData] = useState({});
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<LandingPage/>}/>
            <Route 
              path='/rooms' 
              element={<Rooms setBookingData={setBookingData} />} />
            <Route 
              path='/checkout' 
              element={<Success bookingData={bookingData}/>} />
          </Route>
        </Routes>
      </BrowserRouter>



  );
}

export default App;
