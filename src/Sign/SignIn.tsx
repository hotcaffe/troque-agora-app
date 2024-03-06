import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignHeader } from "../Sign/SignHeader";
import { ActivityIndicator, Button, Checkbox, Divider, HelperText, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { IUserAddress, IUserProfile } from "../interfaces/profile";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { CommonTextInput } from "../common/CommonTextInput";
import { DateInput } from "../common/DateInput";


interface User extends IUserProfile, IUserAddress {}

const schema = Yup.object().shape({
    id_usuario: Yup.number().default(0),
    vc_nome: Yup.string().required("O nome é obrigatório"),
    in_cpf: Yup.number().required("O CPF é obrigatório"),
    in_celular: Yup.number().required("O telefone é obrigatório"),
    dt_nascimento: Yup.date().max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "Você deve ser maior de 18 anos!").required("A data de nascimento é obrigatória"),
    vc_email: Yup.string().default(""),
    bo_ativo: Yup.boolean().default(true),
    id_enderecoUsuarcio: Yup.number().default(0),
    vc_lougradouro: Yup.string().required("A rua é obrigatória"),
    in_numero: Yup.number().required("O número é obrigatório"),
    vc_complemento: Yup.string().default(""),
    vc_bairro: Yup.string().required("O bairro é obrigatório"),
    vc_cidade: Yup.string().required("É obrigatório informar um CEP válido!"),
    vc_estado: Yup.string().required("É obrigatório informar um CEP válido!")
})

