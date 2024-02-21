import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect } from 'react';
import { Button, View } from 'react-native';

export function BioAuth() {
    async function verifyAvailableAuthentication() {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
    }

    async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log(isBiometricEnrolled);

    if (isBiometricEnrolled) {
        const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Prossiga para se autenticar',
        fallbackLabel: 'Não reconhecido! Tente novamente!'
        });

        console.log(auth.success)
    }
    }

    useEffect(() => {
    verifyAvailableAuthentication();
    }, [])

    return (
        <View>
            <Button onPress={handleAuthentication} title="Entrar"/>
        </View>
    )
}