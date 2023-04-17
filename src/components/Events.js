import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

import {useNavigation} from '@react-navigation/native';

import getToken from '../api/getToken';
import ScanBarcode from './ScanBarcode';
import EventsApi from '../api/EventsApi';

const Events = () => {
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    getToken()
      .then(token => EventsApi(token))
      .then(data => setData(data.status === 'SUCCESS' ? data.events : ''))
      .catch(err => console.log(err));
  }, []);

  const logout = async () => {
    await AsyncStorage.setItem('@token', '');
    await AsyncStorage.setItem('@isLoggedIn', '0');
    navigation.navigate('تسجيل الدخول');
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.text}>{t('translations.pickevent')}</Text>

        <TouchableOpacity onPress={() => logout()}>
          <Text style={styles.text}>{t('translations.logout')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              backgroundColor: index % 2 == 0 ? '#eee' : '#fcfcfc',
              padding: 5,
            }}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('الحجوزات', {
                  eid: parseInt(item.ID),
                  title: item.post_title,
                })
              }>
              <View style={styles.item}>
                <Text style={styles.itemindex}>{index + 1}</Text>
                <Text style={styles.itemtext}>{item.post_title}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
        keyExtractor={item => item.post_title}
      />
    </View>
  );
};
// class Events extends Component {
//   static navigationOptions = {
//     title: 'List All Events',
//   };

//   constructor(props) {
//     super(props);

//     this.state = {data: []};
//   }

//   componentDidMount() {
//     getToken()
//       .then(token => EventsApi(token))
//       .then(data =>
//         this.setState({data: data.status === 'SUCCESS' ? data.events : ''}),
//       )
//       .catch(err => console.log(err));
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
//           <Text style={styles.text}>اختر مناسبة</Text>

//           <TouchableOpacity onPress={() => this.logout()}>
//             <Text style={styles.text}>تسجيل الخروج</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={this.state.data}
//           renderItem={({item, index}) => (
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: index % 2 == 0 ? '#eee' : '#fcfcfc',
//                 padding: 5,
//               }}>
//               <TouchableWithoutFeedback
//                 onPress={() =>
//                   this.props.navigation.navigate('الحجوزات', {
//                     eid: parseInt(item.ID),
//                     title: item.post_title,
//                   })
//                 }>
//                 <View style={styles.item}>
//                   <Text style={styles.itemindex}>{index + 1}</Text>
//                   <Text style={styles.itemtext}>{item.post_title}</Text>
//                 </View>
//               </TouchableWithoutFeedback>
//             </View>
//           )}
//           keyExtractor={item => item.post_title}
//         />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Cairo-Regular',
  },

  item: {
    fontSize: 16,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'Cairo-Regular',
  },
  itemindex: {
    color: '#000',
    marginRight: 15,
    fontWeight: 'bold',
  },

  itemtext: {
    color: '#000',
    fontFamily: 'Cairo-Regular',
  },

  heading: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#994ee0',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
    padding: 15,
  },
  text: {
    fontFamily: 'Cairo-Regular',
  },
});

export default Events;
