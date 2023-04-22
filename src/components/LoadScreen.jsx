import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AnimatedView = Animated.createAnimatedComponent(View);

export default LoadScreen = () => {
    // const spinValue = useRef(new Animated.Value(0)).current;
    const [animation] = useState(new Animated.Value(0));

    // spinner
    useEffect(() => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear, // Utilizando la propiedad easing
                useNativeDriver: true,
            })
        ).start();
    }, [animation]);

    const animatedStyles = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                }),
            },
            { scaleX: -1 },
        ],
    };

    // puntos suspensivos
    const [loadingDots, setLoadingDots] = useState(".");
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingDots((prevLoadingDots) => {
                if (prevLoadingDots === "...") {
                    return ".";
                } else {
                    return prevLoadingDots + ".";
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <AnimatedView style={animatedStyles}>
                <Icon style={styles.icon} name="cached" />
            </AnimatedView>
            {/* <Text style={styles.text}>Cargando{loadingDots}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#fff",
    },
    icon: {
        color: "#0378c0",
        fontSize: 25,
    },
    text: {
        color: "#0378c0",
        fontSize: 15,
    },
});
