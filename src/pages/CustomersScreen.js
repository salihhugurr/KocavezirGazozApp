import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import {avatarNameGenerator, theme, wh, ww} from '../helpers';
import CustomHeader from '../components/CustomHeader';
import {Avatar, Divider, FAB, Icon, SearchBar} from 'react-native-elements';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetAllCustomers} from '../services/customer';
import {globalStyles} from '../styles';

const CustomersScreen = () => {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  // Initialize originalCustomers with empty array
  const [originalCustomers, setOriginalCustomers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getCustomers = async () => {
        try {
          const res = await GetAllCustomers();
          setCustomers(res.data);
          setOriginalCustomers(res.data); // Store original list of customers
        } catch (error) {
          console.log('Error:', error);
        }
      };
      getCustomers();

      return () => {};
    }, [navigation]), // Add any dependencies here
  );

  const handlePhonePress = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const filteredCustomers = useMemo(() => {
    if (search.length === 0) {
      return originalCustomers; // Return original customers if search text is empty
    } else {
      // Filter the original customers list based on the search text
      return originalCustomers.filter(customer =>
        customer.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
  }, [search, originalCustomers]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('DetailScreen', {
            id: item.id,
          })
        }>
        <View style={{flex: 1}}>
          <Avatar
            title={avatarNameGenerator(item.name)}
            titleStyle={{
              fontFamily: theme.bold,
              fontSize: ww(0.04),
            }}
            rounded
            size={'medium'}
            containerStyle={{backgroundColor: theme.secondary}}
          />
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.info}>{item.customer_name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handlePhonePress(item.phone_number)}
          style={{
            backgroundColor: theme.secondary,
            padding: ww(0.02),
            marginRight: ww(0.03),
            borderRadius: 10,
          }}>
          <Icon name="phone" color={theme.white} size={ww(0.05)} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />

      <SearchBar
        placeholder="Müşteri ara..."
        onChangeText={text => setSearch(text)}
        containerStyle={{backgroundColor: theme.white}}
        platform={Platform.OS}
        searchIcon={() => (
          <Icon
            name="search"
            type="feather"
            color={theme.grey}
            size={ww(0.05)}
            style={{marginLeft: ww(0.02)}}
          />
        )}
        cancelButtonTitle="Vazgeç"
        clearIcon={() => (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon
              name="trash"
              type="feather"
              color={theme.grey}
              size={ww(0.05)}
              style={{marginLeft: ww(0.02)}}
            />
          </TouchableOpacity>
        )}
        value={search}
      />

      <FlatList
        data={filteredCustomers}
        ItemSeparatorComponent={<Divider width={0.5} color={theme.secondary} />}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />

      <View style={styles.fab}>
        <FAB
          placement="right"
          size="small"
          onPress={() => navigation.navigate('AddCustomer')}
          color={theme.secondary}
          icon={{
            name: 'plus',
            type: 'entypo',
            color: 'white',
          }}
        />
      </View>
    </View>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  item: {
    paddingHorizontal: ww(0.03),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wh(0.1),
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: theme.bold,
    fontSize: ww(0.045),
    color: theme.secondary,
  },
  info: {
    marginTop: 5,
    fontFamily: theme.medium,
    fontSize: ww(0.035),
    color: theme.secondary,
  },
  phone: {
    fontSize: ww(0.035),
    fontFamily: theme.medium,
    color: theme.secondary,
  },
  fab: {
    position: 'absolute',
    bottom: wh(0.03),
    right: ww(0.05),
  },
});
