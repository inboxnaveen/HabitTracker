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
  Dimensions,
} from 'react-native';
import colors from '../../utils/colors';
import {UserAction} from '../../reduxManager/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../../utils/Api';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import Loader from '../../components/Loader/Loader';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Progress = props => {
  const {navigation} = props;

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
    return focusHandler;
  }, []);

  const [showLoader, setLoader] = useState(false);

  const bardata = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [90, 80, 70, 100, 30, 75, 95], // Example data (you can replace this with your actual data)
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FAFAFA',
    backgroundGradientTo: '#FAFAFA',
    propsForLabels: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      color: '#111111',
    },
    labelColor: (opacity = 1) => `rgba(17, 17, 17, ${opacity})`,
    color: (opacity = 1) => `rgba(95, 108, 226, ${opacity})`,
    strokeWidth: 2,
    barRadius: 8,
    decimalPlaces: 0,
    barPercentage: 0.8,
    style: {
      borderRadius: 16,
    },
  };

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#f9f9f9f'}}>
      <ScrollView nestedScrollEnabled style={styles.container}>
        <View style={styles.cardView}>
          <View>
            <Text style={styles.barsubhead}>This Week</Text>
            <Text style={styles.barhead}>Jul 21 - Jul 27</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{marginRight: 10}} activeOpacity={0.8}>
              <Icon
                name="chevron-back"
                size={30}
                color={colors.secondaryColor}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon name="chevron-forward" size={30} color={colors.Grey} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginBottom: 25,
            borderRadius: 16,
            marginHorizontal: 20,
            padding: 16,
            backgroundColor: '#FAFAFA',
            // borderColor: '#05030D1A',
            // borderWidth: 1,
          }}>
          <View style={styles.fieldscontainer}>
            <Text style={styles.barhead}>Total Activities</Text>

            <Text style={styles.barsubhead}>85%</Text>
          </View>
          <BarChart
            data={bardata}
            style={{
              marginVertical: 10,
              borderRadius: 16,
              paddingRight: 0,
            }}
            width={Dimensions.get('window').width * 0.8} // Adjust the width of the BarChart
            height={200}
            fromZero={true}
            chartConfig={chartConfig}
            showBarTops={false} // Hide the top of the bars
            withHorizontalLabels={false} // Hide x-axis labels
          />
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",gap:10,marginHorizontal:20,}}>
          <View style={styles.subCardView}>
            <Text style={styles.subcardhead}>5</Text>
            <Text style={styles.subcardTxt}>Best streak days</Text>
          </View>
          <View style={styles.subCardView}>
            <Text style={styles.subcardhead}>15</Text>
            <Text style={styles.subcardTxt}>Habits done</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#f9f9f9f'}}>
        <ScrollView nestedScrollEnabled style={styles.container}>
        <View style={styles.cardView}>
          <View>
            <Text style={styles.barsubhead}>This Month</Text>
            <Text style={styles.barhead}>Jul 1 - Jul 31</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{marginRight: 10}} activeOpacity={0.8}>
              <Icon
                name="chevron-back"
                size={30}
                color={colors.secondaryColor}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon name="chevron-forward" size={30} color={colors.Grey} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginBottom: 25,
            borderRadius: 16,
            marginHorizontal: 20,
            padding: 16,
            backgroundColor: '#FAFAFA',
            // borderColor: '#05030D1A',
            // borderWidth: 1,
          }}>
          <View style={styles.fieldscontainer}>
            <Text style={styles.barhead}>Total Activities</Text>

            <Text style={styles.barsubhead}>82%</Text>
          </View>
          <BarChart
            data={bardata}
            style={{
              marginVertical: 10,
              borderRadius: 16,
              paddingRight: 0,
            }}
            width={Dimensions.get('window').width * 0.8} // Adjust the width of the BarChart
            height={200}
            fromZero={true}
            chartConfig={chartConfig}
            showBarTops={false} // Hide the top of the bars
            withHorizontalLabels={false} // Hide x-axis labels
          />
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",gap:10,marginHorizontal:20,}}>
          <View style={styles.subCardView}>
            <Text style={styles.subcardhead}>10</Text>
            <Text style={styles.subcardTxt}>Best streak days</Text>
          </View>
          <View style={styles.subCardView}>
            <Text style={styles.subcardhead}>20</Text>
            <Text style={styles.subcardTxt}>Habits done</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: '#f9f9f9f'}}>
       <ScrollView nestedScrollEnabled style={styles.container}>
        <View style={styles.cardView}>
          <View>
            <Text style={styles.barsubhead}>This Year</Text>
            <Text style={styles.barhead}>Jan 1 - Dec 31</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{marginRight: 10}} activeOpacity={0.8}>
              <Icon
                name="chevron-back"
                size={30}
                color={colors.secondaryColor}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Icon name="chevron-forward" size={30} color={colors.Grey} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginBottom: 25,
            borderRadius: 16,
            marginHorizontal: 20,
            padding: 16,
            backgroundColor: '#FAFAFA',
            // borderColor: '#05030D1A',
            // borderWidth: 1,
          }}>
          <View style={styles.fieldscontainer}>
            <Text style={styles.barhead}>Total Activities</Text>

            <Text style={styles.barsubhead}>80%</Text>
          </View>
          <BarChart
            data={bardata}
            style={{
              marginVertical: 10,
              borderRadius: 16,
              paddingRight: 0,
            }}
            width={Dimensions.get('window').width * 0.8} // Adjust the width of the BarChart
            height={200}
            fromZero={true}
            chartConfig={chartConfig}
            showBarTops={false} // Hide the top of the bars
            withHorizontalLabels={false} // Hide x-axis labels
          />
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",gap:10,marginHorizontal:20,}}>
          <View style={styles.subCardView}>
            <Text style={styles.subcardhead}>29</Text>
            <Text style={styles.subcardTxt}>Best streak days</Text>
          </View>
          <View style={styles.subCardView}>
            <Text style={styles.subcardhead}>120</Text>
            <Text style={styles.subcardTxt}>Habits done</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  // Rendering tab bar styles
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        pressColor={'transparent'}
        indicatorStyle={{opacity: 0, elevation: 0}}
        activeColor={colors.activeTabColor}
        inactiveColor={colors.black}
        style={{
          backgroundColor: '#EBEBEB',
          borderRadius: 12,
          marginHorizontal: 20,
          elevation: 0,
          marginVertical: 24,
          padding: 8,
          overflow: 'scroll',
        }}
        tabStyle={{
          borderRadius: 12,
          backgroundColor: '#EBEBEB',
          padding: 0,
          margin: 0,
          width: 92,
        }}
        gap={12}
        labelStyle={{
          textTransform: 'none',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 12,
          color: colors.textColor,
        }}
        scrollEnabled={true}
        renderLabel={({route, focused, color}) => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused ? '#5F6CE2' : '#EBEBEB',
              borderRadius: 12,
              width: 92,
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Medium',
                fontSize: 14,
                alignSelf: 'center',
                color: focused ? '#FFFFFF' : '#111111',
              }}>
              {route.title}
            </Text>
          </View>
        )}
      />
    );
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Weekly'},
    {key: 'second', title: 'Monthly'},
    {key: 'third', title: 'Yearly'},
  ]);

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
        <View style={styles.container}>
          <TabView
            navigationState={{index, routes}}
            renderScene={({route}) => {
              switch (route.key) {
                case 'first':
                  return FirstRoute();
                case 'second':
                  return SecondRoute();
                case 'third':
                  return ThirdRoute();
                default:
                  return null;
              }
            }}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
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
  cardView: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barhead: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
  barsubhead: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
  },
  subCardView: {
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor:"#5F6CE21A",
    borderRadius:12,
    flex:1,
  },
  subcardhead: {
    fontSize: 25,
    fontFamily: 'Poppins-Medium',
    color: colors.black,
  },
  subcardTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(Progress);
