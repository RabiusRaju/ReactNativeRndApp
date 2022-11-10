import React, {useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  alert,
} from 'react-native';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import {
  writeFile,
  readFile,
  DownloadDirectoryPath,
  read,
} from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';

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

  const importData = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      //get user's file paths from react-native-fs
      // setDownloadsFolder(RNFS.DownloadDirectoryPath);
      // setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
      // setExternalDirectory(RNFS.ExternalStorageDirectoryPath)

      readFile(res[0].uri, 'ascii')
        .then(res => {
          const wb = XLSX.read(res, {type: 'binary'});
          //const wsname = wb.SheetNames[0];

          for (let j = 0; j < wb.SheetNames.length; j++) {
            const ws = wb.Sheets[wb.SheetNames[j]];
            //console.log('Sheets Names:: ' + wb.SheetNames.length);
            const data = XLSX.utils.sheet_to_json(ws, {header: 1});
            var temp = [];
            for (let i = 0; i < data.length; i++) {
              temp.push({
                id: data[i][0],
                name: data[i][1],
                secret: data[i][2],
                algorithm: data[i][3],
                digits: data[i][4],
              });
            }
            console.log(wb.SheetNames[j] + ' ::: ' + JSON.stringify(temp));
            //alert('Import data res ->' + JSON.stringify(temp));
          }
        })
        .catch(e => {
          console.log('Error read file', e);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
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
      <Button style={styles.btnLgin} onPress={importData} title="Login" />
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
