import React, {useEffect} from 'react';
import {SafeAreaView, TextInput, StyleSheet, Button, Alert} from 'react-native';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import DeviceInfo from 'react-native-device-info';

import axios from 'axios';
const App = () => {
  const [userId, onChangeUserId] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  useEffect(() => {
    LottieSplashScreen.hide(); // here
  }, []);

  const onPressLogin = async () => {
    // console.log('raju');
    DeviceInfo.getAndroidId().then(androidId => {
      console.log('device :' + androidId);

      const apiLink = 'http://192.20.10.141/rest_api/';
      const params = {
        userId: userId,
        password: password,
        deviceId: androidId,
      };

      axios
        .post(apiLink, params, {
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then(function (response) {
          Alert.alert('Welcome :: ' + JSON.stringify(response.data));
        })

        .catch(function (error) {
          console.log('Error ::' + error);
        });
    });
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.inputUserId}
        onChangeText={onChangeUserId}
        value={userId}
        placeholder="Enter User Id"
        keyboardType="text"
      />
      <TextInput
        style={styles.inputPassword}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        keyboardType="numeric"
      />
      <Button style={styles.btnLgin} onPress={onPressLogin} title="Login" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputUserId: {
    height: 40,
    margin: 12,
    marginTop: 60,
    borderWidth: 1,
    padding: 10,
  },
  inputPassword: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btnLgin: {
    height: 80,
    width: 20,
    margin: 12,
    padding: 10,
  },
});
export default App;
