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
import {FaceBook, Google, Lock, EmailFilled, LockFilled} from '../assets';
import AppButton from '../components/AppButton';
import CheckBox from '@react-native-community/checkbox';
import {TextInput} from 'react-native-paper';
import Api from '../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {UserAction} from '../reduxManager/index';
import {connect} from 'react-redux';
import Loader from '../components/Loader/Loader';
import {APPLICATION_STRINGS, colors} from '../utils';
import {validateEmail} from '../utils/CommonFunctions';
import Slider from '@react-native-community/slider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const CreateHabit = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
    });

    return () => {
      focusHandler;
    };
  }, []);

  const [showLoader, setLoader] = useState(false);

  const [habitName, setHabitName] = useState('');


  const [dateParam, setDateParam] = useState('Select Time');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // showing datepicker
  const showDatePicker = visible => {
    setDatePickerVisibility(visible);
  };

  //hiding date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handling Date
  const handleConfirm = date => {
    const selectedDate = moment(date).toDate();
    setDateParam(moment(selectedDate).format('hh:mm A'));
    setDatePickerVisibility(false);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      {showLoader ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <View style={styles.fieldscontainer}>
            <Text style={styles.labeltext}>What do you want to do?</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Name of Habit"
              placeholderTextColor={colors.Grey}
              onChangeText={value => {
                setHabitName(value);
              }}
              value={habitName}
              cursorColor={colors.black}
              caretHidden={false}
              mode="outlined"
              activeOutlineColor={colors.secondaryColor}
              outlineColor={'transparent'}
              outlineStyle={{borderRadius: 12, borderWidth: 1}}
            />
          </View>
        

          <View style={styles.fieldscontainer}>
            <Text style={styles.labeltext}>Remainder</Text>

            <TouchableOpacity
              onPress={() => {
                showDatePicker(!isDatePickerVisible);
              }}
              style={styles.dateView}>
              <Text style={styles.dateText}>{dateParam}</Text>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/Calendardate.png')}
              />
            </TouchableOpacity>
          </View>

          <AppButton
            onPress={() => {
              navigation.navigate('BottomTab');
            }}
            style={styles.btnStyle}
            title="Continue"
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={'time'}
            minimumDate={new Date()} // Ensuring future time
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
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
  dateView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.Grey,
    height: 55,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  btnStyle: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
  },
  fieldscontainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  labeltext: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    color: colors.black,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  button: {
    width: 120,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E0E4FF',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#C0C4FF',
  },
  buttonText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  daySelector: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    marginLeft: 10,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: 70,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E0E4FF',
    marginBottom: 10,
    // flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeDayButton: {
    backgroundColor: '#C0C4FF',
  },
  dayButtonText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(CreateHabit);
