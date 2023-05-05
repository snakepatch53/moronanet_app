import moment from "moment-timezone";
import { fetch_query } from "./fetch_query";

// api querys
export async function selectByClientId(idcliente) {
    const invoices = await fetch_query("GetInvoices", { idcliente });
    if (invoices.estado == "error") return false;
    return invoices.facturas;
}

export function schematizeFactura(factura) {
    //fechas
    const fecha_vencimiento = moment(factura.vencimiento).tz("America/Guayaquil");
    const fecha_emitido = moment(factura.emitido).tz("America/Guayaquil");
    const fecha_pagada = moment(factura.fechapago).tz("America/Guayaquil");

    // fecha de pago
    let fecha_pago = fecha_vencimiento.format("dddd D [de] MMMM [del] YYYY");
    fecha_pago = fecha_pago.charAt(0).toUpperCase() + fecha_pago.slice(1);

    // fecha venimiento
    let fecha_vence = fecha_vencimiento.format("dddd D [de] MMMM [del] YYYY");
    fecha_vence = fecha_vence.charAt(0).toUpperCase() + fecha_vence.slice(1);

    //fecha mes al que corresponde la factura
    let fecha_mes = fecha_emitido.format("MMMM [del] YYYY");
    fecha_mes = fecha_mes.charAt(0).toUpperCase() + fecha_mes.slice(1);

    //icono de material icons la factura segun el estado
    let icono = "radio-button-unchecked";
    if (factura.estado.toLowerCase() == "pagado") icono = "done";

    // fecha pagada
    let _fecha_pagada = fecha_pagada.format("dddd D [de] MMMM [del] YYYY");
    _fecha_pagada = _fecha_pagada.charAt(0).toUpperCase() + _fecha_pagada.slice(1);
    if (factura.estado.toLowerCase() != "pagado") _fecha_pagada = "pendiente";

    // estado de la factura
    let estado = "Pendiente";
    if (factura.estado.toLowerCase() == "pagado") estado = "Pagado";

    // retorno
    return {
        ...factura,
        fecha_pago,
        fecha_mes,
        icono,
        estado,
        fecha_vencimiento: fecha_vence,
        fecha_pagada: _fecha_pagada,
    };
}
