import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import Home from '../../components/home';
import Schedule from '../../components/schedule';
import Itineraire from '../../components/itineraire';
import Notification from '../../components/notification';
import Favorite from '../../components/favorite';
const BottomMenuNavigation = () => {

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator labeled={false} barStyle={styles.navbar}>
      <Tab.Screen name="Home" component={Home} options={() => ({
        tabBarIcon: ({ focused, color }) => {
          return focused ?
            <Ionicons name="home" size={25} color={color} /> :
            <Ionicons name="home-outline" size={25} color={color} />
        }
      })} />
      <Tab.Screen name="Schedule" component={Schedule} options={() => ({
        tabBarIcon: ({ focused, color }) => {
          return focused ?
            <Ionicons name="time" size={25} color={color} /> :
            <Ionicons name="time-outline" size={25} color={color} />
        }
      })} />
      <Tab.Screen name="Itineraire" component={Itineraire} options={() => ({
        tabBarIcon: ({ focused, color }) => {
          return focused ?
            <Ionicons name="paper-plane" size={25} color={color} /> :
            <Ionicons name="paper-plane-outline" size={25} color={color} />
        },
      })} />
      <Tab.Screen name="Notification" component={Notification} options={() => ({
        tabBarIcon: ({ focused, color }) => {
          return focused ?
            <Ionicons name="notifications" size={25} color={color} /> :
            <Ionicons name="notifications-outline" size={25} color={color} />
        }
      })} />
      <Tab.Screen name="Favorites" component={Favorite} options={() => ({
        tabBarIcon: ({ focused, color }) => {
          return focused ?
            <Ionicons name="heart" size={25} color={color} /> :
            <Ionicons name="heart-outline" size={25} color={color} />
        }
      })} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default BottomMenuNavigation;
