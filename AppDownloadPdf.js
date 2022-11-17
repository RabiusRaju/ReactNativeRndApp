import React, {useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import LottieSplashScreen from 'react-native-lottie-splash-screen';

const App = () => {
  const [userId, onChangeUserId] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  useEffect(() => {
    LottieSplashScreen.hide(); // here
  }, []);

  const actualDownload = () => {
    const {dirs} = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `Raju8121.pdf`,
        path: `${dirs.DownloadDir}/Raju8121.pdf`,
      },
    })
      .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
      .then(res => {
        console.log('The file saved to ', res.path());
      })
      .catch(e => {
        console.log(e);
      });
  };

  const downloadFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
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
      <Button style={styles.btnLgin} onPress={downloadFile} title="Login" />
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
