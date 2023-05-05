import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { selectByClientId } from "../dao/FacturaDao";
import FacturaItem from "../components/FacturaItem";

export default Facturas = ({ session }) => {
    if (!session) return <LoadScreen />;
    const [facturas, setFacturas] = useState(null);
    useEffect(() => {
        selectByClientId(session.id).then((res) => setFacturas(res));
    }, []);
    if (facturas == null) return <LoadScreen />;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Facturas</Text>
            {facturas == false ? (
                <Text style={{ textAlign: "center", marginVertical: 10 }}>Sin facturas registradas</Text>
            ) : (
                <FlatList style={styles.list} data={facturas} renderItem={({ item }) => <FacturaItem factura={item} />} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    list: {
        flex: 1,
        width: "100%",
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#0068bf",
        // marginTop: 10,
        paddingBottom: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.2,
    },
});
