import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRouter from './ProtectedRoute';
import * as auth from  '../utils/auth';
import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = ({username, email, password, confirmPassword}) => {
    if(password === confirmPassword){
      auth.register(username,password,email)
      .then(() => {
        navigate('/login')
        console.log('Registro  exitoso!');
      })
      .catch(console.error)
    }
  }

  return (
    <Routes>
      {/* <Route path="/ducks" element={<Ducks />} /> */}
      <Route path="/ducks" element={
        <ProtectedRouter isLoggedIn={isLoggedIn}>
          <Ducks  />
        </ProtectedRouter>
      } />
      {/* <Route path="/my-profile" element={<MyProfile />} /> */}
      <Route path="/my-profile" element={
        <ProtectedRouter isLoggedIn={isLoggedIn}>
          <MyProfile />
        </ProtectedRouter>
      } />
      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="registerContainer">
            <Register handleRegistration={handleRegistration} />
          </div>
        }
      />
      <Route path="*" element={ isLoggedIn ? (<Navigate to="/ducks" replace />) : (<Navigate to="/login" replace />)  } />
    </Routes>
  );
}

export default App;
