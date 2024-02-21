import { Image, StyleSheet, Text, View } from "react-native";

export function SignHeader() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/PinLogo.png')}/>
            <Text style={styles.text}>TROQUE AGORA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '20%',
        backgroundColor: '#4FD1C5',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    logo: {
        width: 60,
        height: 60
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20
    }
})