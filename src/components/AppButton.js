import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../utils/colors';

const AppButton = props => {
  const {onPress, title, bgColor, style,txtColor} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.loginBtn,
        {backgroundColor: bgColor ? bgColor : colors.secondaryColor},
        style,
      ]}
      activeOpacity={0.8}>
      <Text style={[styles.BtnText ,{color: txtColor ? txtColor : colors.white},]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 16,
    // width: '90%',
  },
  BtnText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.2,
  },
});
export default AppButton;
