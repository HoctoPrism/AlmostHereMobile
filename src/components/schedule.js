import { TouchableOpacity, View, StyleSheet, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACK_ENDPOINT } from '@env' ;
const Schedule = ({ navigation }) => {

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const theme = useColorScheme() === 'light' ? 'dark-content' : 'light-content';

  const getRoutes = async () => {
    await axios.get(`${BACK_ENDPOINT}/routes/`).then((res) => {
      setRoutes(res.data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <ScrollView testID='schedule_page'>
      <StatusBar backgroundColor={colors.background} barStyle={theme} />
      <View style={{ margin: 20 }}>
        {loading ? (
          <Text>Chargement en cours...</Text>
        ) : (
          <View>
            <Text style={styles.title}>Liste des lignes :</Text>
            <View style={styles.container}>
              {routes.map(({ route_id, route_short_name, route_long_name, route_color, route_desc, route_text_color  }) => {
                return (
                  <TouchableOpacity
                    key={route_id + route_short_name}
                    onPress={() => navigation.navigate(
                      'Route',
                      { route_id, route_short_name, route_long_name, route_color, route_desc, route_text_color }
                    )}
                    style={{
                      backgroundColor: colors.onSecondary,
                      shadowColor: colors.shadow,
                      ...styles.button
                    }}>
                    <View style={styles.buttonContent}>
                      <Text style={{ backgroundColor: `#${route_color}`, ...styles.bubble }} />
                      <Text style={{ fontWeight: "bold", color: colors.onSurface, marginStart: 10 }}>{route_long_name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 10,
    height: 45,
    marginVertical: 5,
    marginRight: 5,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    width: '30%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bubble: {
    width: 10,
    height: "100%",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 10,
    marginBottom: 10,
  },
  statusBar: {
    color: 'blue',
  }
});
export default Schedule;
