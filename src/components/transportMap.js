/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {MAPTILER_KEY,MAPTILER_MAP,BACK_ENDPOINT} from '@env';
import { useEffect, useState } from 'react';
const TransportMap: () => Node = () => {

  MapLibreGL.setAccessToken(null);
  MapLibreGL.setConnected(true);

  const { colors } = useTheme();
  const theme = useColorScheme() === 'light' ? 'dark-content' : 'light-content';
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trips, setTrips] = useState(false);
  const [params, setParams] = useState([11821953316814881, 11821953316814884, 11821953316814888]);
  let shapes = [];
  let stops = [];

  useEffect(() => {
    getMaps();
  });

  const getMaps = async () => {
    await fetch(`${BACK_ENDPOINT}/trips/info/maps`, {
        body: JSON.stringify({ "routes": [11821953316814881, 11821953316814884, 11821953316814888] }),
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
    .then(async (res) => {
        let data = await res.json();
        if (data && typeof data.data === 'string') {
          setError(true);
        } else {
          let coordinates = [];
          await setTrips(data);
          params.map((param) => {
            data.map((trip) => {
              if (param === trip.route_id){
                console.log(trip);
                let shape = trip.shape;
                shape.map((one) => {

                    one.shape_pt_lat = Number(one.shape_pt_lat);
                    one.shape_pt_lon = Number(one.shape_pt_lon);
                    coordinates.push([one.shape_pt_lon, one.shape_pt_lat]);

                });
                shapes.push({
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: coordinates,
                  },
                });
              }
            });
          });
          console.log(shapes);
          await setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true)
      });

  }


  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={colors.background} barStyle={theme} />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
          <MapLibreGL.MapView
              style={styles.map}
              logoEnabled={false}
              styleURL={`https://api.maptiler.com/maps/${MAPTILER_MAP}/style.json?key=${MAPTILER_KEY}`}
            >
              <MapLibreGL.Camera
                zoomLevel={11.35}
                maxZoomLevel={15}
                minZoomLevel={3}
                centerCoordinate={[3.08748, 45.77332]}
                coordinate={[3.08748, 45.77332]}
              />
            {shapes.map((shape, index) => (
              <MapLibreGL.ShapeSource id={`shape-source-${index}`} shape={shape}>
                <MapLibreGL.LineLayer
                  id={`shape-layer-${index}`}
                  style={{
                    lineColor: '#3ab7c2',
                    lineWidth: 2,
                    lineJoin: 'round',
                    lineCap: 'round',
                  }}
                />
              </MapLibreGL.ShapeSource>
            ))}
          </MapLibreGL.MapView>
        )}
      {selected && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          width: "100%",
          backgroundColor: colors.onSecondary,
          borderTopWidth: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderColor: colors.onSecondary,
          borderTopColor: '#3ab7c2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: colors.onPrimary }}>test</Text>
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
export default TransportMap;
