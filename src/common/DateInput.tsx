import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker  from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

interface IDateInput extends TouchableOpacityProps {
    name: string;
    mode: "date" | "time";
    display: "default" | "spinner" | "calendar"| "clock" | "compact" | "inline";
    label: string;
    setValue?: UseFormSetValue<any>;
    setState?: Dispatch<SetStateAction<any>>;
    textInputProps?: TextInputProps
}

export function DateInput({name, mode, display, label, textInputProps, setValue, setState, ...rest}: IDateInput) {
    const [date, setDate] = useState<Date>();
    const [show, setShow] = useState(false);

    function onChange(event: DateTimePickerEvent, selectedDate: Date | undefined) {
        setShow(false)
        
        if (event.type == "dismissed") return;

        selectedDate && setDate(selectedDate)
        if (setValue) {
            setValue(name, selectedDate)
        } else if (setState) {
            setState(selectedDate)
        }
    }

    return (
        <TouchableOpacity onPress={() => setShow(true)} {...rest}>
            {show && <DateTimePicker mode={mode} display={display} value={date ? date : new Date()} onChange={onChange} />}
            <TextInput 
                label={label}
                value={date?.toLocaleDateString('pt-BR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} 
                editable={false}
                left={<TextInput.Icon icon="calendar"/>}
                {...textInputProps}
            />
        </TouchableOpacity>
    )
}