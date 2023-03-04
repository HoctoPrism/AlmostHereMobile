import { StyleSheet, View } from 'react-native';
import EachRoute from './eachRoute';

const ListRoutes = ({ firstDirection, secondDirection, way, indexLoop, route_color, textColor, route_long_name, navigation, currentItem, thisRoute }) => {
  return (
    <View>
      {way === 0 ? firstDirection?.map(({ trip_id, trip_headsign, direction_id, shape_id, stop_times }, index, {length}) => {
        navigation.setOptions({ title: `${route_long_name} - ${trip_headsign}` });
        if (index === indexLoop){
          currentItem(length);
          thisRoute(trip_id);
          return <View key={trip_id + shape_id}>
            {stop_times.map(({ stop_id, stop, departure_time, stop_sequence }, index, {length}) => {
              return <EachRoute
                key={ stop_id + stop_sequence }
                index={index}
                stop_id={stop_id}
                stop={stop}
                departure_time={departure_time}
                stop_sequence={stop_sequence}
                length={length}
                route_color={route_color}
                textColor={textColor}
              />
            })}
          </View>
        }
      }) : secondDirection?.map(({ trip_id, trip_headsign, direction_id, shape_id, stop_times }, index, {length}) => {
        navigation.setOptions({ title: `${route_long_name} - ${trip_headsign}` });
        if (index === indexLoop){
          currentItem(length);
          thisRoute(trip_id);
          return <View key={trip_id + shape_id}>
            {stop_times.map(({ stop_id, stop, departure_time, stop_sequence }, index, {length}) => {
              return <EachRoute
                key={ stop_id + stop_sequence }
                index={index}
                stop_id={stop_id}
                stop={stop}
                departure_time={departure_time}
                stop_sequence={stop_sequence}
                length={length}
                route_color={route_color}
                textColor={textColor}
              />
            })}
          </View>
        }
      })}
    </View>
  )
}

const styles = StyleSheet.create({});

export default ListRoutes;
