import {Alert, Linking} from 'react-native';
import {removeSpaces} from './removeSpaces';

export const callPhone = (phoneNumber: string) => {
  const phoneUrl = `tel:+9${removeSpaces(phoneNumber)}`;

  Linking.canOpenURL(phoneUrl)
    .then(supported => {
      if (!supported) {
        Alert.alert(
          `Bu cihazda ${phoneNumber} numarası için telefon araması desteklenmiyor`,
        );
      } else {
        return Linking.openURL(phoneUrl);
      }
    })
    .catch(error => console.error('An error occurred:', error));
};
