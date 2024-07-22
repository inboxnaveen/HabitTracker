import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SubtaskModal from '../components/subtask';
import {connect} from 'react-redux';
import {colors} from '../utils';
import CheckBox from '@react-native-community/checkbox';
import AppButton from '../components/AppButton';

const HabitDetailScreen = ({navigation, route}) => {
  const {habit} = route.params;

  const [subtasks, setSubtasks] = useState(habit.subtasks);
  const [selectedSubtasks, setSelectedSubtasks] = useState([]);

  const handleAddSubtask = newSubtask => {
    setSubtasks([...subtasks, newSubtask]);
  };

  const toggleSelectSubtask = id => {
    setSelectedSubtasks(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(subtaskId => subtaskId !== id)
        : [...prevSelected, id],
    );
  };

  return (
    <View style={styles.container}>
      <Text>{habit.name}</Text>
      <FlatList
        data={subtasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              toggleSelectSubtask(item.id);
            }}
            style={styles.cardMain}>
            <View style={{flex: 1}}>
              <Text style={styles.cardHeading}>{item.name}</Text>

              <Text style={styles.headingText}>
                {item.userTime || `${item.minTime} - ${item.maxTime}`}
              </Text>
            </View>
            <CheckBox
              value={selectedSubtasks.includes(item.id)}
              onValueChange={() => toggleSelectSubtask(item.id)}
              tintColors={{true: '#5F6CE2', false: '#888A9D'}}
            />
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <AppButton
          style={{width: '45%', marginHorizontal: 0}}
          title="Save"
          onPress={() => {
            navigation.navigate('BottomTab');
          }}
        />
        <AppButton
          style={{width: '45%', marginHorizontal: 0}}
          title="Add Task"
          onPress={() => {
            navigation.navigate('CreateTask');
          }}
        />
      </View>
     
    </View>
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
  headingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: colors.black,
    lineHeight: 18,
  },
  cardMain: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: colors.dustyGrey,
    marginBottom: 16,
    marginHorizontal: 24,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    lineHeight: 20,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(HabitDetailScreen);
