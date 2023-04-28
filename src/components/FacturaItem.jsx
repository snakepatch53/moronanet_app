import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { schematizeFactura } from "../dao/FacturaDao";
import { Link } from "react-router-native";

export default FacturaItem = ({ session, factura }) => {
    const _factura = schematizeFactura(factura);
    const state_style = factura.estado.toLowerCase() == "pagado" ? styles.state_activo : styles.state_inactivo;
    return (
        <Link to={"/factura/" + factura.id} style={styles.container} underlayColor="transparent" component={TouchableOpacity}>
            <View style={styles.shadow}>
                <Icon style={[styles.icon, state_style]} name={_factura.icono} />
                <View style={styles.texts_container}>
                    {/* <Text style={styles.text}>Plan {factura.plan_nombre}</Text> */}
                    <Text style={styles.text}>Factura de {_factura.fecha_mes}</Text>
                    <View style={styles.texts1}>
                        <Text style={styles.text1}>Valor: </Text>
                        <Text style={styles.text2}>{_factura.total2}</Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={styles.state_text1}>Estado: </Text>
                        <Icon style={[styles.status_icon, state_style]} name="fiber-manual-record" />
                        <Text style={[styles.state_text2, state_style]}>{_factura.estado}</Text>
                    </View>
                </View>
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: "100%",
    },
    shadow: {
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
        shadowRadius: 3,
        elevation: 3,
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
