import React, {Component, useRef, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';
import getToken from '../api/getToken';

const ScanBarcode = ({route}) => {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [eid, setEid] = useState('');
  const [valid_ticket, setValidTicket] = useState('');
  const [token_storate, setTokenStorate] = useState('true');
  const [name_customer, setNameCustomer] = useState('');
  const [seat, setSeat] = useState('');
  const [checkin_time, setCheckingTime] = useState('');
  const [e_cal, setECal] = useState('');
  let camera = useRef();

  const navigation = useNavigation();
  const {t} = useTranslation();

  let validJXS = <View></View>;

  if (valid_ticket === 'SUCCESS') {
    validJXS = (
      <View style={styles.success}>
        <Text style={styles.valid_text}>V</Text>
      </View>
    );
  } else if (valid_ticket === 'FAIL') {
    validJXS = (
      <View style={styles.fail}>
        <Text style={styles.valid_text}>X</Text>
      </View>
    );
  }

  const seatJXS = seat ? (
    <Text style={styles.label}>
      {t('translations.seat')}: <Text style={styles.value}> {seat}</Text>
    </Text>
  ) : (
    <View></View>
  );

  const customerJXS = name_customer ? (
    <Text style={styles.label}>
      {t('translations.name')}:{' '}
      <Text style={styles.value}> {name_customer}</Text>
    </Text>
  ) : (
    <View></View>
  );

  const checkinJXS = checkin_time ? (
    <Text style={styles.label}>
      {t('translations.checkin')}:{' '}
      <Text style={styles.value}> {checkin_time}</Text>
    </Text>
  ) : (
    <View></View>
  );

  const ecalJXS = e_cal ? (
    <Text style={styles.label}>
      {t('translations.dateandtime')}:{' '}
      <Text style={styles.value}> {e_cal}</Text>
    </Text>
  ) : (
    <View></View>
  );

  const reset = () => {
    setSeat('');
    setECal('');
    setCheckingTime('');
    setNameCustomer('');
    setValidTicket('');
    setTokenStorate('');
  };

  const onBarCodeRead = async event => {
    const token = await AsyncStorage.getItem('@token');
    const url = await AsyncStorage.getItem('@url');
    const eid = JSON.stringify(route.params.eid);

    if (event.data === token_storate) {
    } else if (event.data !== 'null') {
      // Validate Ticket
      fetch(url + 'wp-json/meup/v1/validate_ticket/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          qrcode: event.data,
          eid: eid,
        }),
      })
        .then(res => res.json())
        .then(resjson => {
          if (resjson.status === 'FAIL') {
            Alert.alert(t('translations.fail'), resjson.msg, [
              {
                text: t('translations.continue'),
                onPress: () => reset(),
              },
            ]);
          } else if (resjson.status === 'SUCCESS') {
            Alert.alert(t('translations.success'), resjson.msg, [
              {
                text: t('translations.continue'),
                onPress: () => reset(),
              },
            ]);
          }

          // this.setState({
          //   valid_ticket: resjson.status,
          //   name_customer: resjson.name_customer,
          //   seat: resjson.seat,
          //   checkin_time: resjson.checkin_time,
          //   e_cal: resjson.e_cal,
          // });
          setValidTicket(resjson.status);
          setNameCustomer(resjson.name_customer);
          setSeat(resjson.seat);
          setCheckingTime(resjson.checkin_time);
          setECal(resjson.e_cal);
        })
        .catch(error => {
          alert(t('translations.errorscanagain'));
        });

      setTokenStorate(event.data);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'الإذن لاستخدام الكاميرا',
          message: 'نحتاج للوصول الى الكاميرا لمسح الباركود',
          buttonPositive: 'نعم',
          buttonNegative: 'لا',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'الإذن للوصول الى الميكروفون',
          message: 'نحتاج للوصول لمسجل الصوت',
          buttonPositive: 'نعم',
          buttonNegative: 'لا',
        }}
        onBarCodeRead={onBarCodeRead}>
        <BarcodeMask />
      </RNCamera>

      <View style={styles.result}>
        <View style={styles.result_left}>{validJXS}</View>

        <View style={styles.result_right}>
          {customerJXS}

          {seatJXS}

          {ecalJXS}

          {checkinJXS}
        </View>
      </View>
    </View>
  );
};

// class ScanBarcode extends Component {
//   static navigationOptions = {
//     title: 'مسح الباركود',
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       url: '',
//       token: '',
//       eid: '',
//       valid_ticket: '',
//       token_storate: 'true',
//       name_customer: '',
//       seat: '',
//       checkin_time: '',
//       e_cal: '',
//     };
//   }

