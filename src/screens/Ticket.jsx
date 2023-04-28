import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LoadScreen from "../components/LoadScreen";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { schematizeTicket, selectByClientId } from "../dao/TicketDao";

export default function Ticket({ session }) {
    const { id } = useParams();
    if (!session) return <LoadScreen />;
    const [ticket, setTicket] = useState(null);
    useEffect(() => {
        selectByClientId(session.id).then((res) => {
            if (res.estado == "error") return setTicket(false);
            const tickets = res.tickets;
            const _ticket = tickets.find((f) => f.id == id);
            if (_ticket) return setTicket(_ticket);
            setTicket(false);
        });
    }, []);
    if (ticket == null) return <LoadScreen />;
    if (!ticket) return <Text>El ticket indicado no existe</Text>;

    const _ticket = schematizeTicket(ticket);
    return (
        <ScrollView style={styles.scroller}>
            <View style={styles.container}>
                <View style={styles.icon_container}>
                    <Icon style={[styles.icon, { color: _ticket.color }]} name={_ticket.icono} />
                </View>
                <Text style={[styles.title, { color: _ticket.color }]}>{_ticket.estado_capitalized}</Text>
                <View style={styles.items}>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="subject" style={styles.item_icon} />
                            <Text style={styles.item_title}>Asunto:</Text>
                            <Text style={styles.item_desc}>{_ticket.asunto}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="person" style={styles.item_icon} />
                            <Text style={styles.item_title}>Solicitante:</Text>
                            <Text style={styles.item_desc}>{_ticket.solicitante}</Text>
                        </View>
                        <View style={styles.item}>
                            <Icon name="business" style={styles.item_icon} />
                            <Text style={styles.item_title}>Departamento:</Text>
                            <Text style={styles.item_desc}>{_ticket.dp}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.item}>
                            <Icon name="event-note" style={styles.item_icon} />
                            <Text style={styles.item_title}>Agendado:</Text>
                            <Text style={styles.item_desc}>
                                {_ticket.fecha_visita} por la {_ticket.turno_capitalized.toLowerCase()}
                            </Text>
                        </View>
                    </View>
                    {ticket.estado.toLowerCase() == "abierto" ? (
                        <View style={styles.row}>
                            <View style={styles.item}>
                                <Icon name="description" style={styles.item_icon} />
                                <Text style={styles.item_title}>Descripción:</Text>
                                <Text style={styles.item_desc}>{_ticket.emisor.contenido}</Text>
                            </View>
                        </View>
                    ) : null}
                    {ticket.estado.toLowerCase() == "cerrado" ? (
                        <>
                            <View style={styles.row}>
                                <View style={styles.item}>
                                    <Icon name="description" style={styles.item_icon} />
                                    <Text style={styles.item_title}>Descripción:</Text>
                                    <Text style={styles.item_desc}>{_ticket.emisor.contenido}</Text>
                                </View>
                            </View>
                            {_ticket.receptor ? (
                                <View style={styles.row}>
                                    <View style={styles.item}>
                                        <Icon name="reply" style={styles.item_icon} />
                                        <Text style={styles.item_title}>Respuesta:</Text>
                                        <Text style={styles.item_desc}>{_ticket.receptor.contenido}</Text>
                                    </View>
                                </View>
                            ) : null}
                            <View style={styles.row}>
                                <View style={styles.item}>
                                    <Icon name="notes" style={styles.item_icon} />
                                    <Text style={styles.item_title}>Motivo de cierre:</Text>
                                    <Text style={styles.item_desc}>{_ticket.motivo_cierre}</Text>
                                </View>
                            </View>
                        </>
                    ) : null}
                    {ticket.estado.toLowerCase() == "respondido" ? (
                        <>
                            <View style={styles.row}>
                                <View style={styles.item}>
                                    <Icon name="description" style={styles.item_icon} />
                                    <Text style={styles.item_title}>Descripción:</Text>
                                    <Text style={styles.item_desc}>{_ticket.emisor.contenido}</Text>
                                </View>
                            </View>
                            {_ticket.receptor ? (
                                <View style={styles.row}>
                                    <View style={styles.item}>
                                        <Icon name="reply" style={styles.item_icon} />
                                        <Text style={styles.item_title}>Respuesta:</Text>
                                        <Text style={styles.item_desc}>{_ticket.receptor.contenido}</Text>
                                    </View>
                                </View>
                            ) : null}
                        </>
                    ) : null}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroller: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 10,
        paddingVertical: 15,
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
});
