import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, TextInput } from "react-native-paper";
import * as Yup from 'yup'
import { CommonTextInput } from "../common/CommonTextInput";
import { DateInput } from "../common/DateInput";

const schema = Yup.object().shape({
    cpf: Yup.string().required('O CPF é obrigatório!'),
    dt_nascimento: Yup.date().required("Date de nascimento é obrigatória!")
})

export function Test(){
    const {register, handleSubmit, setValue, formState, getValues} = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    });

    function onSubmit(data: any) {
        console.log(data)
    }

    useEffect(() => {
        register('cpf')
    }, [])

    return (
        <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <TextInput style={{width: '80%'}} label="CPF" left={<TextInput.Icon icon="folder"/>} 
                mode="flat" theme={{colors: {primary: '#2C7A7B'}}} 
                render={(props: any) => (
                    <TextInputMask {...props} type={'cpf'} includeRawValueInChangeText
                        onChangeText={(_, rawText) => {
                            rawText && setValue('cpf', rawText)
                        }}
                    />
                )}
            />
            <CommonTextInput 
                label="CPF" name="cpf" 
                style={{width: '80%'}}
                theme={{colors: {primary: '#2C7A7B'}}}
                leftIcon="folder"
                setValue={setValue}
                type="cpf"
            />
            <DateInput name="dt_nascimento" display="calendar" mode="date" style={{width: '100%'}} label="Selecione sua data de nascimento" setValue={setValue}/>
            <Button onPress={handleSubmit(onSubmit, (err) => console.log(err))}>Confirmar</Button>
        </View>
    )
}