import React, {useCallback, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import AppButton from '../../components/AppButton';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';

import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {UserAction} from '../../reduxManager/index';
import {connect} from 'react-redux';
import Loader from '../../components/Loader/Loader';
import {APPLICATION_STRINGS, colors} from '../../utils';
import {validateEmail} from '../../utils/CommonFunctions';
import { EmailFilled, LockFilled, UserProfile } from '../../assets';

const SignUp = props => {
  const {navigation} = props;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    Alert.alert(APPLICATION_STRINGS.holdon, APPLICATION_STRINGS.exitApp, [
      {
        text: APPLICATION_STRINGS.cancel,
        onPress: () => null,
        style: 'cancel',
      },
      {text: APPLICATION_STRINGS.yes, onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const [showLoader, setLoader] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  //SignUp Api Call
  const SignupApi = () => {
    navigation.navigate('HabitList');
  };

  return (
    <SafeAreaView style={styles.safearea}>
      {showLoader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={styles.headerView}>
              <Text style={styles.header}>
                SignUp for the Habit Tracker and Embark on journey on positive
                change!
              </Text>
            </View>
            <ScrollView
              nestedScrollEnabled
              contentContainerStyle={{flexGrow: 1}}>
              <TextInput
                style={[styles.input]}
                placeholder="Full Name"
                placeholderTextColor={colors.Grey}
                onChangeText={value => {
                  setName(value);
                }}
                value={name}
                cursorColor={colors.black}
                caretHidden={false}
                mode="outlined"
                activeOutlineColor={colors.secondaryColor}
                outlineColor={colors.Grey}
                outlineStyle={{borderRadius: 12, borderWidth: 1}}
               
              />
              <TextInput
                style={[styles.input]}
                placeholder="Email"
                placeholderTextColor={colors.Grey}
                onChangeText={value => {
                  console.log('Email value:', value);
                  setEmail(value);
                }}
                value={email}
                cursorColor={colors.black}
                caretHidden={false}
                mode="outlined"
                activeOutlineColor={colors.secondaryColor}
                outlineColor={colors.Grey}
                outlineStyle={{borderRadius: 12, borderWidth: 1}}

              />
              <TextInput
                style={[styles.input]}
                placeholder="Phone Number"
                placeholderTextColor={colors.Grey}
                keyboardType="numeric"
                maxLength={15}
                onChangeText={value => {
                  setPhone(value);
                }}
                value={phone}
                cursorColor={colors.black}
                caretHidden={false}
                mode="outlined"
                activeOutlineColor={colors.secondaryColor}
                outlineColor={colors.Grey}
                outlineStyle={{borderRadius: 12, borderWidth: 1}}
              />

              <TextInput
                style={[styles.input]}
                placeholder="Password"
                placeholderTextColor={colors.Grey}
                onChangeText={value => {
                  setPassword(value);
                }}
                value={password}
                secureTextEntry={showPassword}
                right={
                  <TextInput.Icon
                    icon={!showPassword ? 'eye' : 'eye-off'}
                    color={colors.Grey}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                }
                cursorColor={colors.black}
                caretHidden={false}
                mode="outlined"
                activeOutlineColor={colors.secondaryColor}
                outlineColor={colors.Grey}
                outlineStyle={{borderRadius: 12, borderWidth: 1}}
              />

              <TextInput
                style={[styles.input]}
                placeholder="Confirm Password"
                placeholderTextColor={colors.Grey}
                onChangeText={value => {
                  setConfirmPassword(value);
                }}
                value={confirmPassword}
                secureTextEntry={showConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={!showConfirmPassword ? 'eye' : 'eye-off'}
                    color={colors.Grey}
                    onPress={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  />
                }
                cursorColor={colors.black}
                caretHidden={false}
                mode="outlined"
                activeOutlineColor={colors.secondaryColor}
                outlineColor={colors.Grey}
                outlineStyle={{borderRadius: 12, borderWidth: 1}}
              />

              <View style={styles.rememberView}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                    tintColors={{true: colors.secondaryColor, false: colors.borderColor}}
                  />
                  <Text style={[styles.rememberText, {marginTop: 3, flex: 1}]}>
                    By creating an account you have to agree with our terms &
                    condition.
                  </Text>
                </View>
              </View>

              <AppButton
                title="Continue"
                style={{marginTop: 30}}
                onPress={() => {
                  SignupApi();
                  // navigation.navigate('');
                }}
              />

              {/* Don't have Acc */}
              <View style={[styles.noccView]}>
                <Text
                  style={{
                    color: colors.Grey,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                  }}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignIn');
                  }}>
                  <Text
                    style={{
                      color: colors.secondaryColor,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 16,
                    }}>
                    {' Sign in '}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ImgContainer: {
    alignItems: 'center',
  },
  headerView: {
    justifyContent: 'center',
    marginHorizontal: 24,
    // width: '70%',
    // marginTop: 80,
    // marginBottom: 10,
  },
  header: {
    color: colors.textColor,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  textColor: {
    color: colors.Grey,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },

  input: {
    backgroundColor: colors.white,
    color: colors.textColor,
    // paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  ddinput: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    backgroundColor: colors.dustyGrey,
    color: colors.textColor,
    borderColor: colors.dustyGrey,
    marginTop: 20,
    paddingHorizontal: 20,
    width: '90%',
    marginHorizontal: 20,
  },
  ddinput2: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    backgroundColor: colors.dustyGrey,
    paddingHorizontal: 20,
    color: colors.textColor,
    borderColor: colors.dustyGrey,
    marginTop: 20,
  },
  placeholderstyle: {
    color: colors.Grey,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  noccView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  rememberText: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(SignUp);
