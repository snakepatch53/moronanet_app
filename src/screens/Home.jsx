import { View, Text, StyleSheet, Image } from "react-native";
import { APP_LOGO_URI, APP_PET2_URI } from "@env";

// components
import LoadScreen from "../components/LoadScreen";

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
});