//   render() {
//     let validJXS = <View></View>;

//     if (this.state.valid_ticket === 'SUCCESS') {
//       validJXS = (
//         <View style={styles.success}>
//           <Text style={styles.valid_text}>V</Text>
//         </View>
//       );
//     } else if (this.state.valid_ticket === 'FAIL') {
//       validJXS = (
//         <View style={styles.fail}>
//           <Text style={styles.valid_text}>X</Text>
//         </View>
//       );
//     }

//     const seatJXS = this.state.seat ? (
//       <Text style={styles.label}>
//         المقعد: <Text style={styles.value}> {this.state.seat}</Text>
//       </Text>
//     ) : (
//       <View></View>
//     );

//     const customerJXS = this.state.name_customer ? (
//       <Text style={styles.label}>
//         الاسم: <Text style={styles.value}> {this.state.name_customer}</Text>
//       </Text>
//     ) : (
//       <View></View>
//     );

//     const checkinJXS = this.state.checkin_time ? (
//       <Text style={styles.label}>
//         الحجز: <Text style={styles.value}> {this.state.checkin_time}</Text>
//       </Text>
//     ) : (
//       <View></View>
//     );

//     const ecalJXS = this.state.e_cal ? (
//       <Text style={styles.label}>
//         الوقت والتاريخ: <Text style={styles.value}> {this.state.e_cal}</Text>
//       </Text>
//     ) : (
//       <View></View>
//     );

//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'الإذن لاستخدام الكاميرا',
//             message: 'نحتاج للوصول الى الكاميرا لمسح الباركود',
//             buttonPositive: 'نعم',
//             buttonNegative: 'لا',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'الإذن للوصول الى الميكروفون',
//             message: 'نحتاج للوصول لمسجل الصوت',
//             buttonPositive: 'نعم',
//             buttonNegative: 'لا',
//           }}
//           onBarCodeRead={this.onBarCodeRead.bind(this)}>
//           <BarcodeMask />
//         </RNCamera>

//         <View style={styles.result}>
//           <View style={styles.result_left}>{validJXS}</View>

//           <View style={styles.result_right}>
//             {customerJXS}

//             {seatJXS}

//             {ecalJXS}

//             {checkinJXS}
//           </View>
//         </View>
//       </View>
//     );
//   }

//   reset() {
//     this.setState({
//       token_storate: '',
//       valid_ticket: '',
//       name_customer: '',
//       seat: '',
//       checkin_time: '',
//       e_cal: '',
//     });
//   }

//   async onBarCodeRead(event) {
//     const token = await AsyncStorage.getItem('@token');
//     const url = await AsyncStorage.getItem('@url');
//     const eid = JSON.stringify(this.props.route.params.eid);

//     if (event.data === this.state.token_storate) {
//     } else if (event.data !== 'null') {
//       // Validate Ticket
//       fetch(url + 'wp-json/meup/v1/validate_ticket/', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token: token,
//           qrcode: event.data,
//           eid: eid,
//         }),
//       })
//         .then(res => res.json())
//         .then(resjson => {
//           if (resjson.status === 'FAIL') {
//             Alert.alert('فشل', resjson.msg, [
//               {
//                 text: 'متابعة',
//                 onPress: () => this.reset(),
//               },
//             ]);
//           } else if (resjson.status === 'SUCCESS') {
//             Alert.alert('نجاح', resjson.msg, [
//               {
//                 text: 'متابعة',
//                 onPress: () => this.reset(),
//               },
//             ]);
//           }

//           this.setState({
//             valid_ticket: resjson.status,
//             name_customer: resjson.name_customer,
//             seat: resjson.seat,
//             checkin_time: resjson.checkin_time,
//             e_cal: resjson.e_cal,
//           });
//         })
//         .catch(error => {
//           alert('خطأ امسح مجددا');
//         });

//       this.setState({token_storate: event.data});
//     }
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  result: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'flex-start',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  result_left: {
    flex: 1,
    backgroundColor: '#000000',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  result_right: {
    flex: 4,
    backgroundColor: '#000000',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 5,
  },
  success: {
    backgroundColor: '#90ba3e',
    flex: 1,
    width: '100%',
    height: '100%',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fail: {
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
    height: '100%',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valid_text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: '#ccc',
  },
  value: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScanBarcode;
