import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'sfa_sales.db'});

const App = () => {
  const [addProduct, setAddProduct] = useState(true);
  const [scannProduct, setScannProduct] = useState(true);
  const [scanNeeded, setScanNeeded] = useState(false);

  /*
  product entry information
  */
  const [itemCode, setItemCode] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);

  useEffect(() => {
    LottieSplashScreen.hide(); // here
    creatDb();
  }, []);

  const creatDb = async () => {
    db.transaction(function (tx) {
      tx.executeSql('DROP TABLE IF EXISTS tbl_product', []);
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tbl_product (id INTEGER PRIMARY KEY AUTOINCREMENT, item_code VARCHAR(20), item_description VARCHAR(20), item_price INT(10))',
        [],
      );
    });
  };

  const _addProduct = async () => {
    setAddProduct(false);
    setScannProduct(true);
  };
  const scanBarcode = () => {
    setScannProduct(false);
    setScanNeeded(true);
  };

  const saveProduct = () => {
    if (itemCode !== null && itemDescription !== null && itemPrice !== null) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO tbl_product (item_code, item_description, item_price) VALUES (?,?,?)',
          [itemCode, itemDescription, itemPrice],
          (res, results) => {
            if (results.rowsAffected > 0) {
              setItemCode(null);
              setItemDescription(null);
              setItemPrice(null);

              Alert.alert('Success', 'New Product Added Successfully', [
                {text: 'OK', onPress: () => setAddProduct(0)},
              ]);
            }
          },
        );
      });
    } else {
      Alert.alert('Please Enter All Values');
    }
  };

  const onSuccessQR = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
    setAddProduct(false);
    setScannProduct(true);
  };
  return (
    <View style={styles.container}>
      {/* Add New Product [START] */}
      {addProduct ? (
        <>
          <TouchableOpacity style={styles.loginBtn} onPress={_addProduct}>
            <Text style={styles.loginText}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={scanBarcode}>
            <Text style={styles.loginText}>Scan Product</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Item Code"
              placeholderTextColor="#003f5c"
              onChangeText={code => setItemCode(code)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Item Description"
              placeholderTextColor="#003f5c"
              onChangeText={description => setItemDescription(description)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Item Price"
              placeholderTextColor="#003f5c"
              keyboardType="numeric"
              onChangeText={price => setItemPrice(price)}
            />
          </View>
          <TouchableOpacity style={styles.saveBtn} onPress={saveProduct}>
            <Text style={styles.loginText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => setAddProduct(true)}>
            <Text style={styles.loginText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
      {/* Add New Product [END] */}

      {/* Scan Product [START] */}
      {scannProduct ? (
        <></>
      ) : (
        <>
          <QRCodeScanner
            onRead={onSuccessQR}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
              <Text style={styles.centerText}>
                Go to{' '}
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
                on your computer and scan the QR code.
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        </>
      )}

      {/* Scan Product [END] */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FF1493',
  },
  saveBtn: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FF1493',
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default App;
