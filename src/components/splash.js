import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

const Splash = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />

      <Text style={styles.txtSub}>{t('translations.appheader')}</Text>
      <Text style={styles.txtSub2}>{t('translations.appsubheader')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  txtSub2: {
    color: '#000',
    fontSize: 18,
    marginVertical: 16,

    fontFamily: 'Cairo-Light',
  },
  txtSub: {
    color: '#000',
    fontSize: 20,

    fontFamily: 'Cairo-Black',
  },
});
export default Splash;
