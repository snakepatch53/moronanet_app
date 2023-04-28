import { Text, View } from "react-native";
import { Route, Routes, useNavigate } from "react-router-native";
import { useEffect, useState } from "react";
import { getSession, logout, middlewareLogin, middlewareLogout, temporalLogin } from "../dao/ClientDao";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Login from "./Login";
import Home from "./Home.jsx";
import Servicios from "./Servicios";
import Servicio from "./Servicio";
import Perfil from "./Perfil";
import Facturas from "./Facturas";
import Factura from "./Factura";
import Tickets from "./Tickets";
import Ticket from "./Ticket";
import FormTicket from "./FormTicket";
import SendedTicket from "./SendedTicket";

export default Main = () => {
    const [session, setSession] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // temporalLogin(); // TODO: remove this line
        getSession(setSession);
        middlewareLogin(navigate);
        middlewareLogout(navigate);
    }, []);
    const handleLogout = () => logout(navigate, setSession);
    return (
        <>
            <Header session={session} handleLogout={handleLogout} navigate={navigate} />
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path="/login" exact element={<Login setSession={setSession} />} />
                    <Route path="/home" element={<Home session={session} />} />
                    <Route path="/servicios" element={<Servicios session={session} />} />
                    <Route path="/servicio/:id" element={<Servicio session={session} />} />
                    <Route path="/facturas" element={<Facturas session={session} />} />
                    <Route path="/factura/:id" element={<Factura session={session} />} />
                    <Route path="/tickets" element={<Tickets session={session} />} />
                    <Route path="/ticket/:id" element={<Ticket session={session} />} />
                    <Route path="/formticket" exact element={<FormTicket session={session} navigate={navigate} />} />
                    <Route path="/sendedticket" exact element={<SendedTicket session={session} navigate={navigate} />} />
                    <Route path="/perfil" element={<Perfil session={session} />} />
                </Routes>
            </View>
            <NavBar />
        </>
    );
};
