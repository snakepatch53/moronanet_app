import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { APP_LOGO_URI } from "@env";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-native";
import { login } from "../dao/ClientDao";

const Login = ({ setSession }) => {
    const [cedula, setCedula] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const refInputPass = useRef(null);

    const navigate = useNavigate();

    const handleLogin = async () => {
        const session = await login(cedula, password, navigate, setMessage);
        if (session) setSession(session);
    };
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.content}>
                <Image style={styles.image} source={{ uri: APP_LOGO_URI }} />
                <Text style={styles.title}>Bienvenido al portal</Text>

                <View style={styles.label}>
                    <Icon style={styles.label_icon} name="person" />
                    <Text style={styles.label_text}>Ingresa tu cédula: </Text>
                </View>

                <View style={styles.input_container}>
                    <TextInput
                        onChangeText={setCedula}
                        value={cedula}
                        placeholder="Número de cedula"
                        keyboardType="numeric"
                        style={styles.input}
                        returnKeyType="next"
                        onSubmitEditing={() => refInputPass.current.focus()}
                    />
                </View>

                <View style={styles.label}>
                    <Icon style={styles.label_icon} name="lock" />
                    <Text style={styles.label_text}>Ingresa tu contraseña: </Text>
                </View>

                <View style={styles.input_container}>
                    <TextInput
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        ref={refInputPass}
                        returnKeyType="send"
                        onSubmitEditing={handleLogin}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon style={styles.input_icon} name={showPassword ? "visibility" : "visibility-off"} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.message}>{message}</Text>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.button_text}>Iniciar session</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        // flex: 1,
        // width: "100%",
        // // minHeight: Dimensions.get("window").height,
        // backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
        objectFit: "cover",
        // marginTop: "auto",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0378c0",
        marginBottom: 20,
    },

    // Label
    label: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 20,
        marginBottom: 10,
    },
    label_icon: {
        marginRight: 10,
        fontSize: 15,
        color: "#0068bf",
    },
    label_text: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0068bf",
    },

    // Input
    input_container: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#f7f7f7",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dddddd",
    },

    input: {
        flex: 1,
        width: "100%",
        padding: 10,
        borderRadius: 5,
    },

    input_icon: {
        padding: 14,
        fontSize: 20,
        color: "#0068bf",
    },

    // Button
    button: {
        width: "100%",
        backgroundColor: "#0068bf",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        // marginTop: "auto",
    },
    button_text: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },

    // Message
    message: {
        // color de alerta
        color: "#d13a2e",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 20,
    },
});

export default Login;
