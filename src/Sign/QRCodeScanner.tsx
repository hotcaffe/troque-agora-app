import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Constants } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, TextInput } from "react-native-paper";

export function QRCodeScanner({navigation}: {navigation: NavigationProp<any>}) {
    const cameraRef = useRef<Camera>(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    
    useEffect(() => {
        requestPermission()
        // console.log(route.params)
    }, [permission])

    function onScan(data: any) {
        // console.log(data) //pegar o token e enviar para o backend e depois passar para a próxima tela
        navigation.navigate('SendDocs', {token: data})
    }
    
    return (
        <View style={{width: '100%', height: '100%'}}>

            <Camera 
                ref={cameraRef} style={{width: '100%', height: '100%', justifyContent: 'flex-end'}} 
                barCodeScannerSettings={{
                    barCodeTypes: [Constants.BarCodeType.qr],
                    interval: 5000
                }}
                onBarCodeScanned={(qr) => onScan(qr.data)}
                ratio="16:9"
            >
                <View style={scan}>
                    <Ionicons name="scan-outline" style={icon} size={400}/>
                </View>
                <View style={{backgroundColor: 'white', paddingHorizontal: 10, height: 150, paddingVertical: 10, gap: 20}}>
                    <TextInput placeholder="Digite o código manualmente"/>
                    <TouchableOpacity style={button}>
                        <Text style={goButtonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}

const {icon, scan, button, goButtonText} = StyleSheet.create({
    icon: {
        // position: 'absolute',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    scan: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 200
    },
    button: {
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