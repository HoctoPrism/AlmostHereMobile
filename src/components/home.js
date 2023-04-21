import { View, StyleSheet, Text, Image, TouchableOpacity, useColorScheme, StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GetWeather from './elements/meteo';
import Favorites from './elements/favorites';

export default function Home({ navigation }) {

  const { colors } = useTheme();
  const theme = useColorScheme() === 'light' ? 'dark-content' : 'light-content';

  return (
    <View style={{ margin: 20 }} testID='home_screen'>

      <StatusBar backgroundColor={colors.background} barStyle={theme} />

      <GetWeather />
      <Favorites />

      <TouchableOpacity
        onPress={() => navigation.navigate('Map' )}
        style={{
          backgroundColor: colors.onSecondary,
          shadowColor: colors.shadow,
          ...styles.button
        }}>
        <View style={styles.buttonContent}>
          <Ionicons name="map" size={30} color={colors.onSurface} style={{ margin: 10 }}/>
          <Text style={{ fontWeight: "bold", color: colors.onSurface, marginStart: 10 }}>Voir la carte du réseau</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/img/map.jpg')} style={{ resizeMode: 'contain' }} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Schedule' )}
        testID="schedule_button"
        style={{
          backgroundColor: colors.onSecondary,
          shadowColor: colors.shadow,
          ...styles.button
        }}>
        <View style={styles.buttonContent}>
          <Ionicons name="analytics" size={30} color={colors.onSurface} style={{ margin: 10 }}/>
          <Text style={{ fontWeight: "bold", color: colors.onSurface, marginStart: 10 }}>Voir les lignes du réseau</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/img/lines.jpg')} style={{ resizeMode: 'contain' }} />
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginVertical: 16,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    width: 80,
    height: 50,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  }
});
