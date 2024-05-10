import { useEffect, useState } from "react";
import { bringAllAppointmentsForArtist, bringCharacterById, } from "../../services/apiCalls";
import Avatar from 'react-avatar';
import Header from "../../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../../app/slices/userSlice";
import { CreateAppointments } from "./CreateAppointments/CreateAppointments";
import { Button } from "react-bootstrap";


export const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const hasAcces =  useSelector(isAuthenticated)
const navigate = useNavigate()
	console.log('first', appointments)
	const bringAllAppointments =  async() => {
		const appointments = await bringAllAppointmentsForArtist(hasAcces)
		setAppointments(appointments);
	};

	useEffect(() => {
		bringAllAppointments();
	  }, []);
	
	return ( 
	<><Header />
        <Button variant="primary" size="lg" onClick={()=> navigate(`/create-citas`, {replace:true})}>Crear cita</Button>
		</>
		
);
};