import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  Animated,
  BackHandler,
  Modal,
  Alert,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HeaderLeft from '../../components/HeaderLeft';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {Searchbar,TextInput} from 'react-native-paper';
import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {UserAction} from '../../reduxManager/index';
import Loader from '../../components/Loader/Loader';
import {APPLICATION_STRINGS,colors} from '../../utils';
import {Search} from '../../assets';
import CheckBox from '@react-native-community/checkbox';
import AppButton from '../../components/AppButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SubtaskModal from '../../components/subtask';

const Home = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      const startOfMonth = moment().startOf('month');
      const endOfMonth = moment().endOf('month');
      const daysArray = [];
      for (let date = startOfMonth; date <= endOfMonth; date.add(1, 'days')) {
        daysArray.push(date.clone());
      }
      // console.log('daysArray', daysArray);
      setDays(daysArray);
    });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      focusHandler, backHandler.remove();
    };
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

  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment().date());

  const [showLoader, setLoader] = useState(false);
  const [habitName, setHabitName] = useState('');

  const [imgModalVisibility, setImgModalVisibility] = useState(false);

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


  const HabitList = [
    // {
    //   id: '1',
    //   image: require('../../assets/meditation.png'),
    //   name: 'Meditate for 30 minutes',
    //   subtasks: [
    //     { id: '1-1', name: 'Find a quiet place', minTime: '5 min', maxTime: '10 min', userTime: '' },
    //     { id: '1-2', name: 'Set a timer', minTime: '1 min', maxTime: '2 min', userTime: '' },
    //     { id: '1-3', name: 'Begin meditation', minTime: '20 min', maxTime: '30 min', userTime: '' },
    //     { id: '1-4', name: 'Focus on breathing', minTime: '5 min', maxTime: '10 min', userTime: '' },
    //     { id: '1-5', name: 'Practice mindfulness', minTime: '5 min', maxTime: '10 min', userTime: '' },
    //     { id: '1-6', name: 'Gradually end session', minTime: '5 min', maxTime: '10 min', userTime: '' },
    //   ],
    // },
    {
      id: '1',
      image: require('../../assets/water.png'),
      name: 'Drink 10 glasses of water',
      subtasks: [
        {
          id: '2-1',
          name: 'Drink honey lemon water in the morning',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '2-3',
          name: 'Drink a glass of water mid-morning',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '2-4',
          name: 'Drink a glass of water with lunch',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '2-5',
          name: 'Drink a glass of water mid-afternoon',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '2-7',
          name: 'Drink a glass of water after dinner',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '2-8',
          name: 'Drink a glass of water before bed',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
      ],
    },

    {
      id: '2',
      image: require('../../assets/training.png'),
      name: 'Run up to 2km',
      subtasks: [
        {
          id: '3-1',
          name: 'Warm-up exercises',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '3-2',
          name: 'Stretching',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '3-3',
          name: 'Start slow jogging',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '3-4',
          name: 'Run 1 km',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
        {
          id: '3-5',
          name: 'Run 2 km',
          minTime: '10 min',
          maxTime: '20 min',
          userTime: '',
        },
        {
          id: '3-6',
          name: 'Cool down',
          minTime: '5 min',
          maxTime: '10 min',
          userTime: '',
        },
      ],
    },
  ];

  const [selectedHabit, setSelectedHabit] = useState([]);

  const toggleSelectStudent = id => {
    if (selectedHabit.includes(id)) {
      setSelectedHabit(selectedHabit.filter(studentId => studentId !== id));
    } else {
      setSelectedHabit([...selectedHabit, id]);
    }
  };

  const ActivityList = [
    {
      id: '1',
      heading: 'Water 💧',
      total: 10,
      completed: 0,
    },
    {
      id: '2',
      heading: 'Sleeping 😴',
      total: 8,
      completed: 0,
    },
    {
      id: '3',
      heading: 'Running 🏃‍♂️',
      total: 2,
      completed: 0,
    },
  ];

  const [activities, setActivities] = useState(ActivityList);

  const handleIncrement = id => {
    setActivities(prevActivities =>
      prevActivities.map(item =>
        item.id === id
          ? {...item, completed: Math.min(item.completed + 1, item.total)}
          : item,
      ),
    );
  };

  const handleDecrement = id => {
    setActivities(prevActivities =>
      prevActivities.map(item =>
        item.id === id
          ? {...item, completed: Math.max(item.completed - 1, 0)}
          : item,
      ),
    );
  };

  const renderActivity = ({item}) => (
    <View style={styles.activityContainer}>
      <Text style={styles.headingText}>{item.heading}</Text>
      <AnimatedCircularProgress
        style={styles.circleContain}
        size={100}
        width={6}
        fill={(item.completed / item.total) * 100}
        tintColor={colors.secondaryColor}
        lineCap="round"
        padding={5}
        rotation={0}
        backgroundColor="#F0F0F0">
        {fill => (
          <View>
            <Text style={styles.progressText}>
              {item.completed}/{item.total}
            </Text>
            <Text style={styles.progressText}>hrs</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleDecrement(item.id)}
          style={styles.button}>
          <Icon name="minus" size={20} color={colors.secondaryColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIncrement(item.id)}
          style={styles.button}>
          <Icon name="plus" size={20} color={colors.secondaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHabit = ({item}) => {
    const isSelected = selectedHabit.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.cardMain}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('HabitDetail', {habit: item});
        }}>
        <View style={styles.cardImageView}>
          <Image
            source={item.image}
            style={{width: 35, height: 35}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardHeading}>{item.name}</Text>
        </View>
        <CheckBox
          value={isSelected}
          onValueChange={() => toggleSelectStudent(item.id)}
          tintColors={{true: '#5F6CE2', false: '#888A9D'}}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    const day = item.date();
    const isSelected = day === selectedDay;
    return (
      <TouchableOpacity onPress={() => setSelectedDay(day)}>
        <View
          style={[
            styles.dayContainer,
            isSelected && styles.selectedDayContainer,
          ]}>
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
            {item.format('ddd')}
          </Text>
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
            {day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar
        hidden={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <View style={styles.menuView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Text style={styles.grtHead}>Hello, Naveen</Text>
              <Text style={styles.grtTxt}>Empower Your Daily Journey</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // navigation.navigate('CreateHabit');
              setImgModalVisibility(!imgModalVisibility);
            }}
            style={styles.addBtn}>
            <Icon name="plus" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 20}}>
          <FlatList
            data={days}
            renderItem={renderItem}
            keyExtractor={item => item.format('YYYY-MM-DD')}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginLeft: 20}}>
            <Text style={styles.subHead}>Daily Check-in</Text>

            <FlatList
              data={activities}
              renderItem={renderActivity}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={[styles.subHead, {marginLeft: 20}]}>Today</Text>

            <FlatList
              data={HabitList}
              keyExtractor={item => item.id}
              renderItem={renderHabit}
            />
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          visible={imgModalVisibility}
          onRequestClose={() => {
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
                <Text style={styles.modalHeaderText}>Create Habit</Text>
              </View>
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
                outlineColor={colors.Grey}
                outlineStyle={{borderRadius: 12, borderWidth: 1}}
              />
              </View>

              <View style={[styles.fieldscontainer,{marginTop:0}]}>
            <Text style={styles.labeltext}>Remainder</Text>

            <TouchableOpacity
              onPress={() => {
                showDatePicker(!isDatePickerVisible);
              }}
              style={styles.dateView}>
              <Text style={styles.dateText}>{dateParam}</Text>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/Calendardate.png')}
              />
            </TouchableOpacity>
          </View>

              <AppButton
                style={{marginHorizontal: 0}}
                title="Save"
                onPress={() => {
                  setImgModalVisibility(!imgModalVisibility);
                }}
              />
               <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={'time'}
            minimumDate={new Date()} // Ensuring future time
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
            </View>
          </View>
        </Modal>
      </View>
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
  input: {
    backgroundColor:'#F2F2F3',
    color: colors.textColor,
    marginBottom: 20,
  },
  labeltext: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 10,
  },
  fieldscontainer:{
    marginTop:30,
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
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.dustyGrey,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  circleContain: {
    // marginVertical: 10,
  },
  headingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.black,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.white,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },

  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginVertical: 20,
    paddingVertical: 10,
    width: 55,
    borderRadius: 12,
    backgroundColor: colors.dustyGrey,
  },
  selectedDayContainer: {
    backgroundColor: '#d4e1ff',
    borderWidth: 1,
    borderColor: colors.secondaryColor,
  },
  dayText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.black,
  },
  selectedDayText: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },

  profileView: {
    height: 52,
    width: 52,
    backgroundColor: colors.white,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  menuView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grtTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#757575',
  },

  grtHead: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.black,
  },
  subHead: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.black,
    marginVertical: 10,
  },
  addBtn: {
    backgroundColor: colors.secondaryColor,
    borderRadius: 12,
    padding: 10,
  },
  cardMain: {
    // flexDirection: 'row',
    borderRadius: 12,
    padding: 10,
    backgroundColor: colors.dustyGrey,
    marginBottom: 16,
    marginHorizontal: 24,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImageView: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardHeading: {
    color: colors.textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  modalBg: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewBg: {
    backgroundColor: colors.white,
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

export default connect(mapStateToProps)(Home);
