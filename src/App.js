
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './layouts/Layout';
import Rooms from './pages/Rooms';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/rooms' element={<Rooms/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
