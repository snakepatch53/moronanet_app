import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImgPicker from "expo-image-picker";

export default ImagePicker = ({ image, setImage, placeholder, placeholderStyle, ...props }) => {
    // const imageToBase64 = async (filePath) => {
    //     try {
    //         // Leer el archivo de la ruta y obtener su contenido como una cadena de texto
    //         const fileContent = await RNFS.readFile(filePath, "base64");

    //         // Convertir la cadena de texto a base64
    //         const base64Image = `data:image/jpeg;base64,${fileContent}`;

    //         // Devolver la representación base64 de la imagen
    //         return base64Image;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImgPicker.launchImageLibraryAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        if (result.assets) {
            setImage(result.assets[0]);
        }
    };

    return (
        <TouchableOpacity onPress={pickImage} {...props}>
            <Text style={placeholderStyle}>{placeholder}</Text>
        </TouchableOpacity>
    );
};
