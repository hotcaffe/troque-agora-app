import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { PinInput } from "../common/PinInput";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export function EmailConfirmation() {
    const route = useRoute() as any;
    const email = route.params?.vc_email;

    const [pin, setPin] = useState(0)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="mail-open" size={100} style={{color: 'white'}}/>
                <View >
                    <Text style={{fontWeight: '800', fontSize: 20, color: 'white'}}>Enviamos um email para voce!</Text>
                    <Text style={{color: 'white'}}>Solicitamos que confirme seu email em {email} antes de acessar sua conta.</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View />
                <PinInput onChange={(value) => setPin(value)} size={64} autofocus/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
         flex: 1,
         width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         gap: 10,
    },
    header: {
        flex: 1,
        backgroundColor: '#4FD1C5',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 15,
        height: '60%',
        paddingTop: '5%'
    },
    logo: {
         width: 100,
         height: 100
    },
    text: {
         color: 'white',
         fontWeight: '600',
         fontSize: 24
    },
    body: {
        height: '40%',
        padding: 15,
        color: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },
    bodyHeader: {
        color: 'white'
    },
    bodyText: {
        color: 'white'
    },
    button: {
        width: 150,
        height: 50,
        borderColor: '#4FD1C5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#4FD1C5',
    },
    buttonText: {
        fontWeight: '600',
        color: 'white',
        fontSize: 22
    }
})