import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link, useLocation } from "react-router-native";

export default NavBar = () => {
    const location = useLocation();
    const active = location.pathname;
    if (active === "/login") return null;
    return (
        <View style={styles.container}>
            <Link to="/home" style={styles.item} underlayColor="transparent">
                <View style={styles.item_container}>
                    <Icon style={[styles.item_icon, active.includes("home") ? styles.item_active : styles.item_normal]} name="home" />
                    <Text style={[styles.item_text, active.includes("home") ? styles.item_active : styles.item_normal]}>Home</Text>
                </View>
            </Link>
            <Link to="/servicios" style={styles.item} underlayColor="transparent">
                <View style={styles.item_container}>
                    <Icon style={[styles.item_icon, active.includes("servicio") ? styles.item_active : styles.item_normal]} name="build" />
                    <Text style={[styles.item_text, active.includes("servicio") ? styles.item_active : styles.item_normal]}>Servicios</Text>
                </View>
            </Link>
            <Link to="/facturas" style={styles.item} underlayColor="transparent">
                <View style={styles.item_container}>
                    <Icon style={[styles.item_icon, active.includes("factura") ? styles.item_active : styles.item_normal]} name="receipt" />
                    <Text style={[styles.item_text, active.includes("factura") ? styles.item_active : styles.item_normal]}>Facturas</Text>
                </View>
            </Link>
            <Link to="/tickets" style={styles.item} underlayColor="transparent">
                <View style={styles.item_container}>
                    <Icon style={[styles.item_icon, active.includes("ticket") ? styles.item_active : styles.item_normal]} name="confirmation-num" />
                    <Text style={[styles.item_text, active.includes("ticket") ? styles.item_active : styles.item_normal]}>Tickets</Text>
                </View>
            </Link>
            <Link to="/perfil" style={styles.item} underlayColor="transparent">
                <View style={styles.item_container}>
                    <Icon style={[styles.item_icon, active.includes("perfil") ? styles.item_active : styles.item_normal]} name="person" />
                    <Text style={[styles.item_text, active.includes("perfil") ? styles.item_active : styles.item_normal]}>Perfil</Text>
                </View>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        marginTop: "auto",
        alignItems: "center",
        justifyContent: "space-around",
        borderTopColor: "#ccc",
        borderTopWidth: 0.2,
        backgroundColor: "#f6f6f6",
        // backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        underlayColor: "#FFFFFF",
    },
    item_container: {
        alignItems: "center",
        justifyContent: "center",
    },
    item_icon: {
        fontSize: 25,
    },
    item_text: {
        fontSize: 10,
    },
    item_active: {
        color: "#0068bf",
    },
    item_normal: {
        color: "#6595ee",
    },
});
