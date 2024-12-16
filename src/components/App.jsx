import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import AppContext from '../context/AppContext';
import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRouter from './ProtectedRoute';
import * as auth from  '../utils/auth';
import * as api from '../utils/api';
import { setToken, getToken } from '../utils/token';
import "./styles/App.css";

function App() {

  const [userData, setUserData] = useState({username: '', email: ''});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

        const redirectPath = location.state?.from?.pathname || "/ducks";
        navigate(redirectPath);

      }

    })
    .catch(console.error)
  };

  useEffect(() => {
    
    const jwt = getToken();
    
    if(!jwt) return;
    
    api.getUserInfo(jwt)
    .then(({username,email}) => {
      setIsLoggedIn(true);
      setUserData({username,email});
      // navigate('/ducks');
    })
    .catch(console.error)

  }, [])

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        {/* <Route path="/ducks" element={<Ducks />} /> */}
        <Route path="/ducks" element={
          <ProtectedRouter >
            <Ducks />
          </ProtectedRouter>
        } />
        {/* <Route path="/my-profile" element={<MyProfile />} /> */}
        <Route path="/my-profile" element={
          <ProtectedRouter >
            <MyProfile userData={userData} />
          </ProtectedRouter>
        } />
        <Route
          path="/login"
          element={
            <ProtectedRouter anonymous>
              <div className="loginContainer">
                <Login handleLogin={handleLogin} />
              </div>
            </ProtectedRouter>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouter anonymous>
              <div className="registerContainer">
                <Register handleRegistration={handleRegistration} />
              </div>
            </ProtectedRouter>
          }
        />
        <Route path="*" element={ isLoggedIn ? (<Navigate to="/ducks" replace />) : (<Navigate to="/login" replace />)  } />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
