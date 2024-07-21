import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FaceBook, Google, Lock, EmailFilled, LockFilled} from '../../assets';
import AppButton from '../../components/AppButton';
import CheckBox from '@react-native-community/checkbox';
import {TextInput} from 'react-native-paper';
import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {UserAction} from '../../reduxManager/index';
import {connect} from 'react-redux';
import Loader from '../../components/Loader/Loader';
import {APPLICATION_STRINGS, colors} from '../../utils';
import {validateEmail} from '../../utils/CommonFunctions';

const SignIn = props => {
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

  const [loginParams, setLoginParams] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  //Login Api Call
  const loginApi = () => {
    //   NetInfo.fetch().then(state => {
    //     if (!state.isConnected) {
    //       Alert.alert(
    //         APPLICATION_STRINGS.noInternetConnection,
    //         APPLICATION_STRINGS.checkyourinternetconnectivity,
    //         [
    //           {
    //             text: APPLICATION_STRINGS.cancel,
    //             onPress: () => null,
    //             style: 'cancel',
    //           },
    //           {text: APPLICATION_STRINGS.ok, onPress: () => {}},
    //         ],
    //       );
    //     } else {
    //       if (loginParams.email && loginParams.password) {
    //         if (!validateEmail(loginParams.email)) {
    //           Snackbar.show({
    //             text: 'Invalid Email',
    //             backgroundColor: 'red',
    //             duration: Snackbar.LENGTH_SHORT,
    //           });
    //           return;
    //         }
    //         let formData = {
    //           email: loginParams.email.trim(),
    //           password: loginParams.password,
    //         };
    //         setLoader(true);
    //         console.log('FormData', formData);
    //         return new Promise((resolve, reject) => {
    //           Api.postApi(formData, 'Auth/login')
    //             .then(response => {
    //               setLoader(false);
    //               if (response.status === 200) {
    //                 Snackbar.show({
    //                   text: response.data.message,
    //                   backgroundColor: 'green',
    //                   duration: Snackbar.LENGTH_SHORT,
    //                 });
    //                 UserAction.setUserDetails(response.data.data);
    navigation.navigate('BottomTab');
    //             }
    //             resolve(response);
    //           })
    //           .catch(error => {
    //             setLoader(false);
    //             console.log('login Error', error);
    //             Snackbar.show({
    //               text: error.response.data.message,
    //               backgroundColor: 'red',
    //               duration: Snackbar.LENGTH_SHORT,
    //             });
    //             reject(error);
    //           });
    //       });
    //     } else {
    //       if (!loginParams.email) {
    //         Snackbar.show({
    //           text: 'Please Enter Email',
    //           backgroundColor: 'red',
    //           duration: Snackbar.LENGTH_SHORT,
    //         });
    //       } else {
    //         Snackbar.show({
    //           text: 'Please Enter Password',
    //           backgroundColor: 'red',
    //           duration: Snackbar.LENGTH_SHORT,
    //         });
    //       }
    //     }
    //   }
    // });
  };

  return (
    <SafeAreaView style={styles.safearea}>
      {showLoader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text style={styles.head}>Welcome to Habit Tracker</Text>

          <TouchableOpacity
                  onPress={() => {
                    // signIn();
                  }}
                  style={styles.socialBtnView}>
                  <Image
                    style={{width: 20, height: 20, marginRight: 12}}
                    source={require('../../assets/google.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.socialText}>Sign in with Google</Text>
                </TouchableOpacity>

                <View style={styles.borderview}>
                  <View style={styles.borderline} />
                  <Text style={styles.borderText}>OR</Text>
                  <View style={styles.borderline} />
                </View>

          <View style={styles.fieldscontainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.Grey}
              onChangeText={value => {
                setLoginParams({...loginParams, email: value});
              }}
              caretHidden={false}
              cursorColor={colors.black}
              mode="outlined"
              activeOutlineColor={colors.secondaryColor}
              outlineColor={colors.Grey}
              outlineStyle={{borderRadius: 12, borderWidth: 1}}
              value={loginParams.email}
              left={<TextInput.Icon icon={() => <EmailFilled />} />}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.Grey}
              secureTextEntry={showPassword}
              style={styles.input}
              onChangeText={value => {
                setLoginParams({...loginParams, password: value});
              }}
              value={loginParams.password}
              caretHidden={false}
              cursorColor={colors.black}
              mode="outlined"
              activeOutlineColor={colors.secondaryColor}
              outlineColor={colors.Grey}
              outlineStyle={{borderRadius: 12, borderWidth: 1}}
              left={<TextInput.Icon icon={() => <LockFilled />} />}
              right={
                <TextInput.Icon
                  icon={!showPassword ? 'eye' : 'eye-off'}
                  color={colors.Grey}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              }
            />
          </View>

          

          <AppButton
            title="Sign In"
            onPress={() => {
              // navigation.navigate('BottomTab');
              loginApi();
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
              Don’t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text
                style={{
                  color: colors.secondaryColor,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                }}>
                {' Sign Up '}
              </Text>
            </TouchableOpacity>
          </View>
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
  socialBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 20,
    justifyContent: 'center',
    padding: 16,
    marginTop:20,
  },
  socialText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.textColor,
  },
  borderview: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  borderText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.Grey,
  },
  borderline: {
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    width: '44%',
  },

  head: {
    color: colors.textColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 40,
    marginHorizontal: 20,
    marginTop: 40,
  },
  textColor: {
    color: colors.Grey,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },

  input: {
    backgroundColor: colors.white,
    color: colors.Grey,
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 20,
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
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(SignIn);
