import { StatusBar, useColorScheme, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
export default function Favorite() {

  let { colors } = useTheme();
  const theme = useColorScheme() === 'light' ? 'dark-content' : 'light-content';

  return (
    <View style={{ margin: 20 }}>
      <StatusBar backgroundColor={colors.background} barStyle={theme} />
      <Text>Fav</Text>
    </View>
  );
}
