import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';

const TopBar = ({ navigation, route_color, route_text_color, start, end, nextItem, prevItem, changeWay, changeTime, displayDate, actualRoute }) => {

  const { colors } = useTheme();
  const [datepickerShown, setDatepickerShown] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  return (
    <View>
      <View style={styles.topBar}>

        <TouchableWithoutFeedback onPress={() => prevItem()}>
          <View style={styles.itemContainer}>
            <Ionicons name="arrow-back-outline" size={25} color={colors.onPrimary} />
            <Text style={{ color: colors.onPrimary }}>Précédent</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('OneRouteMap', {actualRoute: actualRoute, color: route_color})}
        >
          <View style={styles.itemContainer}>
            <Ionicons name="map-outline" size={25} color={colors.onPrimary} />
            <Text style={{ color: colors.onPrimary }}>Voir</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={styles.itemContainer}>
            <Ionicons name="heart-outline" size={25} color={colors.onPrimary} />
            <Text style={{ color: colors.onPrimary }}>Favoris</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setDatepickerShown(true) }>
          <View style={styles.itemContainer}>
            <Ionicons name="time-outline" size={25} color={colors.onPrimary} />
            <Text style={{ color: colors.onPrimary }}>{start}h à {end}h</Text>
            {displayDate !== 'auj' && <Text style={{ color: colors.onPrimary, fontSize: 12 }}>{displayDate}</Text>}
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => nextItem()}>
          <View style={styles.itemContainer}>
            <Ionicons name="arrow-forward-outline" size={25} color={colors.onPrimary} />
            <Text style={{ color: colors.onPrimary }}>Suivant</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>

      <View style={styles.directionContainer}>
        <TouchableHighlight style={{ borderRadius: 15 }} onPress={() => changeWay()}>
          <Surface style={{ backgroundColor: `#${route_color}`, ...styles.direction }}>
            <Ionicons name="swap-horizontal-outline" size={25} color={`#${route_text_color}`} />
            <Text style={{ color: `#${route_text_color}`, marginStart: 10 }}>Direction</Text>
          </Surface>
        </TouchableHighlight>
      </View>

      <DatePicker
        modal
        open={datepickerShown}
        date={date}
        mode='datetime'
        locale='fr-FR'
        title='Choisissez une date et une heure'
        is24hourSource="locale"
        theme='auto'
        textColor={colors.onPrimary}
        androidVariant='nativeAndroid'
        onConfirm={(date) => {
          setDate(date)
          changeTime(date)
          setDatepickerShown(false)
        }}
        onCancel={() => {
          setDatepickerShown(false)
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  directionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  direction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 15,
    elevation: 5,
    width: 150,
  }
});

export default TopBar;
