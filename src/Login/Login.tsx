import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignHeader } from "../Sign/SignHeader";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export function Login() {
    const [hiddenPassword, setHiddenPassword] = useState(true); 

    return (
        <View style={container}>
            <SignHeader/>
            <View style={body}>
                <View style={inputBody}>
                    <Text style={header}>Informe seus dados para entrar</Text>
                    <TextInput style={input} label="Email" left={<TextInput.Icon icon="email"/>} mode="flat" theme={{colors: {primary: '#2C7A7B'}}}/>
                    <TextInput style={input} label="Password" left={<TextInput.Icon icon="lock"/>} 
                        right={<TextInput.Icon icon={hiddenPassword ? "eye" : "eye-off"} onPress={() => setHiddenPassword(!hiddenPassword)}/>} 
                        secureTextEntry={hiddenPassword}
                        mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                    />
                </View>
                <TouchableOpacity style={button}>
                    <Text style={buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const {container, header, body, inputBody, input, button, buttonText} = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        paddingBottom: 20,
    },
    body: {
        width: '100%',
        height: '80%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputBody: {
        width: '100%',
        alignItems: 'center',
        gap: 25
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        color: '#4FD1C5',
        marginVertical: 15
    },
    input: {
        width: '100%',
        backgroundColor: '#E2E8F0',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4FD1C5',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
    }
})