export function SignIn({navigation}: {navigation: NavigationProp<any>}) {
    const {register, handleSubmit, setValue, formState, setError, clearErrors} = useForm<User>({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    const [CEP, setCEP] = useState('00000000');
    const [address, setAddress] = useState<any>()

    const {errors} = formState

    function onSubmit(data: any) {
        // Alert.alert(data)
        navigation.navigate('SignInAccount', data)
    }

    async function searchCEP() {
        if (CEP == '00000000' || CEP?.length <- 7) {
            setError('vc_cidade', {
                message: 'O CEP deve possuir 8 caracteres'
            })
            return;
        }
        setCEP('loading')
        try {
            const data = await fetch(`https://viacep.com.br/ws/${CEP}/json/`) 
                ?.then(res => res.json()) //substituir pela chamada na API
            if (data.erro) throw new Error("CEP não encontrado!")
            setAddress(data)
            clearErrors('vc_cidade')
            clearErrors('vc_estado')
        } catch (error) {
            console.log(error)
            setError('vc_cidade', {
                message: 'O CEP digitado não foi encontrado!'
            })
            setAddress(undefined)
        }
        setCEP(CEP)
    }

    useEffect(() => {
        register('vc_nome')
        register('in_cpf')
        register('in_celular')
        register('dt_nascimento')

        register('vc_bairro')
        register('vc_lougradouro')
        register('in_numero')
        register('vc_complemento')
    }, [])

    return (
        <View style={container}>
            <SignHeader/>
            <View style={body}>
                <KeyboardAvoidingView contentContainerStyle={{flex: 1, padding: 25, justifyContent: 'center'}} style={{flex: 1}} 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView style={inputBody}>
                        <View style={{marginBottom: 30}}>
                            <Text style={title}>Informações pessoais</Text>
                            <Divider style={{marginVertical: 10}}/>
                            <View style={{width: '100%'}}>
                                <TextInput style={input} label="Digite seu nome"
                                    mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                    onChangeText={(text) => setValue('vc_nome', text)}
                                    error={!!errors?.vc_nome}
                                />
                                <HelperText type="error" visible={!!errors?.vc_nome}>
                                    {errors?.vc_nome ? String(errors.vc_nome.message) : ""}
                                </HelperText>
                            </View>
                            <View style={{width: '100%'}}>
                                <CommonTextInput
                                    label="CPF" name="in_cpf" 
                                    style={input}
                                    theme={{colors: {primary: '#2C7A7B'}}}
                                    setValue={setValue}
                                    type="cpf"
                                    error={!!errors?.in_cpf}
                                />
                                <HelperText type="error" visible={!!errors?.in_cpf}>
                                    {errors?.in_cpf ? String(errors.in_cpf.message) : ""}
                                </HelperText>
                            </View>
                            <View style={{width: '100%'}}>
                                <CommonTextInput
                                    label="Digite seu telefone" name="in_celular" 
                                    style={input}
                                    theme={{colors: {primary: '#2C7A7B'}}}
                                    setValue={setValue}
                                    type="cel-phone"
                                    error={!!errors?.in_celular}
                                />
                                <HelperText type="error" visible={!!errors?.in_celular}>
                                    {errors?.in_celular ? String(errors.in_celular.message) : ""}
                                </HelperText>
                            </View>
                            <View style={{width: '100%'}}>
                                <DateInput 
                                    name="dt_nascimento" display="calendar" label="Selecione sua data de nascimento" mode="date" 
                                    setValue={setValue}
                                    textInputProps={{
                                        error: !!errors?.dt_nascimento,
                                        theme: {colors: {primary: '#2C7A7B'}},
                                        style: input
                                    }}
                                />
                                <HelperText type="error" visible={!!errors?.dt_nascimento}>
                                    {errors?.dt_nascimento ? String(errors.dt_nascimento.message) : ""}
                                </HelperText>
                            </View>
                        </View>
                        <View style={{marginBottom: 30}}>
                            <Text style={title}>Endereço</Text>
                            <Divider style={{marginVertical: 10}}/>
                            <View style={{width: '100%', marginBottom: 25}}>
                                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <CommonTextInput
                                        label="Digite seu CEP" name="CEP"
                                        style={{backgroundColor: '#E2E8F0', width: '80%'}}
                                        theme={{colors: {primary: '#2C7A7B'}}}
                                        setState={setCEP}
                                        type="zip-code"
                                    />
                                    <TouchableOpacity style={squareButton} onPress={searchCEP}>
                                        {
                                            CEP == "loading" ?
                                            <ActivityIndicator animating={true} color="white"/> :
                                            <Ionicons style={{color: 'white', fontSize: 25, textAlign: 'center'}} name="search"/>
                                        }
                                    </TouchableOpacity>
                                </View>
                                <HelperText type="error" visible={!!(errors?.vc_cidade || errors?.vc_estado)}>
                                    {(errors?.vc_cidade || errors?.vc_estado) ? String(errors?.vc_cidade?.message || errors?.vc_estado?.message) : ""}
                                </HelperText>
                                {address && 
                                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <View style={{width: '75%'}}>
                                            <TextInput style={input} value={address.localidade} disabled
                                                mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                                onChangeText={(text) => setValue('vc_cidade', text)}
                                                error={!!errors?.vc_cidade}
                                            />
                                        </View>
                                        <View style={{width: '20%'}}>
                                            <TextInput style={input} value={address.uf} disabled
                                                mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                                onChangeText={(text) => setValue('vc_estado', text)}
                                                error={!!errors?.vc_estado}
                                            />
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={{width: '100%'}}>
                                <TextInput style={input} label="Digite seu bairro"
                                    mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                    onChangeText={(text) => setValue('vc_bairro', text)}
                                    error={!!errors?.vc_bairro}
                                />
                                <HelperText type="error" visible={!!errors?.vc_bairro}>
                                    {errors?.vc_bairro ? String(errors.vc_bairro.message) : ""}
                                </HelperText>
                            </View>
                            <View style={{width: '100%'}}>
                                <TextInput style={input} label="Digite sua rua/estrada" 
                                    mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                    onChangeText={(text) => setValue('vc_lougradouro', text)}
                                    error={!!errors?.vc_lougradouro}
                                />
                                <HelperText type="error" visible={!!errors?.vc_lougradouro}>
                                    {errors?.vc_lougradouro ? String(errors.vc_lougradouro.message) : ""}
                                </HelperText>
                            </View>
                            <View style={{width: '100%'}}>
                                <TextInput style={input} label="Digite o número de sua residência" 
                                    mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                    onChangeText={(text) => setValue('in_numero', Number(text))}
                                    error={!!errors?.in_numero}
                                    keyboardType="numeric"
                                />
                                <HelperText type="error" visible={!!errors?.in_numero}>
                                    {errors?.in_numero ? String(errors.in_numero.message) : ""}
                                </HelperText>
                            </View>
                            <View style={{width: '100%'}}>
                                <TextInput style={input} label="Digite um complemento" 
                                    mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                                    onChangeText={(text) => setValue('vc_complemento', text)}
                                    error={!!errors?.vc_complemento}
                                />
                                <HelperText type="error" visible={!!errors?.vc_complemento}>
                                    {errors?.vc_complemento ? String(errors.vc_complemento.message) : ""}
                                </HelperText>
                            </View>
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


const {container, header, title, body, inputBody, input, button, buttonText, squareButton} = StyleSheet.create({
    container: {
        height: '100%',
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
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C7A7B'
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
        marginVertical: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
    },
    squareButton: {
        height: 55,
        width: 55,
        backgroundColor: '#4FD1C5',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    }
})