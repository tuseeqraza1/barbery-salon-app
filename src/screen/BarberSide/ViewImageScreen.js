import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import colors from '../../styles/colors';

function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.closeIcon}
        source={require('../../assets/icons/close.png')}
      />
      <Image
        style={styles.deleteIcon}
        source={require('../../assets/icons/trash.png')}
      /> */}
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require('../../assets/images/image_2.jpg')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // closeIcon: {
  //   position: 'absolute',
  //   tintColor: colors.white,
  //   top: 40,
  //   left: 30,
  //   width: 25,
  //   height: 25,
  // },
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  // deleteIcon: {
  //   position: 'absolute',
  //   tintColor: colors.white,
  //   top: 40,
  //   right: 30,
  //   width: 25,
  //   height: 25,
  // },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ViewImageScreen;
