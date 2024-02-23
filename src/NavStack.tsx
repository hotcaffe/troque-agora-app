import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Intro } from "./Intro";
import { SendDocs } from "./Sign/SendDocs";
import { StyleSheet } from "react-native";
import { SendBio } from "./Sign/SendBio";

export default function NavStack() {
    const Stack = createNativeStackNavigator()
  
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Intro' component={Intro} options={{headerShown: false, statusBarColor: '#234E52'}}/>
            <Stack.Screen name='SendDocs' component={SendDocs} 
              options={{headerTitle: 'Documentos', headerTintColor: 'white', headerStyle: {backgroundColor: '#234E52'}, statusBarColor: '#234E52'}}
            />
            <Stack.Screen name='SendBio' component={SendBio} 
              options={{headerTitle: 'Biometria', headerTintColor: 'white', headerStyle: {backgroundColor: '#234E52'}, statusBarColor: '#234E52'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }