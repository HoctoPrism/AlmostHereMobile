import { createStackNavigator } from '@react-navigation/stack';
import BottomMenuNavigation from './menu';
import TransportMap from '../../components/transportMap';
import Route from '../../components/elements/route';
import OneRouteMap from '../route/oneRouteMap';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Menu"
        component={BottomMenuNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Map"
        component={TransportMap}
        options={{
          headerTitle: 'Carte du réseau',
        }}
      />

      <Stack.Screen
        name="Route"
        component={Route}
      />

      <Stack.Screen
        name="OneRouteMap"
        component={OneRouteMap}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

export default MyStack;
