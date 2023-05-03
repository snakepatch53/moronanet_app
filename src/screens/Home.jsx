import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { APP_LOGO_URI, APP_PET2_URI } from "@env";
import Icon from "react-native-vector-icons/MaterialIcons";

// components
import LoadScreen from "../components/LoadScreen";
import { Link } from "react-router-native";

export default Home = ({ session }) => {
    if (!session) return <LoadScreen />;
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Image style={styles.title_image} source={{ uri: APP_PET2_URI }} />
                <View style={styles.menssage}>
                    <Text style={styles.message_text}>Hola</Text>
                    <Text style={[styles.message_text, styles.message_username]}>{session.nombre}</Text>
                    <Text style={styles.message_text}> bienvenido al portal de Moronanet</Text>
                    <Link style={styles.button} to={"/contract/" + session.id} underlayColor="#266acc" component={TouchableOpacity}>
                        <>
                            <Text style={styles.button_text}>Ver contrato</Text>
                            <Icon name="description" style={styles.button_icon} />
                        </>
                    </Link>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 10,
    },
    title_image: {
        width: 200,
        height: 250,
        borderRadius: 200,
        objectFit: "contain",
    },
    menssage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexWrap: "wrap",
        columnGap: 5,
    },
    message_text: {
        fontSize: 16,
        textAlign: "center",
        color: "#646464",
    },
    message_username: {
        fontWeight: "bold",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 40,
        borderRadius: 5,
        backgroundColor: "#2d7cee",
    },
    button_text: {
        fontSize: 16,
        color: "#fff",
    },
    button_icon: {
        fontSize: 20,
        color: "#fff",
    },
});
