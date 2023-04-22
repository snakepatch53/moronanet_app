import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigate } from "react-router-native";
import { logout } from "../dao/ClientDao";
import Icon from "react-native-vector-icons/MaterialIcons";
import { APP_PET_URI } from "@env";
import { useFonts } from "expo-font";

// components
import LoadScreen from "../components/LoadScreen";
import { schematizeService } from "../dao/ServicioDao";

export default Servicios = ({ session }) => {
    const navigate = useNavigate();
    const [fontsLoaded] = useFonts({
        RobotoCondensed: require("../../assets/fonts/RobotoCondensed.ttf"),
        "Parisienne-Regular": require("../../assets/fonts/Parisienne-Regular.ttf"),
    });
    const handleLogout = () => logout(navigate, setSession);

    if (!session || !fontsLoaded) return <LoadScreen />;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Servicios</Text>
            <Image style={styles.image_pet} source={{ uri: APP_PET_URI }} />
            <View style={styles.cards_container}>
                {session.servicios.map((servicio) => {
                    const service = schematizeService(servicio);
                    session.estado = session.estado.toLowerCase();
                    const state_style = session.estado.includes("activo") ? styles.service_card_state_activo : styles.service_card_state_inactivo;
                    return (
                        <TouchableOpacity style={styles.service_card} key={servicio.id}>
                            <Icon style={styles.service_card_icon} name={service.icon_nombre} />
                            <View style={styles.service_card_texts_container}>
                                <Text style={styles.service_card_text}>Plan {service.plan_nombre}</Text>
                                <View style={styles.service_card_texts1}>
                                    <Text style={styles.service_card_text1}>Velocidad: </Text>
                                    <Text style={styles.service_card_text2}>{service.plan_megas} Megas</Text>
                                </View>
                                <View style={styles.service_card_status}>
                                    <Text style={styles.service_card_state_text1}>Estado: </Text>
                                    <Icon style={[styles.service_card_status_icon, state_style]} name="fiber-manual-record" />
                                    <Text style={[styles.service_card_state_text2, state_style]}>
                                        {session.estado.charAt(0).toUpperCase() + session.estado.slice(1)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* <NavBar /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    title: {
        fontFamily: "Parisienne-Regular",
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
        margin: 10,
        textAlign: "center",
        marginTop: 20,
    },

    image_pet: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: "center",
        marginTop: 20,
        objectFit: "contain",
    },

    cards_container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },

    service_card: {
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
    service_card_icon: {
        fontSize: 30,
        color: "red",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 50,
    },

    service_card_texts_container: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 1,
        marginLeft: 10,
    },
    service_card_text: {
        fontSize: 15,
        color: "#000",
    },
    service_card_status: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
    },
    service_card_status_icon: {
        fontSize: 12,
        color: "#000",
    },
    service_card_texts1: {
        flexDirection: "row",
    },
    service_card_text1: {
        fontSize: 12,
        color: "#000",
        fontWeight: "bold",
    },
    service_card_text2: {
        fontSize: 12,
        color: "#000",
    },
    service_card_state_text1: {
        fontSize: 12,
        fontWeight: "bold",
    },
    service_card_state_text2: {
        fontSize: 12,
    },

    service_card_state_activo: {
        color: "#3fc050",
    },
    service_card_state_inactivo: {
        color: "#e33f31",
    },
});
