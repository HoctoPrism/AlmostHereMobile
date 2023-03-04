import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import TopBar from '../../utils/menu/topBar';
import ListRoutes from '../../utils/route/listRoutes';
import {BACK_ENDPOINT} from "@env";
const Route = ({ route, navigation }) => {

  const { route_id, route_short_name, route_long_name, route_color, route_desc, route_text_color } = route.params;
  const [firstDirection, setFirstDirection] = useState(null);
  const [secondDirection, setSecondDirection] = useState(null);
  const [thisRoute, setThisRoute] = useState(null);
  const [way, setWay] = useState(0);
  const [indexLoop, setIndexLoop] = useState(0);
  const [length, setLength] = useState(0);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [choosedTime, setChoosedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noTravel, setNoTravel] = useState(false);

  const { colors } = useTheme();

  const getRouteInfo = async () => {
    setError(false);
    navigation.setOptions({
      title: route_long_name,
      headerStyle: {
        backgroundColor: `#${route_color}`,
      },
      headerTintColor: `#${route_text_color}`,
      headerTitleStyle: { fontSize: 18 },
    })

    await fetch(`${BACK_ENDPOINT}/routes/info/${route_id}`, {
        body: JSON.stringify({ 'time': choosedTime }),
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
          console.log('soucis de parse');
        } else {

          const routes = data.data?.trips;
          let firstDirection = [];
          let secondDirection = [];

          setDate(data.date);
          setStartTime(data.startTime);
          setEndTime(data.endTime);

          if (routes != null && routes.length > 0) {
            routes.map((trip) => {
              if (trip.direction_id === 0) {
                firstDirection = [...firstDirection, trip];
              } else {
                secondDirection = [...secondDirection, trip];
              }
            })
            setFirstDirection(firstDirection);
            setSecondDirection(secondDirection);
            setLoading(false);
          } else {
            setNoTravel(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true)
        return getRouteInfo(); // retry
      });
  };

  useEffect(() => {
    getRouteInfo();
  }, [choosedTime]);
  const nextItem = async () => {
    if (indexLoop + 1 < length) {
      setIndexLoop(indexLoop + 1);
    }
  }
  const prevItem = async () => {
    if (indexLoop > 0) {
      setIndexLoop(indexLoop - 1);
    }
  }
  const currentItem = async (item) => {
    setLength(item);
  }
  const changeWay = async () => {
    if (way) {
      setWay(0);
    } else {
      setWay(1);
    }
  }
  const changeTime = async (datetime) => {
    setChoosedTime(datetime);
    if (datetime){
      await getRouteInfo();
    }
  }
  const actualRoute = async (route) => {
    await setThisRoute(route);
  }

  return (
    <ScrollView>
      <StatusBar backgroundColor={`#${route_color}`} barStyle="light-content"/>
      <TopBar
        route_color={route_color}
        route_text_color={route_text_color}
        start={startTime}
        end={endTime}
        displayDate={date}
        nextItem={nextItem}
        prevItem={prevItem}
        changeWay={changeWay}
        changeTime={changeTime}
        actualRoute={thisRoute}
        navigation={navigation}
      />
      <View style={{ margin: 20 }}>
        {loading && (firstDirection == null && secondDirection == null) ? (
          error ? (
            <Text>Une erreur est survenue :(</Text>
          ) : noTravel ? (
            <Text>Aucun voyage n'est prévu pour cette ligne maintenant</Text>
          ) : (
            <Text>Chargement en cours...</Text>
          )
        ) : (
          <ListRoutes
            firstDirection={firstDirection}
            secondDirection={secondDirection}
            route_color={route_color}
            way={way}
            indexLoop={indexLoop}
            textColor={colors.onPrimary}
            route_long_name={route_long_name}
            navigation={navigation}
            currentItem={currentItem}
            thisRoute={actualRoute}
          />
        )}
      </View>
    </ScrollView>
  );

}

export default Route;

const styles = StyleSheet.create({});
