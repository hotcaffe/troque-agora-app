import { useEffect, useReducer, useRef } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputKeyPressEventData, View } from "react-native";
import { TextInput } from "react-native-paper";

interface IPinInput {
    onChange: (value: number) => void;
    size: number;
    autofocus?: boolean;
}

export function PinInput({onChange, size, autofocus}: IPinInput) {
    const number1 = useRef(null);
    const number2 = useRef(null);
    const number3 = useRef(null);
    const number4 = useRef(null);
    const number5 = useRef(null);
    const refList = [number1, number2, number3, number4, number5]

    const [state, dispatch] = useReducer(reducer, ['', '', '', '', ''])

    function onKeyPress(index: number, key: string, values: string[]) {
        if (key == 'Backspace') {
            if (values[index] != "Backspace") return;
            index = index - 1
            if (index < 0 ) return;
        } else {
            index= index + 1
            if (index > 4) return;
        }

        const ref = refList[index] as any;
        if (ref?.current) {
            ref.current.focus()
        }
    }

    function reducer(state: string[], {key, index}: {key: string, index: number}) {
        onKeyPress(index, key, state);
        state[index] = key;
        return state
    }

    useEffect(() => {
        onChange(Number(state.join('')))
    }, [state])

    return (
        <View style={{padding: 0, flexDirection: 'row', gap: 5}}>
            <TextInput style={{...box, width: size, height: size}} keyboardType="numeric" ref={number1} maxLength={1} 
                onKeyPress={(e) => dispatch({key: e.nativeEvent.key, index: 0})}
                theme={{colors: {primary: '#2C7A7B'}}}
                autoFocus={autofocus}
            />
            <TextInput style={{...box, width: size, height: size}} keyboardType="numeric" ref={number2} maxLength={1} 
                onKeyPress={(e) => dispatch({key: e.nativeEvent.key, index: 1})}
                theme={{colors: {primary: '#2C7A7B'}}}
            />
            <TextInput style={{...box, width: size, height: size}} keyboardType="numeric" ref={number3} maxLength={1} 
                onKeyPress={(e) => dispatch({key: e.nativeEvent.key, index: 2})}
                theme={{colors: {primary: '#2C7A7B'}}}
            />
            <TextInput style={{...box, width: size, height: size}} keyboardType="numeric" ref={number4} maxLength={1} 
                onKeyPress={(e) => dispatch({key: e.nativeEvent.key, index: 3})}
                theme={{colors: {primary: '#2C7A7B'}}}
            />
            <TextInput style={{...box, width: size, height: size}} keyboardType="numeric" ref={number5} maxLength={1} 
                onKeyPress={(e) => dispatch({key: e.nativeEvent.key, index: 4})}
                theme={{colors: {primary: '#2C7A7B'}}}
            />
        </View>
    )
}

const {box} = StyleSheet.create({
    box: {
        // borderWidth: 1,
        borderBottomWidth: 5,
        borderColor: '#E2E8F0',
        fontSize: 20,
        backgroundColor: 'transparent'
    }
})