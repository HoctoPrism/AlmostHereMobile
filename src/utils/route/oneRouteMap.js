/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { MAPTILER_KEY, MAPTILER_MAP, BACK_ENDPOINT } from '@env';
import { useEffect, useState } from 'react';
const OneRouteMap = ({ route, navigation }) => {

  MapLibreGL.setAccessToken(null);
  MapLibreGL.setConnected(true);

  const { colors } = useTheme();
  const theme = useColorScheme() === 'light' ? 'dark-content' : 'light-content';
  const [trip, setTrip] = useState(null);
  const [stopTimes, setStopTimes] = useState(null);
  const [shapes, setShapes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const onDismissSnackBar = () => setVisible(false);

  const { actualRoute, color } = route.params;

  useEffect(() => {
    getTrip();
  }, []);

  const getTrip = async () => {
    await fetch(`${BACK_ENDPOINT}/trips/info/${actualRoute}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        let data = await res.json();
        if (data && typeof data === 'string') {
          setError(true);
        } else {
          await setTrip(data);
          await setStopTimes(data?.stop_times);
          let coordinates = [];
          data?.shape.map((shape) => {
            shape.shape_pt_lat = Number(shape.shape_pt_lat);
            shape.shape_pt_lon = Number(shape.shape_pt_lon);
            coordinates.push([shape.shape_pt_lon, shape.shape_pt_lat]);
          });
          await setShapes({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={colors.background} barStyle={theme} />
        {loading ? (
          <Text>Une erreur est survenue :(</Text>
        ) : (
          <MapLibreGL.MapView
            style={styles.map}
            logoEnabled={false}
            styleURL={`https://api.maptiler.com/maps/${MAPTILER_MAP}/style.json?key=${MAPTILER_KEY}`}
          >
            <MapLibreGL.Camera
              zoomLevel={11.35}
              maxZoomLevel={16}
              minZoomLevel={3}
              centerCoordinate={[3.0916, 45.7661]}
              coordinate={[3.0916, 45.7661]}
            />
            <MapLibreGL.ShapeSource id="shape-source" shape={shapes}>
              <MapLibreGL.LineLayer
                id="shape-layer"
                style={{
                  lineColor: `#${color}`,
                  lineWidth: 2,
                  lineJoin: 'round',
                  lineCap: 'round',
                }}
              />
            </MapLibreGL.ShapeSource>
            {stopTimes && stopTimes.map(({stop}) => (
              <MapLibreGL.PointAnnotation
                key={`${stop.stop_id}${stop.stop_sequence}`}
                id={`${stop.stop_id}${stop.stop_sequence}`}
                coordinate={[Number(stop.stop_lon), Number(stop.stop_lat)]}
                draggable={false}
                onSelected={() => {
                  setSelected({
                    stop_name: stop.stop_name,
                    ligne: `${trip.route.route_long_name}`,
                  })
                }}
                onDeselected={() => {setSelected(null)}}
              >
                <View
                  nativeID={`${stop.stop_id}${stop.stop_sequence}`}
                  style={{
                    height: 15,
                    width: 15,
                    backgroundColor: colors.onSecondary,
                    borderRadius: 50,
                    borderColor: `#${color}`,
                    borderWidth: 3,
                  }}
                />
              </MapLibreGL.PointAnnotation>
            ))}
          </MapLibreGL.MapView>
        )}
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        Une erreur est survenue :(
      </Snackbar>
      {selected && (
        <View style={{
          position: 'absolute',
          bottom: -50,
          left: 0,
          right: 0,
          height: 50,
          width: "100%",
          transform: [{ translateY: -50 }],
          backgroundColor: colors.onSecondary,
          borderTopWidth: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderTopColor: `#${color}`,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: colors.onPrimary }}>{selected.ligne} : {selected.stop_name}</Text>
        </View>
      )}
    </View>
  )

};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  }
});
export default OneRouteMap;
