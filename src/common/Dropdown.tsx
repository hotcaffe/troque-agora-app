import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface IDropdown {
    label: string;
    options: string[]
}

export function Dropdown({label, options}: IDropdown) {
    const [index, setIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);

    function changeIndex(index: number) {
        setIndex(index)
        setIsOpen(false)
    }

    return (
        <View style={styles.dropdown}>
            <View style={styles.dropdownInput} onTouchEnd={() => setIsOpen(!isOpen)}>
                {index == -1 ? <Text>{label}</Text> : <Text>{options[index]}</Text>}
                <Ionicons name="md-chevron-down" size={16} style={isOpen && {transform: [{rotate: '180deg'}]}}/>
            </View>
            <View style={isOpen ? {...styles.dropdownSelect, display: 'flex', paddingBottom: 25} : {display: 'none', height: 0}}>
                <Text style={{marginVertical: 10}}>{label}</Text>
                {options.map((option, index) => 
                    <Text key={option} style={{marginVertical: 10}} onPress={() => changeIndex(index)}>{option}</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {

    },
    dropdownInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        paddingVertical: 5,
        borderColor: 'gray'
    },
    dropdownSelect: {
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 3,
        paddingHorizontal: 5
        // backgroundColor: '#E2E8F0'
    }
})