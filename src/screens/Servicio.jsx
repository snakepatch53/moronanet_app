import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useParams } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { schematizeService } from "../dao/ServicioDao";
import LoadScreen from "../components/LoadScreen";
import moment from "moment-timezone";
import "moment/locale/es";

export default function Servicio({ session }) {
    if (!session) return <LoadScreen />;

    const { id } = useParams();
    const services = session.servicios;
    const service = services.find((service) => service.id == id);
    if (!service) return <Text>El servicio indicado no existe</Text>;
    const servicio = schematizeService(service);

    // const fecha_pago = new Date();
    const date = moment().tz("America/Guayaquil");
    const mes = date.month() + 1; // sumamos 1 porque moment cuenta los meses desde 0
    const anio = moment().year();
    const fecha_pago_desde = moment("01-" + (mes + 1) + "-" + anio, "DD-MM-YYYY");
    const fecha_pago_hasta = moment("05-" + (mes + 1) + "-" + anio, "DD-MM-YYYY");
    const fecha_pago = fecha_pago_desde.format("dddd D") + " - " + fecha_pago_hasta.format("dddd D") + " de " + fecha_pago_hasta.format("MMMM");

    const tiempo_transcurrido = moment().diff(servicio.instalado, "months");

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.icon_container}>
                    <Icon style={styles.icon} name={servicio.icon_nombre} />
                </View>
                <Text style={styles.title}>Plan {servicio.plan_nombre}</Text>
                <View style={styles.items}>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="speed" style={styles.item_icon} />
                            <Text style={styles.item_title}>Velocidad:</Text>
                            <Text style={styles.item_desc}>{servicio.plan_megas} Megas</Text>
                        </View>
                        <View style={styles.item}>
                            <Icon name="check-circle-outline" style={styles.item_icon} />
                            <Text style={styles.item_title}>Estado:</Text>
                            {/* <Text style={styles.item_desc}>{session.estado}</Text> */}
                            <Text style={styles.item_desc}>{servicio.status_user.toLowerCase()}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="attach-money" style={styles.item_icon} />
                            <Text style={styles.item_title}>Mensual:</Text>
                            <Text style={styles.item_desc}>{servicio.costo}</Text>
                        </View>
                        <View style={styles.item}>
                            <Icon name="event-note" style={styles.item_icon} />
                            <Text style={styles.item_title}>Contratado:</Text>
                            <Text style={styles.item_desc}>{moment(servicio.instalado).format("dddd D, MMMM YYYY")}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="payment" style={styles.item_icon} />
                            <Text style={styles.item_title}>Próximo pago:</Text>
                            <Text style={styles.item_desc}>{fecha_pago}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="place" style={styles.item_icon} />
                            <Text style={styles.item_title}>Direción:</Text>
                            <Text style={styles.item_desc}>{servicio.direccion}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Link style={styles.button} to={"/contract/" + servicio.id} underlayColor="#266acc" component={TouchableOpacity}>
                            <>
                                <Text style={styles.button_text}>Ver Contrato</Text>
                                <Icon name="description" style={styles.button_icon} />
                            </>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        paddingTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2d7cee",
    },
    icon_container: {
        width: 100,
        height: 100,
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
    },
    icon: {
        fontSize: 50,
        color: "red",
        padding: 10,
        borderRadius: 50,
    },
    items: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        padding: 15,
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
        width: "100%",
    },
    item: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "#fbfbfb",
        shadowColor: "#908f8f",
        elevation: 5,
    },
    item_icon: {
        fontSize: 20,
        color: "#2d7cee",
    },
    item_desc: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    item_title: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#2d7cee",
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "#2d7cee",
        shadowColor: "#908f8f",
        elevation: 5,
    },
    button_text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    button_icon: {
        fontSize: 20,
        color: "#fff",
        marginLeft: 5,
    },
});
