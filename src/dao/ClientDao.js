import { fetch_query } from "./fetch_query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSessionTemporal } from "../cache/getSession"; // TODO: remove this import

// api querys
export async function selectByCedula(cedula) {
    const usuario = await fetch_query("GetClientsDetails", { cedula });
    if (usuario.estado == "error") return null;
    return usuario.datos[0];
}

// session
export async function login(cedula, password, navigate, setMessage) {
    if (cedula == "") return setMessage("Ingrese su cédula");
    if (password == "") return setMessage("Ingrese su contraseña");
    const usuario = await selectByCedula(cedula);
    if (!usuario) return setMessage("Usuario no encontrado");
    if (usuario.codigo != password) return setMessage("Contraseña incorrecta");
    // setMessage("Bienvenido " + usuario.nombre);
    await AsyncStorage.setItem("@session", JSON.stringify(usuario));
    navigate("/home");
    return usuario;
}

export async function logout(navigate, setSession) {
    await AsyncStorage.removeItem("@session");
    navigate("/login");
    return setSession(null);
}

export async function getSession(setSession) {
    const session = await AsyncStorage.getItem("@session");
    if (session) {
        const _session = JSON.parse(session);
        // primero ponermos el nombre en minusculas
        _session.nombre = _session.nombre.toLowerCase();
        // quitar las palabras "(factura)" "(recibo)"
        _session.nombre = _session.nombre.replace("(factura)", "");
        _session.nombre = _session.nombre.replace("(recibo)", "");
        // capitalizar nombre
        _session.nombre = _session.nombre.charAt(0).toUpperCase() + _session.nombre.slice(1);

        return setSession(_session);
    }
    return null;
}

// TODO: remove this function
export async function temporalLogin() {
    const session = getSessionTemporal();
    await AsyncStorage.setItem("@session", JSON.stringify(session));
}

export async function middlewareLogin(navigate) {
    const session = await AsyncStorage.getItem("@session");
    if (!session) navigate("/login");
}

export async function middlewareLogout(navigate) {
    const session = await AsyncStorage.getItem("@session");
    if (session) navigate("/home");
}
