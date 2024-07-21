import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  useWindowDimensions,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import colors from '../utils/colors';
import AppButton from '../components/AppButton';
import PagerView from 'react-native-pager-view';
import {OnboardingAction} from '../reduxManager/index';
import {connect} from 'react-redux';

const OnBoarding = props => {
  const {navigation} = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Hold on!',
        'Are you sure you want to Exit from Optisych Care?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ],
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const slides = [
    {
      name: 'Welcome to Your Path for Better Habits!',
      image: require('../assets/onboarding1.png'),
      info: `Start building and maintaining habits that can transform your life. Our app helps you set, track, and achieve your goals with ease.`,
    },
    {
      name: `Define Your Goals`,
      image: require('../assets/onboarding2.png'),
      info: `What habits would you like to build? Set clear and achievable goals to kickstart your journey. Whether it's exercising daily or reading more, we're here to help.`,
    },
    {
      name: 'Monitor Your Progress',
      image: require('../assets/onboarding3.png'),
      info: `Keep track of your habits and see your progress over time. Celebrate your achievements and stay motivated with our easy-to-use tracking features.`,
    },
  ];

  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageScroll = event => {
    const {offset, position} = event.nativeEvent;
    setCurrentPage(position + offset);
  };

  const handleNext = () => {
    if (currentPage === slides.length - 1) {
      OnboardingAction.setOnboardDetails('visited onboarding');
      navigation.navigate('AuthStack'); // Navigate to the next screen when on the last slide
    } else {
      pagerRef.current.setPage(currentPage + 1); // Move to the next slide
    }
  };

  const layout = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
      <View style={styles.container}>
        <PagerView
          ref={pagerRef}
          style={{flex: 1}}
          onPageScroll={handlePageScroll}
          initialPage={0} // Set initial page
          pageMargin={0}>
          {slides.map((slide, index) => (
            <View key={index}>
              <View style={{width: deviceWidth, height: '60%'}}>
                <Image
                  style={styles.onboardimage}
                  source={slide.image}
                  resizeMode="contain"
                />
              </View>

              <View style={{marginHorizontal: 16}}>
                <Text style={styles.heading}>{slide.name}</Text>
                <Text style={styles.subheading}>{slide.info}</Text>
              </View>
            </View>
          ))}
        </PagerView>

        <View style={{marginHorizontal: 20}}>
          <View style={styles.indicatorContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentPage === index ? styles.activeIndicator : null,
                ]}
              />
            ))}
          </View>
          <AppButton
            onPress={handleNext}
            title={
              currentPage === slides.length - 1 ? `Get Started` : 'Continue'
            }
            style={styles.appButtonContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  onboardimage: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 31,
  },
  subheading: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.black,
    marginTop: 20,
    // textAlign: 'center',
    lineHeight: 28,
  },

  appButtonContainer: {
    marginHorizontal: 0,
    marginBottom: 35,
  },
  appButtonText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 30,
    backgroundColor: '#CFD1FF',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: colors.black,
    width: 18,
    height: 8,
    borderRadius: 30,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
    onboardInfo: state.onboardData,
  };
}

export default connect(mapStateToProps)(OnBoarding);
