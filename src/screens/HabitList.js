import React, {useState, useEffect} from 'react';
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
  BackHandler,
  Alert,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderLeft from '../components/HeaderLeft';
import {connect} from 'react-redux';
import {Searchbar} from 'react-native-paper';
import Api from '../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {UserAction} from '../reduxManager/index';
import Loader from '../components/Loader/Loader';
import {APPLICATION_STRINGS, colors} from '../utils';
import {Search} from '../assets';
import AppButton from '../components/AppButton';
import CheckBox from '@react-native-community/checkbox';

const HabitList = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
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
  const [showLoader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const HabitList = [
    {
      id: '1',
      image: require('../assets/book.png'),
      name: 'Read a book for 30 minutes',
    },
    {
      id: '2',
      image: require('../assets/meditation.png'),
      name: 'Meditate for 30 minutes',
    },
    {
      id: '3',
      image: require('../assets/water.png'),
      name: 'Drink 5 glasses of water',
    },

    {
      id: '4',
      image: require('../assets/training.png'),
      name: 'Run up to 2km',
    },
    {
      id: '5',
      image: require('../assets/workout.png'),
      name: 'Morning workout',
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

  const renderHabit = ({item}) => {
    const isSelected = selectedHabit.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.cardMain}
        activeOpacity={0.8}
        onPress={() => {
          toggleSelectStudent(item.id);
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

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar
        hidden={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        {/* Popular Habits */}
        <FlatList
          data={HabitList}
          keyExtractor={item => item.id}
          renderItem={renderHabit}
        />
        <AppButton
          onPress={() => {
            navigation.navigate('CreateHabit');
          }}
          txtColor={colors.secondaryColor}
          style={styles.addBtn}
          title="Create Habit"
        />

        <AppButton
          onPress={() => {
            navigation.navigate('BottomTab');
          }}
          title="Continue"
        />
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

  addBtn: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondaryColor,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(HabitList);
