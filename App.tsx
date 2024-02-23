import NavStack from './src/NavStack';
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() {
  return (
    <RootSiblingParent>
      <NavStack />
    </RootSiblingParent>
  );
}