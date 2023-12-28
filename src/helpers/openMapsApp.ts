import {Alert, Linking} from 'react-native';

export const openMapsApp = (latitude: any, longitude: any) => {
  // Harita uygulamasını açmak için bir URL oluştur
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  // Harita uygulamasını açmak için kullanıcının izni gerekebilir
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert('Harita uygulaması açılamıyor.');
      }
    })
    .catch(err => console.error('Hata:', err));
};
