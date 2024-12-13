import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRouter from './ProtectedRoute';
import { setToken, getToken } from '../utils/token';
import * as auth from  '../utils/auth';
import "./styles/App.css";

function App() {

  useEffect(() => {
    
    const jwt = getToken();
    
    if(!jwt) return;
    
    console.log("🚀 ~ useEffect ~ jwt:", jwt)
    

  },[])

  const [userData, setUserData] = useState({username: '', password: ''});
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

  const handleLogin = ({username, password}) => {

    if(!username || !password){
      return;
    }

    auth.authorize(username, password)
    .then((data) => {
      
      if(data.jwt){
        setToken(data.jwt);
        setUserData(data.user);
        setIsLoggedIn(true);
        navigate('./ducks');
      }

    })
    .catch(console.error)
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
          <MyProfile userData={userData} />
        </ProtectedRouter>
      } />
      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login handleLogin={handleLogin} />
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
