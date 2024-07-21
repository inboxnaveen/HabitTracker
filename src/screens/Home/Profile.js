import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  useWindowDimensions,
  Animated,
} from 'react-native';
import colors from '../../utils/colors';
import {UserAction} from '../../reduxManager/index';
import {
  ProfileEdit,
  UserProfile,
  Lock,
  Logout,
  Shield,
  Info,
  Edit,
} from '../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import Loader from '../../components/Loader/Loader';

const Profile = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
    return focusHandler;
  }, []);

  //OnLogout
  const clearStorage = () => {
    UserAction.resetUserDetails();
    navigation.popToTop();
    navigation.navigate('AuthStack');
  };

  const [showLoader, setLoader] = useState(false);
  const [profileList, setProfileList] = useState(false);
  const [imageError, setImageError] = useState(false);

  //Get Profile Api

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar
        hidden={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      {showLoader ? (
        <Loader />
      ) : (
        <ScrollView nestedScrollEnabled contentContainerStyle={{flexGrow:1}}>
          <View style={{marginVertical: 20, alignSelf: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: colors.textColor,
                fontSize: 20,
              }}>
              Settings
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            {profileList.profile_img ? (
              <Image
                source={{
                  uri: profileList.profile_img,
                }}
                style={{
                  height: 60,
                  width: 60,
                  // marginTop: 25,
                  borderRadius: 60,
                }}
                resizeMode="cover"
              />
            ) : (
              <Image
                style={{
                  width: 60,
                  height: 60,
                  // marginTop: 25,
                  borderRadius: 60,
                }}
                source={require('../../assets/user_logo.png')}
                resizeMode="contain"
              />
            )}
            <View>
              <Text style={styles.nameText}>Naveen</Text>
              <Text style={styles.emailText}>inboxnaveen18@gmail.com</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <Edit />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContain}>
            <TouchableOpacity style={styles.detailsView}>
              <View style={[styles.detailsSubView, {marginLeft: 4}]}>
                <Icon
                  name="settings-outline"
                  size={20}
                  color={colors.textColor}
                />

                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Regular',
                    color: colors.textColor,
                    marginLeft: 24,
                  }}>
                  General Setting
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textColor} />
            </TouchableOpacity>
            <View style={styles.hrline} />

            <TouchableOpacity style={styles.detailsView}>
              <View style={[styles.detailsSubView, {marginLeft: 4}]}>
                <Icon
                  name="notifications-outline"
                  size={20}
                  color={colors.textColor}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Regular',
                    color: colors.textColor,
                    marginLeft: 24,
                  }}>
                  Notifications
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textColor} />
            </TouchableOpacity>
            <View style={styles.hrline} />

            <TouchableOpacity style={styles.detailsView}>
              <View style={[styles.detailsSubView, {marginLeft: 4}]}>
                <Icon
                  name="share-social-outline"
                  size={20}
                  color={colors.textColor}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Regular',
                    color: colors.textColor,
                    marginLeft: 24,
                  }}>
                  Share with friends
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textColor} />
            </TouchableOpacity>
            <View style={styles.hrline} />

            <TouchableOpacity style={styles.detailsView}>
              <View style={[styles.detailsSubView, {marginLeft: 4}]}>
                <Icon name="star-outline" size={20} color={colors.textColor} />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Regular',
                    color: colors.textColor,
                    marginLeft: 24,
                  }}>
                  Rate us
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textColor} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.detailsView,
              {
                justifyContent: 'center',
                borderRadius: 12,
                paddingVertical: 12,
                position:"absolute",
                bottom:20,
                left:20,right:20,
              },
            ]}
            onPress={() => {
              clearStorage();
            }}>
            <View style={[styles.detailsSubView, {marginLeft: 2}]}>
              <Logout />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                  color: '#F75555',
                  marginLeft: 20,
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
  nameText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: colors.textColor,
  },
  emailText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.textColor,
  },
  hrline: {
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  detailsView: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dustyGrey,
  },
  detailsSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContain: {
    marginHorizontal: 20,
    backgroundColor: colors.dustyGrey,
    padding: 10,
    borderRadius: 12,
    marginTop: 40,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(Profile);
