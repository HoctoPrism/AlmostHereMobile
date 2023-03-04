/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View, StyleSheet, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import LocationGranted from '../../utils/permissions/location';
import {API_TOKEN_METEO} from "@env";

const GetWeather: () => Node = () => {

  const [meteo, setMeteo] = useState(null);

  useEffect(() => {
    LocationGranted().then(res => {
      if (res === "granted") {
        Geolocation.getCurrentPosition(
          async (position) => {
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_TOKEN_METEO}&units=metric&lang=fr`)
              .then((res) => {
                setMeteo(res.data);
              })
              .catch((err) => {
                console.log(err);
              })
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log('not granted');
      }
    });
  }, []);

  return (
    <View>
      {!meteo ? (
        <Text style={styles.meteoko}>Chargement de la météo...</Text>
        ) : (
        <View>
          <Text>Bonjour, voici la météo pour : {meteo.name}</Text>
          <View style={styles.viewMeteo}>
            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${meteo?.weather[0]?.icon}@4x.png`,
              }}
            />
            <View>
              <Text style={[styles.weatherText, styles.temperature]}>{meteo?.main?.temp}°C</Text>
              <Text style={styles.weatherText}>{meteo?.weather[0]?.description}</Text>
            </View>
            <View>
              <Text style={styles.weatherText}>Humidité {meteo?.main?.humidity}%</Text>
              <Text style={styles.weatherText}>Vent {meteo?.wind?.speed} km/h</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )

};

const styles = StyleSheet.create({
  viewMeteo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    height: 75,
    width: 75,
  },
  weatherText: {
    marginLeft: 10,
  },
  temperature: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  meteoko: {
    paddingVertical: 35,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});
export default GetWeather;

