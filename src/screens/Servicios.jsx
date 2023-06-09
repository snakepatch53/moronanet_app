import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { APP_PET_URI } from "@env";
import { useFonts } from "expo-font";

// components
import LoadScreen from "../components/LoadScreen";
import ServiceItem from "../components/ServiceItem";

export default Servicios = ({ session }) => {
    const [fontsLoaded] = useFonts({
        RobotoCondensed: require("../../assets/fonts/RobotoCondensed.ttf"),
        "Parisienne-Regular": require("../../assets/fonts/Parisienne-Regular.ttf"),
    });

    if (!session || !fontsLoaded) return <LoadScreen />;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Servicios</Text>
            <Image style={styles.image_pet} source={{ uri: APP_PET_URI }} />
            <View style={styles.cards_container}>
                {session.servicios == false ? (
                    <Text style={{ textAlign: "center", marginVertical: 10 }}>Sin servicios registrados</Text>
                ) : (
                    <FlatList style={styles.list} data={session.servicios} renderItem={({ item }) => <ServiceItem session={session} servicio={item} />} />
                )}
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
        // alignItems: "center",
        // justifyContent: "center",
        // gap: 20,
        // padding: 10,
        // paddingHorizontal: 20,
        // marginTop: 20,
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    list: {
        flex: 1,
        width: "100%",
    },
});
