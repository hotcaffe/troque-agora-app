import { NavigationContainerProps, NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

export function Intro({navigation}: {navigation: NavigationProp<any>}) {
     return (
          <View style={styles.container}>
               <View style={styles.header}>
                    <Image style={styles.logo} source={require('../assets/PinLogo.png')}/>
                    <Text style={styles.text}>TROQUE AGORA</Text>
                    {/* <View style={styles.divider}/> */}
               </View>
               <View style={styles.middle}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('SendDocs')}>
                         <Text style={styles.buttonText}>Completar cadastro</Text>
                    </Pressable>
               </View>
               <View style={styles.footer}>
                    <Pressable style={{...styles.footerButton, ...styles.registerButton}}>
                         <Text style={styles.registerButtonText}>Cadastrar-se</Text>
                    </Pressable>
                    <Pressable style={{...styles.footerButton, ...styles.loginButton}}>
                         <Text style={styles.loginButtonText}>Entrar</Text>
                    </Pressable>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          width: '100%',
          backgroundColor: '#4FD1C5',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
     },
     header: {
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          paddingHorizontal: 15,
          height: '30%',
          paddingTop: '20%'
     },
     logo: {
          width: 120,
          height: 120
     },
     text: {
          color: 'white',
          fontWeight: '600',
          fontSize: 24
     },
     divider: {
          height: 10,
          backgroundColor: 'white',
          width: '100%',
          marginVertical: 10,
     },
     middle: {
          alignItems: 'center',
          justifyContent: 'center',
          height: '50%',
          width: '100%',
          paddingHorizontal: 30
     },
     button: {
          width: '100%',
          height: 50,
          borderColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderRadius: 10,
     },
     buttonText: {
          fontWeight: '600',
          color: 'white',
          fontSize: 22
     },
     footer: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#234E52',
          height: '20%',
          gap: 20,
          paddingHorizontal: 30
     },
     footerButton: {
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
     },
     registerButton: {
          backgroundColor: 'white'
     },
     registerButtonText: {
          color: '#4FD1C5',
          fontSize: 18,
          fontWeight: '600'
     },
     loginButton: {
          backgroundColor: '#4FD1C5'
     },
     loginButtonText: {
          color: 'white',
          fontSize: 18,
          fontWeight: '600'
     }
})