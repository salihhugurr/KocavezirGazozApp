import {View, StyleSheet, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {theme, wh, ww} from '../helpers';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context';
import {Button, Input} from 'react-native-elements';
import {globalStyles} from '../styles';

const Login = () => {
  const navigation = useNavigation();
  const {login} = useAuth();
  const [userName, setUserName] = useState('admin');
  const [password, setPassword] = useState('admin');
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    if (userName === 'admin' && password === 'admin') {
      login({username: 'Yönetici', role: 'admin'});
    } else if (userName === 'user' && password === 'user') {
      login({username: 'Satış', role: 'user'});
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.jpeg')}
        style={{width: ww(0.3), height: ww(0.3), marginTop: wh(0.2)}}
      />
      <Input
        ref={usernameRef}
        autoCapitalize="none"
        label="Kullanıcı Adı"
        labelStyle={{color: '#03002E', opacity: 0.4}}
        placeholder="Kullanıcı adınızı girin..."
        value={userName}
        defaultValue="admin"
        style={globalStyles.input}
        containerStyle={{marginTop: wh(0.1)}}
        placeholderTextColor={theme.grey}
        onSubmitEditing={() => passwordRef.current.focus()}
        onChangeText={text => setUserName(text)}
      />
      <Input
        ref={passwordRef}
        label="Şifre"
        secureTextEntry
        labelStyle={{color: '#03002E', opacity: 0.4}}
        placeholder="Şifrenizi girin..."
        value={password}
        defaultValue="admin"
        style={globalStyles.input}
        placeholderTextColor={theme.grey}
        onSubmitEditing={handleLogin}
        onChangeText={text => setPassword(text)}
      />
      <Button
        title="Giriş Yap"
        onPress={handleLogin}
        titleStyle={{fontFamily: theme.medium}}
        placeholderTextColor={theme.grey}
        buttonStyle={styles.saveButton}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    padding: 16,
    alignItems: 'center',
  },
  saveButton: {
    width: ww(0.8),
    marginTop: 20,
    backgroundColor: theme.secondary, // Use your desired button color
  },
});
