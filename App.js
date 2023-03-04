/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DarkCustomTheme } from './src/utils/theme/dark';
import { LightCustomTheme } from './src/utils/theme/light';
import { Provider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import MyStack from './src/utils/menu/stackNavigator';

const App: () => Node = () => {

  let theme = useColorScheme() === 'dark' ? DarkCustomTheme : LightCustomTheme;

  return (
    <Provider theme={theme}>
      <NavigationContainer theme={theme}>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
