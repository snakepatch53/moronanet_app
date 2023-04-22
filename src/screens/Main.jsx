import { Text, View } from "react-native";
import { Route, Routes, useNavigate } from "react-router-native";
import { useEffect, useState } from "react";
import { getSession, logout, middlewareLogin, middlewareLogout, temporalLogin } from "../dao/ClientDao";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Login from "./Login";
import Home from "./Home.jsx";
import Servicios from "./Servicios";

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
            <Header session={session} handleLogout={handleLogout} />
            <View style={{ flex: 1 }}>
                <Routes>
                    <Route path="/login" exact element={<Login setSession={setSession} />} />
                    <Route path="/home" element={<Home session={session} />} />
                    <Route path="/servicios" element={<Servicios session={session} />} />
                    <Route path="/facturas" element={<Home />} />
                    <Route path="/tickets" element={<Home />} />
                    <Route path="/perfil" element={<Home />} />
                    {/* <Route path="/" element={<Home />} /> */}
                </Routes>
            </View>
            <NavBar />
        </>
    );
};
