import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {ArrowLeft} from '../assets';

const HeaderLeft = ({navigation}) => {
  const goBackOnPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={goBackOnPress}
      activeOpacity={0.5}>
      <ArrowLeft />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginRight: 10,
  },
});

export default HeaderLeft;
