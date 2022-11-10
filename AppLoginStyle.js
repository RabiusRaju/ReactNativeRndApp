import React, {useEffect} from 'react';
import {
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import {NativeBaseProvider, Button, Checkbox} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';

import LottieSplashScreen from 'react-native-lottie-splash-screen';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Entypo';
import OutlineInput from 'react-native-outline-input';

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
    /*Container Start*/
    <NativeBaseProvider>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1, backgroundColor: '#ffffff'}}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('./src/images/bg_login.jpeg')}
          style={{
            height: Dimensions.get('window').height / 2.5,
          }}>
          <View style={styles.brandView}>
            <Icon name="location" size={100} color="#ffffff" />
            <Text style={styles.brandViewText}>Vision Go</Text>
          </View>
        </ImageBackground>

        {/* Bottom View */}
        <View style={styles.bottomView}>
          {/* Welcome View */}
          <View style={{padding: 40}}>
            <Text style={{color: '#4632A1', fontSize: 34}}>Welcome</Text>
            <Text>
              Don`t have an account?
              <Text style={{color: 'red', fontFamily: 'italic'}}>
                {'  '}
                Register now
              </Text>
            </Text>

            {/* Form Input View */}
            <View style={{marginTop: 50}}>
              <SafeAreaView>
                <OutlineInput
                  value={userId}
                  //onChangeText={(e: string) => setEmail(e)}
                  label="User Id"
                  activeValueColor="#6c63fe"
                  activeBorderColor="#6c63fe"
                  activeLabelColor="#6c63fe"
                  passiveBorderColor="#bbb7ff"
                  passiveLabelColor="#bbb7ff"
                  passiveValueColor="#bbb7ff"
                />

                <Text>{''} </Text>

                <OutlineInput
                  value={password}
                  //onChangeText={(e: string) => setPassword(e)}
                  label="Password"
                  activeValueColor="#6c63fe"
                  activeBorderColor="#6c63fe"
                  activeLabelColor="#6c63fe"
                  passiveBorderColor="#bbb7ff"
                  passiveLabelColor="#bbb7ff"
                  passiveValueColor="#bbb7ff"
                />
              </SafeAreaView>
            </View>

            {/* Forgot Password & Rember Me View */}

            <View style={styles.forgotPassView}>
              <View style={{flex: 1}}>
                <Grid>
                  <Col>
                    <Row>
                      <Col style={{width: 30}}>
                        <Checkbox checked={true} color="red" />
                      </Col>
                      <Col>
                        <Text>Remember Me</Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col style={{marginLeft: 40}}>
                        <Text style={{fontSize: 12, color: 'red'}}>
                          Forgot Password
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Grid>
              </View>
            </View>

            {/* Login Button */}
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button style={styles.loginBtn}>
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                  Login
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  forgotPassView: {
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
  },
  loginBtn: {
    width: 150,
    marginTop: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#4632A1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
export default App;
