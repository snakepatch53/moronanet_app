import { View, Text, StyleSheet, Image } from "react-native";
import { APP_LOGO_URI } from "@env";

// components
import LoadScreen from "../components/LoadScreen";

export default Home = ({ session }) => {
    if (!session) return <LoadScreen />;
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Image style={styles.title_image} source={{ uri: APP_LOGO_URI }} />
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
        backgroundColor: "#fff",
    },
    title: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    title_image: {
        width: 130,
        height: 130,
        borderRadius: 200,
        objectFit: "contain",
    },
    menssage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        columnGap: 5,
    },
    message_text: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "bold",
        color: "#0378c0",
    },
    message_username: {
        color: "#000",
    },
});
