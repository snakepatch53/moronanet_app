import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { schematizeService } from "../dao/ServicioDao";
import { Link } from "react-router-native";

export default ServiceItem = ({ session, servicio }) => {
    const service = schematizeService(servicio);
    session.estado = session.estado.toLowerCase();
    const state_style = session.estado.includes("activo") ? styles.state_activo : styles.state_inactivo;
    return (
        <Link to={"/servicio/" + service.id} style={styles.container} underlayColor="#ddd" component={TouchableOpacity}>
            <>
                <Icon style={styles.icon} name={service.icon_nombre} />
                <View style={styles.texts_container}>
                    <Text style={styles.text}>Plan {service.plan_nombre}</Text>
                    <View style={styles.texts1}>
                        <Text style={styles.text1}>Velocidad: </Text>
                        <Text style={styles.text2}>{service.plan_megas} Megas</Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={styles.state_text1}>Estado: </Text>
                        <Icon style={[styles.status_icon, state_style]} name="fiber-manual-record" />
                        <Text style={[styles.state_text2, state_style]}>{session.estado.charAt(0).toUpperCase() + session.estado.slice(1)}</Text>
                    </View>
                </View>
            </>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: {
        fontSize: 30,
        color: "red",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 50,
    },

    texts_container: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 1,
        marginLeft: 10,
    },
    text: {
        fontSize: 15,
        color: "#000",
    },
    status: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
    },
    status_icon: {
        fontSize: 12,
        color: "#000",
    },
    texts1: {
        flexDirection: "row",
    },
    text1: {
        fontSize: 12,
        color: "#000",
        fontWeight: "bold",
    },
    text2: {
        fontSize: 12,
        color: "#000",
    },
    state_text1: {
        fontSize: 12,
        fontWeight: "bold",
    },
    state_text2: {
        fontSize: 12,
    },

    state_activo: {
        color: "#3fc050",
    },
    state_inactivo: {
        color: "#e33f31",
    },
});
