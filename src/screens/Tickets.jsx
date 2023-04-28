import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadScreen from "../components/LoadScreen";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "react-router-native";
import TicketItem from "../components/TicketItem";
import { selectByClientId } from "../dao/TicketDao";

export default Tickets = ({ session }) => {
    if (!session) return <LoadScreen />;
    const [tickets, setTickets] = useState(null);
    useEffect(() => {
        selectByClientId(session.id).then((res) => setTickets(res));
    }, []);
    if (!tickets) return <LoadScreen />;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Tickets</Text>

            <View style={styles.tickets_state}>
                <View style={styles.tickets_state_item}>
                    <Icon style={styles.tickets_state_icon} name="new-releases" />
                    <Text style={styles.tickets_state_title}>Abiertos</Text>
                    <Text style={styles.tickets_state_number}>{tickets.abiertos}</Text>
                </View>

                <View style={styles.tickets_state_item}>
                    <Icon style={styles.tickets_state_icon} name="done-all" />
                    <Text style={styles.tickets_state_title}>Cerrados</Text>
                    <Text style={styles.tickets_state_number}>{tickets.cerrados}</Text>
                </View>

                <View style={styles.tickets_state_item}>
                    <Icon style={styles.tickets_state_icon} name="message" />
                    <Text style={styles.tickets_state_title}>Respondidos</Text>
                    <Text style={styles.tickets_state_number}>{tickets.respondidos}</Text>
                </View>
            </View>
            <FlatList style={styles.list} data={tickets.tickets} renderItem={({ item }) => <TicketItem ticket={item} />} />

            <Link to={"/formticket"} style={styles.add_btn} underlayColor="#ddd" component={TouchableOpacity}>
                <Icon style={styles.add_btn_icon} name="add" />
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    tickets_state: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 20,
    },
    tickets_state_item: {
        flex: 1,
        alignItems: "center",
    },
    tickets_state_icon: {
        fontSize: 40,
        color: "#0068bf",
    },
    tickets_state_title: {
        fontSize: 15,
        textAlign: "center",
        color: "#0068bf",
    },
    tickets_state_number: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0068bf",
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
    add_btn: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#2b7bed",
        alignItems: "center",
        justifyContent: "center",
    },
    add_btn_icon: {
        fontSize: 30,
        color: "#fff",
    },
});
