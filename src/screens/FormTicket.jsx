import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ImagePicker from "../components/ImagePicker";
import DatePicker from "../components/DatePicker";
import LoadScreen from "../components/LoadScreen";
import { createTicket } from "../dao/TicketDao";

export default FormTicket = ({ session, navigate }) => {
    if (!session) return <LoadScreen />;
    const [message, setMessage] = useState(null);
    const [subject, setSubject] = useState(null);
    const [aplicant, setAplicant] = useState(null);
    const [date, setDate] = useState(null);
    const [shift, setShift] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        setMessage(null);
        setSubject(null);
        setAplicant(null);
        setDate(null);
        setShift(null);
        setImage(null);
        setDescription(null);
    }, []);

    const submit = async () => {
        setMessage(null);
        if (!subject) return setMessage("Asunto es requerido");
        if (!aplicant) return setMessage("Solicitante es requerido");
        if (!date) return setMessage("Fecha es requerida");
        if (!shift) return setMessage("Turno es requerido");
        if (!description) return setMessage("Descripción es requerida");
        if (!image) return setMessage("Imagen es requerida");
        setMessage("Enviando ticket...");
        const response = await createTicket(session.id, subject, aplicant, date, shift, description, image.base64);
        if (response.estado == "error") return setMessage(response.mensaje);
        navigate("/sendedticket");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Solcitar ticket de revisión</Text>

            <ScrollView style={styles.form}>
                <Text style={styles.label}>Asunto:</Text>
                <TextInput style={styles.input} placeholder="Ejemplo: router reseteado.." value={subject} onChangeText={setSubject} />

                <Text style={styles.label}>Solicitante:</Text>
                <TextInput style={styles.input} placeholder="Persona que se comunica.." value={aplicant} onChangeText={setAplicant} />

                <Text style={styles.label}>Fecha:</Text>
                <DatePicker style={styles.input} placeholderStyle={styles.placeholder} date={date} setDate={setDate} placeholder="Fecha que podemos visitarle.." />

                <Text style={styles.label}>Turno:</Text>
                <View style={styles.turno}>
                    <TouchableOpacity style={[styles.turno_btn, shift == "MAÑANA" ? styles.active : null]} onPress={() => setShift("MAÑANA")}>
                        <Text style={[styles.turno_btn_text, shift == "MAÑANA" ? styles.active : null]}>Mañana</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.turno_btn, shift == "TARDE" ? styles.active : null]} onPress={() => setShift("TARDE")}>
                        <Text style={[styles.turno_btn_text, shift == "TARDE" ? styles.active : null]}>Tarde</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Descripción:</Text>
                <TextInput style={styles.input} placeholder="Escribe algo..." multiline={true} numberOfLines={4} value={description} onChangeText={setDescription} />

                <Text style={styles.label}>Foto:</Text>
                <ImagePicker style={styles.input} placeholderStyle={styles.placeholder} image={image} setImage={setImage} placeholder="Envianos una foto.." />
                {image && <Image style={styles.input_img} source={{ uri: image.uri }} />}

                {message && (
                    <View style={styles.message}>
                        <Text style={styles.message_text}>{message}</Text>
                    </View>
                )}

                <TouchableOpacity style={styles.submit_btn} onPress={submit}>
                    <Text style={styles.submit_btn_text}>Enviar</Text>
                    <Icon style={styles.submit_btn_icon} name="send" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#0068bf",
        paddingBottom: 10,
        width: "100%",
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.2,
        paddingTop: 15,
        paddingBottom: 20,
    },
    form: {
        flex: 1,
        width: "100%",
        // padding: 20,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 10,
        width: "100%",
    },
    input: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    placeholder: {
        color: "#ccc",
    },
    submit_btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2b7bed",
        borderRadius: 5,
        padding: 15,
        marginTop: 20,
    },
    submit_btn_text: {
        color: "#fff",
        fontWeight: "bold",
        marginRight: 10,
        fontSize: 16,
    },
    submit_btn_icon: {
        color: "#fff",
        fontSize: 20,
    },
    input_img: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
        marginBottom: 10,
        borderRadius: 5,
    },
    turno: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#ccc",
    },
    turno_btn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 5,
    },
    active: {
        color: "#fff",
        backgroundColor: "#2b7bed",
    },
    message: {
        width: "100%",
        padding: 10,
        marginTop: 10,
    },
    message_text: {
        color: "red",
        textAlign: "center",
    },
});
