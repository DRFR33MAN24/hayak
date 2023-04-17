import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';

const ListTickets = ({route}) => {
  const [eid, setEid] = useState([]);

  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    setEid(parseInt(JSON.stringify(route.params.eid)));
  }, []);

  const logout = async () => {
    await AsyncStorage.setItem('@token', '');
    await AsyncStorage.setItem('@isLoggedIn', '0');
    navigation.navigate('تسجيل الدخول');
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.heading}>{route.params.title}</Text>
      </View>

      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: '#994ee0',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() =>
          navigation.navigate('مسح الباركود', {
            eid: eid,
          })
        }>
        <Text style={{fontFamily: 'Cairo-Regular'}}>
          {t('translations.scanbarcode')}
        </Text>
      </TouchableOpacity>
      {/* <Button
          title="مسح كود QR"
          color="#994ee0"
          titleStyle={{fontFamily: 'Cairo-Regular'}}
          onPress={() =>
            this.props.navigation.navigate('مسح الباركود', {
              eid: this.state.eid,
            })
          }
        /> */}
    </View>
  );
};
// class ListTickets extends Component {
//   static navigationOptions = {
//     title: 'List Tickets',
//   };

//   constructor(props) {
//     super(props);
//     this.state = {eid: []};
//   }

//   componentDidMount() {
//     const {navigation} = this.props;
//     this.setState({eid: parseInt(JSON.stringify(this.props.route.params.eid))});
//   }

//   async logout() {
//     await AsyncStorage.setItem('@token', '');
//     await AsyncStorage.setItem('@isLoggedIn', '0');
//     this.props.navigation.navigate('تسجيل الدخول');
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.heading}>
//           <Text style={styles.heading}>{this.props.route.params.title}</Text>
//         </View>

//         <TouchableOpacity
//           style={{
//             height: 50,
//             backgroundColor: '#994ee0',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//           onPress={() =>
//             this.props.navigation.navigate('مسح الباركود', {
//               eid: this.state.eid,
//             })
//           }>
//           <Text style={{fontFamily: 'Cairo-Regular'}}>مسح كود QR</Text>
//         </TouchableOpacity>
//         {/* <Button
//           title="مسح كود QR"
//           color="#994ee0"
//           titleStyle={{fontFamily: 'Cairo-Regular'}}
//           onPress={() =>
//             this.props.navigation.navigate('مسح الباركود', {
//               eid: this.state.eid,
//             })
//           }
//         /> */}
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,

    borderTopWidth: 1,
    borderBottomColor: '#000000',
    height: 44,
  },
  heading: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#994ee0',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    padding: 15,
    fontFamily: 'Cairo-Regular',
  },
  btn: {
    fontFamily: 'Cairo-Regular',
    backgroundColor: '#994ee0',
  },
});

export default ListTickets;
