import moment from "moment-timezone";
import { fetch_query } from "./fetch_query";

// api querys
export async function selectByClientId(idcliente) {
    const tickets = await fetch_query("ListTicket", { idcliente });
    if (tickets.estado == "error") return false;
    return tickets.data;
}

export async function createTicket(idcliente, asunto, solicitante, fechavisita, turno, contenido, imagen_base64) {
    const dp = 1; //departamento
    const agendado = "cliente"; // desde donde se agendo
    const adjunto = {
        nombre: "Evidencia-solicitud.png",
        file: imagen_base64,
    };
    const ticket = {
        idcliente,
        asunto,
        solicitante,
        fechavisita,
        turno,
        contenido,
        dp,
        agendado,
        adjunto,
    };

    const response = await fetch_query("NewTicket", ticket);
    return response;
}

export function schematizeTicket(ticket) {
    // icono segun el estado del mismo
    let icono = "message";
    if (ticket.estado.toLowerCase() == "abierto") icono = "new-releases";
    if (ticket.estado.toLowerCase() == "cerrado") icono = "done-all";

    // estado color dependiendo el estado
    let estado_color = "#2b7bed";
    if (ticket.estado.toLowerCase() == "abierto") estado_color = "#ff9800";
    if (ticket.estado.toLowerCase() == "cerrado") estado_color = "#4caf50";

    // estado en booleano
    let estado_bool = false;
    if (ticket.estado.toLowerCase() == "cerrado") estado_bool = true;

    //fecha
    const fecha_visita = moment(ticket.fechavisita).tz("America/Guayaquil");

    // fecha de visita
    let fecha_visita_str = fecha_visita.format("dddd D [de] MMMM [del] YYYY");
    fecha_visita_str = fecha_visita_str.charAt(0).toUpperCase() + fecha_visita_str.slice(1);

    // capitalizar turno y elminacion de "(" y ")"
    let turno_capitalized = ticket.turno.toLowerCase().slice(1).replace("(", "").replace(")", "");
    turno_capitalized = turno_capitalized.charAt(0).toUpperCase() + turno_capitalized.slice(1);

    //capitalizar estado
    let estado_capitalized = ticket.estado;
    estado_capitalized = estado_capitalized.charAt(0).toUpperCase() + estado_capitalized.slice(1);

    //objeto con el contenido contenido
    let emisor = ticket.mensajes[0] ?? null;
    let receptor = ticket.mensajes[1] ?? null;

    // en caso de que haya un mensaje de respuesta quitar etiquetas de html y dejar solo el texto plano
    // tambien quitaremos cosas que vienen de la codificacion de html como &lt; p&gt; &lt;/p&gt; p&gt; &lt;/p&gt;
    if (emisor) {
        emisor.contenido = emisor.contenido
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/(<([^>]+)>)/gi, "");
    }

    if (receptor) {
        receptor.contenido = receptor.contenido
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/(<([^>]+)>)/gi, "");
    }

    // retorno
    return {
        ...ticket,
        icono,
        estado_bool,
        color: estado_color,
        fecha_visita: fecha_visita_str,
        turno_capitalized,
        estado_capitalized,
        emisor,
        receptor,
    };
}
