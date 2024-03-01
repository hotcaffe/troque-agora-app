import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignHeader } from "./SignHeader";
import { Divider, HelperText, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { IUserAddress, IUserProfile } from "../interfaces/profile";

const schema = Yup.object().shape({
    vc_email: Yup.string().email("Digite um email válido (ex: rodrigo@gmail.com)").required("O email é obrigatório!"),
    username: Yup.string().required("O nome de usuário é obrigatório!"),
    password: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]/,
        //     'A senha deve conter: letras minúsculas, letras maiúsculas, números e caracteree especiais'
        // )
        .matches(/^(?=.*[a-z])/, "A senha deve conter uma letra minúscula")
        .matches(/^(?=.*[A-Z])/, "A senha deve conter uma letra maiúscula")
        .matches(/^(?=.*\d)/, "A senha deve conter um número")
        .matches(/^(?=.*[@$!%*?&_])/, "A senha deve conter um caractere especial")
        .required("A senha é obrigatória!"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas devem ser iguais').required("Por favor, digite sua senha novamente!")
})

interface UserAccount {
    username: string;
    vc_email: string;
    password: string;
    confirmPassword: string;
}

export function SignInAccount({navigation}: {navigation: NavigationProp<any>}) {
    const {register, handleSubmit, setValue, formState, getValues} = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    const route = useRoute();

    const [hiddenPassword, setHiddenPassword] = useState(true); 
    const [hiddenConfirmPassword, setHiddenConfirmePassword] = useState(true);

    const {errors} = formState;

    async function onSubmit(data: UserAccount) {
        const params = route.params as IUserProfile & IUserAddress
        const {confirmPassword, ...userAccount} = data
        const user = {...params, ...userAccount};
        console.log(user)
    }

    useEffect(() => {
        register("vc_email")
        register("username")
        register("password")
    }, [])

    return (
        <View style={container}>
            <SignHeader/>
            <View style={body}>
                <KeyboardAvoidingView contentContainerStyle={{flex: 1, padding: 25, justifyContent: 'center'}} style={{flex: 1, width: '100%'}} 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView style={inputBody} contentContainerStyle={{width: '100%'}}>
                        <Text style={header}>Informe os dados da conta</Text>
                        <View style={{width: '100%'}}>
                            <TextInput style={input} label="Digite seu email" left={<TextInput.Icon icon="email"/>} 
                                mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                onChangeText={(text) => setValue('vc_email', text)}
                                error={!!errors?.vc_email} 
                            />
                            <HelperText type="error" visible={!!errors?.vc_email} style={helper}>
                                {errors?.vc_email ? String(errors.vc_email.message) : ""}
                            </HelperText>
                        </View>
                        <View style={{width: '100%'}}>
                            <TextInput style={input} label="Escolha um nome de usuário" left={<TextInput.Icon icon="account"/>} 
                                mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                onChangeText={(text) => setValue('username', text)}
                                error={!!errors?.username}
                            />
                            <HelperText type="error" visible={!!errors?.username} style={helper}>
                                {errors?.username ? String(errors.username.message) : ""}
                            </HelperText>
                        </View>
                        <View style={{width: '100%'}}>
                            <TextInput style={input} label="Senha" left={<TextInput.Icon icon="lock" />} 
                                right={
                                    <TextInput.Icon icon={hiddenPassword ? "eye" : "eye-off"} 
                                        onPress={(e) => {
                                            e.stopPropagation()
                                            setHiddenPassword(!hiddenPassword)
                                        }}/>
                                } 
                                secureTextEntry={hiddenPassword}
                                mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                onChangeText={(text) => setValue('password', text)}
                                error={!!errors?.password}
                            />
                            <HelperText type="error" visible={!!errors?.password} style={helper}>
                            {errors?.password ? String(errors.password.message) : ""}
                            </HelperText>
                        </View>
                        <View style={{width: '100%'}}>
                            <TextInput style={input} label="Confirme a senha" left={<TextInput.Icon icon="check" />} 
                                right={
                                    <TextInput.Icon icon={hiddenConfirmPassword ? "eye" : "eye-off"} 
                                        onPress={(e) => {
                                            e.stopPropagation()
                                            setHiddenConfirmePassword(!hiddenConfirmPassword)
                                    }}/>
                                } 
                                secureTextEntry={hiddenConfirmPassword}
                                mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                onChangeText={(text) => setValue('confirmPassword', text)}
                                error={!!errors?.confirmPassword}
                            />
                            <HelperText type="error" visible={!!errors?.confirmPassword} style={helper}>
                            {errors?.confirmPassword ? String(errors.confirmPassword.message) : ""}
                            </HelperText>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <TouchableOpacity style={button} onPress={handleSubmit(onSubmit)}>
                    <Text style={buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const {container, header, body, inputBody, input, button, buttonText, helper} = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
    },
    body: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    inputBody: {
        width: '100%',
        padding: 10,
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
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
    },
    helper: {
        height: 30,
        margin: 0,
        paddingVertical: 0
    }
})