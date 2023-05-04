import { StyleSheet } from "react-native";
import { NativeRouter } from "react-router-native";

import Main from "./src/screens/Main.jsx";

export default function App() {
    return (
        <>
            <NativeRouter style={styles.container} initialEntries={["/login"]}>
                {/* <NativeRouter style={styles.container} initialEntries={["/home"]}> */}
                <Main />
            </NativeRouter>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
