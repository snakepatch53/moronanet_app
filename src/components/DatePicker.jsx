import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default DatePicker = ({ date, setDate, placeholder, placeholderStyle, ...props }) => {
    const [inputDate, setInputDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === "ios");
        setInputDate(selectedDate || inputDate);
        const formatDate = moment(selectedDate || inputDate).format("YYYY-MM-DD");
        setDate(formatDate);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setShow(true)} {...props}>
                <Text style={placeholderStyle}>{date ?? placeholder}</Text>
            </TouchableOpacity>
            {show && <DateTimePicker testID="dateTimePicker" value={inputDate} mode={"date"} display="default" onChange={onChange} />}
        </>
    );
};
