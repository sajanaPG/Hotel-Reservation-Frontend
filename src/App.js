
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './layouts/Layout';
import FoodCart from './pages/FoodCart';
import RoomCheckout from './pages/RoomCheckout';
import ProtectedRoute from './utils/ProtectedRoute';


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route element={<ProtectedRoute/>}>
            
          </Route>
          <Route path='/checkout' element={<RoomCheckout/>}></Route>
          <Route path='/foodcart' element={<FoodCart/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
