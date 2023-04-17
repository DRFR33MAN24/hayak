import React, {Component, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../locales/index';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import checkLogin from '../api/checkLogin';
import getToken from '../api/getToken';
import LoginApi from '../api/LoginApi';

const url = 'https://hayak.to/';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  const _validate = () => {
    if (user == '') {
      alert(t('translations.enteruser'));
      return false;
    }

    if (pass == '') {
      alert(t('translations.enterpassword'));
      return false;
    }
  };

  const _onLogin = async () => {
    _validate();

    await LoginApi(url, user, pass)
      .then(resjson => {
        if (resjson.status === 'SUCCESS' && saveToStorage(resjson.token)) {
          alert(resjson.msg);
          navigation.navigate('المناسبات');
        } else if (resjson.status === 'FAIL') {
          alert(resjson.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const saveToStorage = async token => {
    if (token) {
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@isLoggedIn', '1');
      await AsyncStorage.setItem('@url', url);

      return true;
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      {/* <TextInput
          style={styles.input}
          placeholder="رابط المنصة"
          onChangeText={url => this.setState({url})}
          autoCapitalize="none"
          value={url}
          placeholderTextColor="#666666"
        /> */}

      <TextInput
        style={styles.input}
        placeholder={t('translations.username')}
        autoCapitalize="none"
        onChangeText={user => setUser(user)}
        value={user}
        placeholderTextColor="#666666"
      />

      <TextInput
        key={i18n.language}
        style={styles.input}
        placeholder={t('translations.password')}
        autoCapitalize="none"
        onChangeText={pass => setPass(pass)}
        value={pass}
        secureTextEntry
        keyboardType="default"
        placeholderTextColor="#666666"
      />

      <TouchableOpacity style={styles.btn} onPress={() => _onLogin()}>
        <Text style={styles.btn_text}>{t('translations.login')}</Text>
      </TouchableOpacity>
    </View>
  );
};
// class Login extends Component {
//   static navigationOptions = {
//     title: 'Log In',
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       // url: '',
//       user: '',
//       pass: '',
//     };
//   }

//   _validate() {
//     const {user, pass} = this.state;
//     // if (url == '') {
//     //   alert('ادخل رابط');
//     //   return false;
//     // }

//     if (user == '') {
//       alert('ادخل مستخدم');
//       return false;
//     }

//     if (pass == '') {
//       alert('ادخل كلمة مرور');
//       return false;
//     }
//   }

//   _onLogin = async () => {
//     this._validate();

//     const {navigate} = this.props.navigation;

//     const {user, pass} = this.state;

//     await LoginApi(url, user, pass)
//       .then(resjson => {
//         if (resjson.status === 'SUCCESS' && this.saveToStorage(resjson.token)) {
//           alert(resjson.msg);
//           navigate('المناسبات');
//         } else if (resjson.status === 'FAIL') {
//           alert(resjson.msg);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   async saveToStorage(token) {
//     if (token) {
//       await AsyncStorage.setItem('@token', token);
//       await AsyncStorage.setItem('@isLoggedIn', '1');
//       await AsyncStorage.setItem('@url', url);

//       return true;
//     }

//     return false;
//   }

//   render() {
//     const {user, pass} = this.state;

//     return (
//       <View style={styles.container}>
//         <Image style={styles.logo} source={require('../../assets/logo.png')} />
//         {/* <TextInput
//           style={styles.input}
//           placeholder="رابط المنصة"
//           onChangeText={url => this.setState({url})}
//           autoCapitalize="none"
//           value={url}
//           placeholderTextColor="#666666"
//         /> */}

//         <TextInput
//           style={styles.input}
//           placeholder="اسم المستخدم"
//           autoCapitalize="none"
//           onChangeText={user => this.setState({user})}
//           value={user}
//           placeholderTextColor="#666666"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="كلمة المرور"
//           autoCapitalize="none"
//           onChangeText={pass => this.setState({pass})}
//           value={pass}
//           secureTextEntry
//           keyboardType="default"
//           placeholderTextColor="#666666"
//         />

//         <TouchableOpacity style={styles.btn} onPress={this._onLogin.bind(this)}>
//           <Text style={styles.btn_text}>تسجيل الدخول</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
  },
  input: {
    height: 60,
    width: 270,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f2f2f3',
    color: '#333333',
    textAlign: 'right',
    fontFamily: 'Cairo-Regular',
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: '#994ee0',
    borderColor: '#994ee0',
    borderRadius: 3,

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn_text: {
    color: '#fff',
    fontSize: 16,
    borderRadius: 5,

    fontFamily: 'Cairo-Regular',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
});

export default Login;
