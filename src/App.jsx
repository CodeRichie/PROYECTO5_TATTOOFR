import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Characters } from "./pages/Characters/Characters";
import { Register } from "./pages/Register/Register";
import { Profile } from "./pages/Profile/Profile";
import { Admin } from "./pages/Admin/Admin";
import { AdminRoute } from "./components/AdminRoute/AdminRoute";
import { ArtistRoute } from "./components/ArtistRoute/ArtistRoute";
import {DetailCharacter} from "./pages/DetailCharacter/DetailCharacter";
import { Appointments } from "./pages/Appointments/Appointments";
import {  useSelector } from "react-redux";
import { amIArtist } from "./app/slices/userSlice";
import { CreateAppointments } from "./pages/Appointments/CreateAppointments/CreateAppointments";

function App() {
  const [isServerUp, setIsServerUp] = useState(false);
  const isArtist = useSelector(amIArtist)

console.log('isServerUp', isServerUp)
  useEffect(() => {
    const pingServer = async () => {
      const isAlive = await axios.get("http://localhost:3000/api/");
      setIsServerUp(isAlive);
    };
    pingServer()
  }, []);

  return (
    <Routes>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {isArtist && (<>
          <Route path="/citas" element={<Appointments />} />
          <Route path="/create-citas" element={<CreateAppointments />} />
        </>
        )}
       <Route path="/characters" element={<Characters />} />
      {/*  <Route path="/characters/:id" element={<DetailCharacter />} /> */}
        {/* <Route path="/admin" element={<AdminRoute Component={Admin} />} /> */}
        
    </Routes>
  );
}

export default App;