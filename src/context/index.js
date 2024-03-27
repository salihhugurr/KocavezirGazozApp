import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check AsyncStorage for user data on component mount
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error getting user data from AsyncStorage:', error);
      }
    };
    getUserData();
  }, []);

  const login = async userData => {
    setUser(userData);
    // Store user data in AsyncStorage
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data in AsyncStorage:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    // Remove user data from AsyncStorage on logout
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export {AuthProvider, useAuth};
