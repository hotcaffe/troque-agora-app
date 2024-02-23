import { Ionicons } from "@expo/vector-icons"
import { Camera, CameraType, FaceDetectionResult } from "expo-camera"
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Text, Image } from "react-native"
import { SignHeader } from "./SignHeader"
import { useRef, useState, useEffect } from "react";
import Toast from "react-native-root-toast";

let count = 0;

export function SendBio() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef<Camera>(null);
    const [image , setImage] = useState<string | undefined>(undefined);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [isLoadingPicture, setIsLoadingPicture] = useState(false);
    const [validFacePosition, setValidFacePosition] = useState(false);

    async function handleFaceRecognition(data: FaceDetectionResult) {
        if (image || isLoadingPicture) return;
        const face = data?.faces[0] as any;
        const size = face?.bounds?.size;
        const origin = face?.bounds?.origin;
        if ((size && size.width >= 300 && size.height >= 300) && (origin && origin.x >= 0 && origin.x <= 50 && origin.y >= 150 && origin.y <= 250)) {
            setValidFacePosition(true)
            if (count >= 25) {
                count = 0
                await takePicture();
            } else {
                count += 1
            }
        } else {
            setValidFacePosition(false)
            count = 0
        }  
    }

    async function takePicture() { 
        setIsLoadingPicture(true)
        if (cameraRef) {
            try {
                const pic = await cameraRef.current?.takePictureAsync()?.then(data => data?.uri);
                if (pic) {
                    setImage(pic)
                }
            } catch (error) {
                console.log(error)
                setImage(undefined)
            } finally {
                setIsLoadingPicture(false)
                setCameraOpen(false)
                setValidFacePosition(false)
            }
        }
    }

    function resetPictures() {
        setImage(undefined);
        setValidFacePosition(false)
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
                <Text style={styles.bodyTitle}>Biometria</Text>
                <View style={styles.divider}/>
                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, height: '72%'}}>
                    {(image) ? 
                        <TouchableOpacity style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E2E8F0', paddingVertical: 5, flexDirection: 'row'}} 
                            onPress={() => {
                                resetPictures()
                                setCameraOpen(true)
                            }}
                        >
                            <Image style={{width: '60%', height: '95%', borderRadius: 200}} source={{uri: image}}/>                  
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.button} onPress={() => setCameraOpen(true)}>
                            <View>
                                <Ionicons name="scan-outline" color="#4FD1C5" size={130} style={{position: 'relative', left: 3}}/>
                                <Ionicons name="person-outline" color="#4FD1C5" size={80} style={{position: 'absolute', left: 24, top: 24}}/>
                            </View>
                            <Text style={{color: '#4FD1C5', textAlign: 'center', fontWeight: '600'}}>Clique aqui para verificarmos sua biometria</Text>
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity style={(!image) ? {...styles.goButton, opacity: 0.6} : styles.goButton} disabled={!image}>
                    <Text style={styles.goButtonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
            {cameraOpen && <View style={{position: 'absolute', width: '100%', height: '100%'}}>
                <Camera ref={cameraRef} type={CameraType.front} ratio="16:9" onFacesDetected={(faces) => !isLoadingPicture && handleFaceRecognition(faces)}>
                    <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', gap: 15, flexDirection: 'column'}}>
                        <View 
                            style={validFacePosition ? {...styles.centralBox, borderColor: '#4FD1C5', borderWidth: 10} : styles.centralBox}
                        >
                            <TouchableOpacity>
                                <Text style={{color: 'white', width: '100%', fontWeight: '600', marginHorizontal: 'auto'}}>
                                    {validFacePosition ? "Mantenha seu rosto centralizado" : "Posicione seu rosto ao centro desta figura"}
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
    },
    centralBox: {
        height: '70%',
        width: '80%',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7
    }
})