import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

const EachRoute = ({ index, length, textColor, route_color, stop, stop_id, stop_sequence, departure_time }) => {

  return (
    <View style={styles.stopContainer} key={stop_id + stop_sequence}>
      <Text style={styles.textLeft}><Text style={{ color:textColor, ...styles.textLeftWrap }}>{stop.stop_name}</Text></Text>
      <View style={styles.bubbleContainer}>
        <Text style={{ borderColor: `#${route_color}`, ...styles.bubble }}></Text>
        {index !== length - 1 && <Text style={{ backgroundColor: `#${route_color}`, ...styles.bubbleTige }}></Text>}
      </View>
      <Text style={{ color:textColor, ...styles.textRight }}>{moment(departure_time, "HH:mm").format('HH:mm')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  stopContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
  bubbleContainer: {
    textAlign: 'center',
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    width: 15,
    height: 15,
  },
  bubbleTige: {
    height: 20,
    width: 2,
    position: 'absolute',
    top: 15,
  },
  textLeft: {
    textAlign: 'right',
    width: 250,
  },
  textLeftWrap: {
    width: 20,
    fontWeight: 'bold',

  },
  textRight: {
    textAlign: 'left',
    width: 200,
    fontWeight: 'bold',
  },
});

export default EachRoute;
