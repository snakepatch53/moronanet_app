import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LoadScreen from "../components/LoadScreen";

export default SendedTicket = ({ session, navigate }) => {
    if (!session) return <LoadScreen />;
    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name="check-circle" />
            <Text style={styles.title}>Ticket Enviado</Text>
            <Text style={styles.text}>Su ticket ha sido enviado con éxito.</Text>
            <Text style={styles.text}>En breve nos comunicaremos con usted.</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigate("/tickets")}>
                <Icon style={styles.btn_icon} name="arrow-back" />
                <Text style={styles.btn_text}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: 100,
        // green color
        color: "#4caf50",
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#4caf50",
        marginBottom: 20,
    },
    text: {
        textAlign: "center",
        fontSize: 17,
        marginBottom: 10,
        color: "#2b7bed",
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: "#2b7bed",
    },
    btn_icon: {
        fontSize: 17,
        color: "#fff",
        marginRight: 5,
    },
    btn_text: {
        fontSize: 17,
        color: "#fff",
    },
});
