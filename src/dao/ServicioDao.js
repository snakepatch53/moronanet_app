export function schematizeService(service) {
    // plan numero de megas
    const plan_megas = (service.perfil.match(/\d+/g) ?? [0])[0];

    // nombre del nodo al que pertenece el plan
    let nodo_name = "Fibra Óptica Macas";
    if (service.nodo == 4) nodo_name = "Radio Enlace Macas";
    if (service.nodo == 5) nodo_name = "Fibra Óptica Alshi";

    // nombre del icono al que pertenece el plan
    let precio_integer = parseInt((service.costo.match(/\d+/g) ?? [0])[0]);
    let icon_name = "speed";
    if (precio_integer >= 20) icon_name = "speed";
    if (precio_integer >= 25) icon_name = "flight";
    if (precio_integer >= 30) icon_name = "whatshot";
    if (precio_integer >= 45) icon_name = "bolt";
    if (precio_integer >= 65) icon_name = "flash-on";

    // nombre del plan de internet
    let plan_name = "Básico";
    if (precio_integer >= 20) plan_name = "Básico";
    if (precio_integer >= 25) plan_name = "Avanzado";
    if (precio_integer >= 30) plan_name = "Plus";
    if (precio_integer >= 45) plan_name = "Ultra Velocidad";
    if (precio_integer >= 65) plan_name = "Ultra Velocidad 4K";

    // retorno
    return {
        ...service,
        plan_megas,
        nodo_nombre: nodo_name,
        icon_nombre: icon_name,
        plan_nombre: plan_name,
        precio_entero: precio_integer,
    };
}
