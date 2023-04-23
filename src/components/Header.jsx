import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLocation } from "react-router-native";

export default function Header({ session, handleLogout, navigate }) {
    const location = useLocation();
    const active = location.pathname;

    // configuracion del statusbar
    StatusBar.setTranslucent(true);
    if (active == "/login") {
        StatusBar.setBackgroundColor("#ffffff");
        StatusBar.setBarStyle("dark-content");
    } else {
        StatusBar.setBackgroundColor("#0378c0");
        StatusBar.setBarStyle("light-content");
    }

    if (active === "/login") return null;

    let user_nombre = "";
    if (session) user_nombre = session.nombre;
    const handleBack = () => navigate(-1);
    return (
        <View style={styles.container}>
            <View style={styles.user_container}>
                {active.includes("/servicio/") ? (
                    <TouchableOpacity onPress={handleBack}>
                        <Icon style={styles.icon} name="arrow-back" />
                    </TouchableOpacity>
                ) : (
                    <Icon style={styles.icon} name="person" />
                )}
                <Text style={styles.title}>{user_nombre}</Text>
            </View>
            <TouchableOpacity onPress={handleLogout}>
                <Icon style={styles.icon} name="exit-to-app" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        backgroundColor: "#0378c0",
        paddingHorizontal: 15,
        paddingTop: Constants.statusBarHeight + 10,
        // paddingTop: 10,
        paddingBottom: 20,
    },
    user_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff",
    },
    icon: {
        fontSize: 20,
        color: "#fff",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        objectFit: "contain",
    },
});
