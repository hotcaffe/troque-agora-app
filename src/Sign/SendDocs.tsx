import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SignHeader } from "./SignHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Dropdown } from "../common/Dropdown";

const options = ["Identidade (RG/CPF)", "Carteira de motorista", "Título de eleitor"]

export function SendDocs() {


    return (
        <View style={styles.container}>
            <SignHeader />
            <View style={styles.body}>
                <Text style={styles.bodyTitle}>Documentos</Text>
                <View style={styles.divider}/>
                {/* <Dropdown label="Selecione o documento" options={options}/> */}
                <View style={{width: '100%', alignItems: 'center', paddingVertical: 50, height: '72%'}}>
                    <View style={styles.button}>
                        <Ionicons name="md-camera-outline" color="#4FD1C5" size={80}/>
                        <Text style={{color: '#4FD1C5', textAlign: 'center', fontWeight: '600'}}>Clique aqui para enviar uma foto do seu documento</Text>
                    </View>
                </View>
                <Pressable style={styles.goButton}>
                    <Text style={styles.goButtonText}>Continuar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    body: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    divider: {
        height: 5,
        backgroundColor: '#4FD1C5',
        width: '100%',
        marginVertical: 10,
    },
    bodyTitle: {
        fontWeight: '600',
        fontSize: 18
    },
    button: {
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 150,
        borderColor: 'gray',
        padding: 25,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: 'white'
        // backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    goButton: {
        width: '100%',
        height: 50,
        borderColor: '#4FD1C5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#4FD1C5'
   },
   goButtonText: {
        fontWeight: '600',
        color: 'white',
        fontSize: 22
   },
})