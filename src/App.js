import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import User from './pages/User';
import Login from './pages/Login';
import AuthWrapper from './components/auth/AuthWrapper';
import Customer from './pages/Customer';

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='/login' element={<Login />} />
          <Route path='/customer' element={<Customer />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
