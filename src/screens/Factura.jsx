import { StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { schematizeService } from "../dao/ServicioDao";
import LoadScreen from "../components/LoadScreen";
import moment from "moment-timezone";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { schematizeFactura, selectByClientId } from "../dao/FacturaDao";

export default function Factura({ session }) {
    const { id } = useParams();
    if (!session) return <LoadScreen />;
    const [factura, setFactura] = useState(null);
    useEffect(() => {
        selectByClientId(session.id).then((res) => {
            const _factura = res.find((f) => f.id == id);
            if (_factura) return setFactura(_factura);
            setFactura(false);
        });
    }, []);
    if (factura == null) return <LoadScreen />;
    if (!factura) return <Text>La factura indicada no existe</Text>;

    const _factura = schematizeFactura(factura);
    const state_style = factura.estado.toLowerCase() == "pagado" ? styles.state_activo : styles.state_inactivo;
    return (
        <View style={styles.container}>
            <View style={styles.icon_container}>
                <Icon style={[styles.icon, state_style]} name={_factura.icono} />
            </View>
            <Text style={styles.title}>Factura de {_factura.fecha_mes}</Text>
            <View style={styles.items}>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Icon name="event" style={styles.item_icon} />
                        <Text style={styles.item_title}>Emitido:</Text>
                        <Text style={styles.item_desc}>{_factura.fecha_pago}</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name="event-busy" style={styles.item_icon} />
                        <Text style={styles.item_title}>Vencimiento:</Text>
                        <Text style={styles.item_desc}>{_factura.fecha_vencimiento}</Text>
                    </View>
                </View>
                {factura.estado.toLowerCase() != "pagado" ? (
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="check-circle-outline" style={styles.item_icon} />
                            <Text style={styles.item_title}>Estado:</Text>
                            <Text style={styles.item_desc}>{_factura.estado}</Text>
                        </View>
                    </View>
                ) : (
                    <>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <Icon name="celebration" style={styles.item_icon} />
                                <Text style={styles.item_title}>Pagado en:</Text>
                                <Text style={styles.item_desc}>{_factura.fecha_pagada}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <Icon name="check-circle-outline" style={styles.item_icon} />
                                <Text style={styles.item_title}>Estado:</Text>
                                <Text style={styles.item_desc}>{_factura.estado}</Text>
                            </View>
                            <View style={styles.item}>
                                <Icon name="payment" style={styles.item_icon} />
                                <Text style={styles.item_title}>Forma de pago:</Text>
                                <Text style={styles.item_desc}>{_factura.formapago}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <Icon name="monetization-on" style={styles.item_icon} />
                                <Text style={styles.item_title}>Total:</Text>
                                <Text style={styles.item_desc}>${_factura.total}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <Icon name="attach-money" style={styles.item_icon} />
                                <Text style={styles.item_title}>Subtotal:</Text>
                                <Text style={styles.item_desc}>${_factura.subtotal}</Text>
                            </View>
                            <View style={styles.item}>
                                <Icon name="receipt" style={styles.item_icon} />
                                <Text style={styles.item_title}>Impuesto:</Text>
                                <Text style={styles.item_desc}>${_factura.impuesto}</Text>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2d7cee",
    },
    icon_container: {
        width: 100,
        height: 100,
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
    },
    icon: {
        fontSize: 50,
        color: "red",
        padding: 10,
        borderRadius: 50,
    },
    items: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        padding: 15,
        marginTop: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
        width: "100%",
    },
    item: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "#fbfbfb",
        shadowColor: "#908f8f",
        elevation: 5,
    },
    item_icon: {
        fontSize: 20,
        color: "#2d7cee",
    },
    item_desc: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
        textAlign: "center",
    },
    item_title: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#2d7cee",
    },
    state_activo: {
        color: "#3fc050",
    },
    state_inactivo: {
        color: "#e33f31",
    },
});
