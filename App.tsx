import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BioAuth } from './src/BioAuth';
import { Intro } from './src/Intro';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SendDocs } from './src/Sign/SendDocs';


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Intro' component={Intro} options={{headerShown: false, statusBarColor: '#234E52'}}/>
          <Stack.Screen name='SendDocs' component={SendDocs} options={{headerTitle: 'Documentos', headerTintColor: 'white', headerStyle: {backgroundColor: '#234E52'}, statusBarColor: '#234E52'}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

{/* <Text>Open up App.tsx to start working on your app!</Text> */}
// <StatusBar style="auto" />
// </View>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
