import NavStack from './src/NavStack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Test } from './src/_test/Test';


export default function App() {

  // return <Test/>

  return (
    <RootSiblingParent>
      <NavStack />
    </RootSiblingParent>
  );
}