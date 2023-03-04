/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Favorites: () => Node = () => {

  let { colors } = useTheme();

  return (
    <View>
      <View style={styles.titles}>
        <Ionicons name="heart" size={20} color={colors.onSurface} />
        <Text style={{ marginStart: 8, fontSize: 20 }}>Vos trajets favoris</Text>
      </View>
      <Text>CARD DES FAVORIS</Text>
    </View>
  )

};

const styles = StyleSheet.create({
  titles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 16,
  },
});
export default Favorites;

