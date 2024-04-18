import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignHeader } from "./SignHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType} from "expo-camera";
import Toast from "react-native-root-toast";
import { NavigationProp, useRoute } from "@react-navigation/native";

export function SendDocs({navigation}: {navigation: NavigationProp<any>}) {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef<Camera>(null);
    const [frontImage , setFrontImage] = useState<string | undefined>(undefined);
    const [backImage, setBackImage] = useState<string | undefined>(undefined);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [isLoadingPicture, setIsLoadingPicture] = useState(false);

    const route = useRoute();

    async function takePicture() {
        setIsLoadingPicture(true)
        if (cameraRef) {
            try {
                const data = await cameraRef.current?.takePictureAsync();
                if (data?.uri) {
                    if (frontImage !== undefined) {
                        setBackImage(data.uri)
                    } else {
                        setFrontImage(data.uri)
                    }
                }
            } catch (error) {
                console.log(error)
                setFrontImage(undefined);
                setBackImage(undefined);
                setCameraOpen(false);
            } finally {
                setIsLoadingPicture(false)
                if (frontImage !== undefined) setCameraOpen(false)
            }
        }
    }

    function resetPictures() {
        setFrontImage(undefined);
        setBackImage(undefined);
    }

    function onSubmit() {
        const params = route.params;
        const data = {
            ...params, 
            document: {
                frontImage,
                backImage
            }
        }
        navigation.navigate('SendBio', data)
    }
    
    useEffect(() => {
        requestPermission()
    }, [])
    
    useEffect(() => {
        if (permission) {
            if (!permission.granted) {
                Toast.show('É necessário garantir permissão à câmera para prosseguir!', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: '#1D4044'
                })
            }
        }
    }, [permission])

    return (
        <View style={styles.container}>
            <SignHeader />
            <View style={styles.body}>
                <Text style={styles.bodyTitle}>Documentos</Text>
                <View style={styles.divider}/>
                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, height: '72%'}}>
                    {(frontImage && backImage) ? 
                        <TouchableOpacity style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#E2E8F0', paddingVertical: 5, flexDirection: 'row'}} 
                            onPress={() => {
                                resetPictures()
                                setCameraOpen(true)
                            }}
                        >
                            <Image style={{width: '60%', height: '95%', borderRadius: 20, position: 'absolute', left: 50, top: 5}} source={{uri: frontImage}}/>       
                            <Image style={{width: '60%', height: '95%', borderRadius: 20, position: 'absolute', left: 100, top: 20}} source={{uri: backImage}}/>             
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.button} onPress={() => setCameraOpen(true)}>
                            <Ionicons name="md-camera-outline" color="#4FD1C5" size={80}/>
                            <Text style={{color: '#4FD1C5', textAlign: 'center', fontWeight: '600'}}>Clique aqui para enviar uma foto do seu documento</Text>
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity style={(!frontImage || !backImage) ? {...styles.goButton, opacity: 0.6} : styles.goButton} disabled={!frontImage || !backImage}
                    onPress={() => frontImage && backImage && onSubmit()}
                >
                    <Text style={styles.goButtonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
            {cameraOpen && <View style={{position: 'absolute', width: '100%', height: '100%'}}>
                <Camera ref={cameraRef} type={CameraType.back} style={styles.camera} ratio="16:9">
                    <View style={{height: '80%', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', gap: 15, flexDirection: 'column'}}>
                        <TouchableOpacity>
                            <Text style={{color: 'white', width: '70%'}}>Alinhe seu documento ao centro do retângulo abaixo: </Text>
                        </TouchableOpacity>
                        <View style={{height: '75%', width: '70%', borderWidth: 5, borderColor: 'white', alignItems: 'center', justifyContent: 'center', opacity: 0.7}}>
                            <TouchableOpacity>
                                <Text style={{color: 'white', width: '100%', fontWeight: '600', marginHorizontal: 'auto'}}>
                                    {frontImage == undefined ? "Capture a FRENTE do documento" : "Agora capture a parte de TRÁS"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {isLoadingPicture && 
                        <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', backgroundColor: 'gray', opacity: 0.8}}>
                            <ActivityIndicator color="white" size={60}/>
                        </View>
                    }
                    <View style={{height: '100%', width: '100%', alignItems: 'flex-end', justifyContent: 'center', padding: 15, flexDirection: 'row', gap: 15}}>
                        <View style={{width: 60}}/>
                        <TouchableOpacity onPress={() => !isLoadingPicture && takePicture()}>
                            <View style={isLoadingPicture ? {display: 'none'} : styles.cameraButton}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                resetPictures()
                                setCameraOpen(false)
                            }}
                        >
                            <View style={isLoadingPicture ? {display: 'none'} : styles.cameraQuitButton}>
                                <Ionicons name="md-close" color="white" size={32}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>}
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
    camera: {
        // width: '100%',
        // height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column'  
    },
    cameraButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 150,
        borderColor: '#E2E8F0',
        borderWidth: 10,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    cameraQuitButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E53E3E',
        borderRadius: 150,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    }
})