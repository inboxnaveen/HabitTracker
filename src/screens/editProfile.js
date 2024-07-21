import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Modal,
  StatusBar,
  Linking,
} from 'react-native';
import AppButton from '../components/AppButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';
import {Email, Edit} from '../assets';
import * as ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Api from '../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {UserAction} from '../reduxManager/index';
import {connect} from 'react-redux';
import Loader from '../components/Loader/Loader';
import {APPLICATION_STRINGS, colors} from '../utils';

const EditProfile = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      
    });
    return focusHandler;
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState();

  const [showLoader, setLoader] = useState(false);
  const [imgModalVisibility, setImgModalVisibility] = useState(false);
  const [profileImg, setProfileImg] = useState({});
  const [profileImgUri, setProfileImgUri] = useState('');

  // Requating permissions if not given
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    } catch (err) {}
  };
  // providing alert if permission is blocked
  const onConsentPress = async (camerapermission, photopermission) => {
    let permissionname = '';
    console.log('photo permission', photopermission);
    if (camerapermission == 'blocked' && photopermission == 'blocked') {
      permissionname = 'Camera and Photo Library permission';
    } else if (
      camerapermission == 'granted' &&
      (photopermission == 'blocked' || photopermission == 'denied')
    ) {
      permissionname = 'photo Library permission';
    } else if (
      (camerapermission == 'blocked' || camerapermission == 'denied') &&
      photopermission == 'granted'
    ) {
      permissionname = 'Camera permission';
    } else if (camerapermission == 'blocked' && photopermission == 'denied') {
      permissionname = 'Camera permission';
    } else if (camerapermission == 'denied' && photopermission == 'blocked') {
      permissionname = 'Camera permission';
    }
    Alert.alert(
      permissionname,
      permissionname +
        'Is blocked in the device settings. Allow the app to access' +
        permissionname +
        'to take images',
      [
        {
          text: 'OK',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
    );
    return;
  };

  const onConsentrequest = async () => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ]).then(result => {
      if (
        result[PERMISSIONS.ANDROID.CAMERA] == 'granted' &&
        (result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted' ||
          result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] == 'granted')
      ) {
        setImgModalVisibility(!imgModalVisibility);
      } else if (
        result[PERMISSIONS.ANDROID.CAMERA] == 'blocked' ||
        result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'blocked' ||
        result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] == 'blocked'
      ) {
        onConsentPress(
          result[PERMISSIONS.ANDROID.CAMERA],
          result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
          result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES],
        );
      } else {
        requestCameraPermission();
      }
    });
  };

  //Launching Camera
  const cameraLaunch = () => {
    let options = {
      quality: 0.5,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera error:', response.error);
        // Add your error handling logic here
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        setImgModalVisibility(false);
        const sourceUpload = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setProfileImg(sourceUpload);
        setProfileImgUri(response.assets[0].uri);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (response.customButton) {
      } else {
        setImgModalVisibility(false);
        const sourceUpload = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setProfileImg(sourceUpload);
        setProfileImgUri(response.assets[0].uri);
      }
    });
  };


 

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar backgroundColor={colors.white} />
      {showLoader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.editProfile}>

            {profileImgUri ? (
              <View style={{alignItems: 'center', marginHorizontal: 16}}>
                <Image
                  source={{uri: profileImgUri}}
                 
                  style={styles.ImgProfile}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <Image
                source={require('../assets/user_logo.png')}
                style={styles.ImgProfile}
              />
            )}

            <TouchableOpacity
              style={{position: 'absolute', bottom: 0, right: 0}}
              activeOpacity={0.8}
              onPress={() => onConsentrequest()}>
              <Edit />
            </TouchableOpacity>
          </View>

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
            placeholder="Email"
            placeholderTextColor={colors.Grey}
            onChangeText={value => {
              console.log('Email value:', value);
              setEmail(value);
            }}
            disabled
            value={email}
            cursorColor={colors.black}
            caretHidden={false}
            mode="outlined"
            activeOutlineColor={colors.secondaryColor}
            outlineColor={colors.Grey}
            outlineStyle={{borderRadius: 12, borderWidth: 1}}
          />

          <AppButton
            title="Update"
            style={styles.submitBtn}
            onPress={() => {
              navigation.navigate('Profile')
            }}
          />
          <Modal
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            visible={imgModalVisibility}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!imgModalVisibility);
            }}>
            <View style={styles.modalBg}>
              <View style={styles.modalViewBg}>
                <View style={styles.modalHeaderView}>
                  <TouchableOpacity
                    style={styles.modalClose}
                    onPress={() => {
                      setImgModalVisibility(!imgModalVisibility);
                    }}
                    activeOpacity={0.8}>
                    <Ionicons name="close" size={25} color={colors.Grey} />
                  </TouchableOpacity>
                  <Text style={styles.modalHeaderText}>
                    {'Select An Image'}
                  </Text>
                </View>

                {/* camera Btn */}
                <TouchableOpacity
                  style={styles.modalItemView}
                  onPress={() => {
                    cameraLaunch();
                  }}>
                  <Icon2
                    size={16}
                    name={'camera'}
                    color={colors.textColor}
                    style={{marginTop: 5}}
                  />
                  <Text style={styles.modalItemTxt}>{'Take A Picture'}</Text>
                </TouchableOpacity>

                {/* gallery Btn */}
                <TouchableOpacity
                  style={styles.modalItemView}
                  onPress={() => {
                    openGallery();
                  }}>
                  <Icon2
                    size={16}
                    name={'image'}
                    color={colors.textColor}
                    style={{marginTop: 5}}
                  />
                  <Text style={styles.modalItemTxt}>{'Choose An Image'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  editProfile: {
    width: 120,
    height: 120,
    backgroundColor: '#0000001A',
    borderRadius: 60,
    marginHorizontal: 20,
    alignSelf:"center",
    marginBottom:20,
  },
  ImgProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  input: {
    backgroundColor: colors.dustyGrey,
    color: colors.textColor,
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

  submitBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    width: '85%',
    marginHorizontal: 20,
  },

  modalBg: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewBg: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 15,
    width: '90%',
  },
  modalHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalClose: {
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.textColor,
    textAlign: 'center',
    flex: 1,
  },
  modalItemView: {
    flexDirection: 'row',
    paddingTop: 15,
    alignItems: 'center',
  },
  modalItemTxt: {
    fontSize: 16,
    color: colors.textColor,
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(EditProfile);
