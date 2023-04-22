import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LoadScreen from "../components/LoadScreen";
import moment from "moment-timezone";
import "moment/locale/es";

export default function Perfil({ session }) {
    if (!session) return <LoadScreen />;

    const servicios = session.servicios;
    let valor_mensual = 0;
    let numero_servicios = 0;
    servicios.forEach((servicio) => {
        valor_mensual += parseFloat(servicio.costo);
        numero_servicios++;
    });
    numero_servicios = numero_servicios.toString() + " - internet";
    if (parseInt(valor_mensual) == valor_mensual) valor_mensual = valor_mensual + ".00";

    return (
        <View style={styles.container}>
            <View style={styles.icon_container}>
                <Icon style={styles.icon} name="person" />
            </View>
            <Text style={styles.title}>{session.nombre}</Text>
            <View style={styles.items}>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Icon name="portrait" style={styles.item_icon} />
                        <Text style={styles.item_title}>Cedula:</Text>
                        <Text style={styles.item_desc}>{session.cedula || "no registrado"}</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name="check-circle-outline" style={styles.item_icon} />
                        <Text style={styles.item_title}>Estado:</Text>
                        <Text style={styles.item_desc}>{session.estado.toLowerCase() || "no registrado"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Icon name="email" style={styles.item_icon} />
                        <Text style={styles.item_title}>Correo electrónico:</Text>
                        <Text style={styles.item_desc}>{session.correo || "no registrado"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Icon name="call" style={styles.item_icon} />
                        <Text style={styles.item_title}>Teléfono:</Text>
                        <Text style={styles.item_desc}>{session.telefono || "no registrado"}</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name="smartphone" style={styles.item_icon} />
                        <Text style={styles.item_title}>Celular:</Text>
                        <Text style={styles.item_desc}>{session.movil || "no registrado"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Icon name="place" style={styles.item_icon} />
                        <Text style={styles.item_title}>Dirección:</Text>
                        <Text style={styles.item_desc}>{session.direccion_principal || "no registrado"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Icon name="attach-money" style={styles.item_icon} />
                        <Text style={styles.item_title}>Mensual:</Text>
                        <Text style={styles.item_desc}>{valor_mensual || "no registrado"}</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name="build" style={styles.item_icon} />
                        <Text style={styles.item_title}>Servicios:</Text>
                        <Text style={styles.item_desc}>{numero_servicios || "no registrado"}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
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
});
