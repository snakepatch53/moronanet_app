import WebView from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";

import { MORONANET_API_URL, MORONANET_API_KEY } from "@env";

export default Contract = ({ session }) => {
    if (!session) return <LoadScreen />;

    const { id } = useParams();
    // const services = session.servicios;
    // const service = services.find((service) => service.id == id);
    // if (!service) return <Text>El servicio indicado no existe</Text>;

    const url_pdf = `https://drive.google.com/viewerng/viewer?embedded=true&url=${MORONANET_API_URL}/contract/${session.id}/${MORONANET_API_KEY}`;
    return (
        <View style={styles.container}>
            <WebView style={styles.webview} source={{ uri: url_pdf }} />
            {/* <Text>Hola</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    webview: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
