import { PermissionsAndroid } from 'react-native';

const LocationGranted = async () => {

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'AlmostHere Geolocation Permission',
      message:
        'AlmostHere needs an access to your position ' +
        'so you can use the weather widget',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return "granted";
  } else {
      return "denied";
  }

}

export default LocationGranted;
