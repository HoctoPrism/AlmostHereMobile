import { Pressable, ScrollView, StatusBar, useColorScheme, View, StyleSheet, Keyboard } from 'react-native';
import { Text, useTheme, TextInput, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { useRef, useState } from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { MAPTILER_KEY, MAPTILER_MAP, BACK_ENDPOINT } from '@env';
export default function Itineraire() {

  MapLibreGL.setAccessToken(null);
  MapLibreGL.setConnected(true);

  const [data, setData] = useState(null);
  const [stops, setStops] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startPoint, setStartPoint] = useState(undefined);
  const [destination, setDestinationPoint] = useState(undefined);
  const [cities, setCities] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [searchingItinary, setSearchItinary] = useState(false);

  const inputRef = useRef(null);

  const { colors } = useTheme();
  const theme = useColorScheme() === 'light' ? 'dark-content' : 'light-content';

  const getCitySearch = async (value, message) => {
    try {
      if (value.length >= 3) {
        let res = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURI(
            value,
          )}&country=France&limit=3&format=json&apiKey=${process.env.GEOAPIFY_KEY}`,
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          },
        );
        if (res.status === 200) {
          let dirtyArray = res.data.results;
          let storedArray = [];
          dirtyArray.map(item => {
            storedArray = [
              ...storedArray,
              {
                name: item.formatted,
                lat: item.lat,
                lon: item.lon,
                id: `${item.city}, ${item.state}`,
                message: message
              },
            ];
          });
          setCities(storedArray);
          setMessage(message);
        }
      } else {
        console.error('une erreur est survenue');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setParams = async (item) => {
    if (item.message === 'start') {
      setStartPoint(item);
    } else {
      setDestinationPoint(item);
    }
    inputRef.current.blur();
    setCities(undefined);
  };

  const getResult = async (start, destination) => {
    try {
      let res = await axios.get(`${BACK_ENDPOINT}/itinary/${start.lat}/${start.lon}/${destination.lat}/${destination.lon}/`);
      if (res.status === 200) {
        if (res.data && typeof res.data === 'string') {
          console.log('soucis de parse');
          return getResult(start, destination);
        } else {
          let test = Object.entries(await res.data);
          let coordinates = [];
          let shapes = [];
          let arrayOfGeoJson = [];

          coordinates.push({'color': `#000`, 'text': 'départ', 'cood': [start.lon, start.lat]});
          coordinates.push({'color': `#000`, 'text': 'arrivé', 'cood': [destination.lon, destination.lat]});

          test.map((item) => {
            shapes.push({
              "route_name": item[1].route_long_name,
              "color": `#${item[1].end_point.route_color}`,
              "shapes": item[1].shapes
            });
            item[1].start_point.stop_lat = Number(item[1].start_point.stop_lat);
            item[1].start_point.stop_lon = Number(item[1].start_point.stop_lon);
            item[1].end_point.stop_lat = Number(item[1].end_point.stop_lat);
            item[1].shapes.map((shape) => {
            item[1].end_point.stop_lon = Number(item[1].end_point.stop_lon);
              shape[0] = Number(shape[0]);
              shape[1] = Number(shape[1]);
            })
            coordinates.push({'color': `#${item[1].end_point.route_color}`, 'text': item[1].start_point.stop_name,'cood': [item[1].start_point.stop_lon, item[1].start_point.stop_lat]});
            coordinates.push({'color': `#${item[1].end_point.route_color}`, 'text': item[1].end_point.stop_name,'cood': [item[1].end_point.stop_lon, item[1].end_point.stop_lat]});
          })
          if (shapes) {
            shapes.map((shape) => {
              arrayOfGeoJson.push({
                  type: "Feature",
                  geometry: {
                      type: "LineString",
                      coordinates: shape.shapes
                  },
                  properties: {
                      color: shape.color,
                  }
              })
            })
          }
          setStops(coordinates)
          await setData({
            type: "FeatureCollection",
            features: arrayOfGeoJson
          })
          setCities(undefined);
          setSearchItinary(false);
          setLoading(false);
        }
      } else {
        console.error('une erreur est survenue');
      }
    } catch (error) {
      console.log(error);
      return getResult(start, destination);
    }
  };

  return (
    <View style={{height: '100%'}}>
      <StatusBar backgroundColor={colors.background} barStyle={theme} />
      <View style={styles.topContainer}>
        <View style={styles.itinary}>

          <TextInput
            style={styles.input}
            mode={'outlined'}
            ref={inputRef}
            onChangeText={value => {
              getCitySearch(value, 'start');
              setLoading(true);
            }}
            value={startPoint}
            label={startPoint !== undefined ? startPoint.name : "Veuillez saisir un point de départ..."}
          />

          {cities !== undefined && message === 'start'
            ? <View style={{ backgroundColor: colors.background,...styles.buttonSubmitStart}}>
              {cities.map(item => {
              return (
                <Pressable
                  key={item.name + item.lat}
                  style={{ backgroundColor: colors.inverseOnSurface, ...styles.buttonSubmit }}
                  onPress={() => {
                    setParams(item);
                    Keyboard.dismiss();
                  }}>
                  <Text style={{ color: colors.primary }}>{item.name}</Text>
                </Pressable>
              );
            })}
            </View>
          : null}

          <TextInput
            style={styles.input}
            mode={'outlined'}
            ref={inputRef}
            onChangeText={value => {
              getCitySearch(value, 'end');
              setLoading(true);
            }}
            value={destination}
            label={destination !== undefined ? destination.name : "Veuillez saisir un point d'arrivée..."}
          />

          {cities !== undefined && message === 'end'
            ? <View style={{ backgroundColor: colors.background,...styles.buttonSubmitEnd}}>
              {cities.map(item => {
              return (
                <Pressable
                  key={item.name + item.lat}
                  style={{ backgroundColor: colors.inverseOnSurface , ...styles.buttonSubmit }}
                  onPress={() => {
                    setParams(item);
                    Keyboard.dismiss();
                  }}>
                  <Text style={{ color: colors.primary }}>{item.name}</Text>
                </Pressable>
              );
            })}
            </View>
          : null}
            <View>
              <Pressable
                style={{ backgroundColor: !startPoint && !destination ? colors.secondary : colors.primary, ...styles.buttonSearch }}
                disabled={!startPoint && !destination}
                onPress={() => {
                  setSearchItinary(true);
                  getResult(startPoint, destination);
                }}>
                {searchingItinary ?
                  <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: colors.onSecondary }}>Recherche en cours...</Text>
                    <ActivityIndicator animating={true} size="small" color={colors.onSecondary} />
                  </View>
                  : <Text style={{ color: colors.onSecondary, textAlign: 'center' }}>Rechercher</Text>
                }
              </Pressable>
            </View>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL={`https://api.maptiler.com/maps/${MAPTILER_MAP}/style.json?key=${MAPTILER_KEY}`}
        >
          <MapLibreGL.Camera
            zoomLevel={11.35}
            maxZoomLevel={15}
            minZoomLevel={1}
            centerCoordinate={[3.0916, 45.7661]}
            coordinate={[3.0916, 45.7661]}
          />
          {!loading ? (
            <>
              <MapLibreGL.ShapeSource id={`itinary`} shape={data}>
                <MapLibreGL.LineLayer
                  id={`shapes`}
                  style={{
                    lineColor: ['get', 'color'],
                    lineWidth: 2,
                    lineJoin: 'round',
                    lineCap: 'round',
                  }}
                />
              </MapLibreGL.ShapeSource>
              {stops && stops.map(({ color, cood, text }, index) => {
                return (
                  <MapLibreGL.PointAnnotation
                    key={`${index}-${cood}`}
                    id={`${index}-${cood}`}
                    coordinate={cood}
                    draggable={false}
                  >
                    <View style={{ borderColor: color, ...styles.pointAnnotation }}/>
                  </MapLibreGL.PointAnnotation>
                )})}
            </>
          ) : null}
        </MapLibreGL.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itinary: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 200,
  },
  input: {
    width: '90%',
    marginTop: 10,
    position: 'relative',
  },
  buttonSubmit: {
    width: '90%',
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    position: 'relative',
  },
  buttonSearch: {
    width: 200,
    borderRadius: 5,
    marginTop: 15,
    padding: 10,
  },
  buttonSubmitStart: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 75,
    zIndex: 850,
    width: '100%',
    height: '100%',
  },
  buttonSubmitEnd: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 135,
    zIndex: 850,
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pointAnnotation: {
    height: 15,
    width: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 3
  }
});
