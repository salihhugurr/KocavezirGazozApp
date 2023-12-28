import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme, wh, ww} from '../helpers';
import CustomHeader from '../components/CustomHeader';
import {FlatList} from 'react-native-gesture-handler';
import {Avatar, Divider} from 'react-native-elements';

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const openGps = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${37.0575518076658},${37.39343528995224}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={{}}>
          <Avatar source={{uri: route.params.logo}} size={'large'} />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            width: '55%',
          }}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.info}>
            Şu an aktif {item.total} kupon bulunmakta.
          </Text>
          <Text style={styles.info}>
            Fiyat: {item.price === 0 ? 'Ücretsiz' : item.price + ' TL'}
          </Text>
        </View>
        <View style={{gap: 10, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => openGps()}>
            <Text style={{fontFamily: theme.semiBold, color: theme.secondary}}>
              Yol Tarifi Al
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Kupon Al</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        left
        leftNavigation={() => navigation.goBack()}
        navigation={navigation}
        title={route.params.title}
      />
      <FlatList
        data={route.params.subItems}
        ItemSeparatorComponent={<Divider width={1} color={theme.secondary} />}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        style={{flex: 1}}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Kuponunuz</Text>
            <Text style={styles.modalText}>A14IOU6346</Text>
            <Pressable
              style={[styles.button2, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Onaylıyorum</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  item: {
    paddingHorizontal: ww(0.03),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wh(0.125),
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontFamily: theme.bold,
    fontSize: ww(0.045),
    maxWidth: '80%',
    color: theme.main,
  },
  info: {
    fontFamily: theme.regular,
    fontSize: ww(0.04),
    color: theme.secondary,
  },
  button: {
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: theme.success,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: ww(0.035),
    fontFamily: theme.semiBold,
    color: theme.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.white,
    borderRadius: 8,
    padding: 35,
    paddingHorizontal: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
