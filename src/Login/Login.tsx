import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignHeader } from "../Sign/SignHeader";
import { Checkbox, HelperText, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'

const schema = Yup.object().shape({
    email: Yup.string().required("Informe o seu email"),
    password: Yup.string().required("Digite a senha")
})

export function Login() {
    const [hiddenPassword, setHiddenPassword] = useState(true); 
    const {register, handleSubmit, setValue, formState} = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    const [keepSession, setKeepSession] = useState(false);

    const {errors} = formState

    function onSubmit(data: any) {
        // Alert.alert(data.email)
        console.log(data)
    }

    useEffect(() => {
        register('email')
        register('password')
    })

    return (
        <View style={container}>
            <SignHeader/>
            <View style={body}>
                <View style={inputBody}>
                    <Text style={header}>Informe seus dados para entrar</Text>
                    <View style={{width: '100%'}}>
                        <TextInput style={input} label="Email" left={<TextInput.Icon icon="email"/>} 
                            mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                            onChangeText={(text) => setValue('email', text)}
                            error={!!errors?.email}
                        />
                        <HelperText type="error" visible={!!errors?.email}>
                            {errors?.email ? String(errors.email.message) : ""}
                        </HelperText>
                    </View>
                    <View style={{width: '100%'}}>
                        <TextInput style={input} label="Password" left={<TextInput.Icon icon="lock" />} 
                            right={<TextInput.Icon icon={hiddenPassword ? "eye" : "eye-off"} onPress={() => setHiddenPassword(!hiddenPassword)}/>} 
                            secureTextEntry={hiddenPassword}
                            mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                            onChangeText={(text) => setValue('password', text)}
                            error={!!errors?.password}
                        />
                        <HelperText type="error" visible={!!errors?.password}>
                        {errors?.password ? String(errors.password.message) : ""}
                        </HelperText>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }} onPress={() => setKeepSession(!keepSession)}>
                        <Checkbox status={keepSession ? "checked" : "unchecked"}  theme={{colors: {primary: '#2C7A7B'}}}/>
                        <Text style={{ fontWeight: 'bold' }}>Manter-se conectado?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={button} onPress={handleSubmit(onSubmit)}>
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
        gap: 10
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        color: '#4FD1C5',
        marginVertical: 15,
    },
    input: {
        width: '100%',
        backgroundColor: '#E2E8F0'
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