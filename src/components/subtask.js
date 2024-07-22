import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {colors} from '../utils';
import AppButton from './AppButton';

const SubtaskModal = ({visible, onClose, onSave}) => {
  const [subtask, setSubtask] = useState({
    name: '',
    minTime: '',
    maxTime: '',
    userTime: '',
  });

  const handleSave = () => {
    onSave(subtask);
    onClose();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modalBg}>
          <View style={styles.modalViewBg}>
            <View style={styles.modalHeaderView}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={onClose}
                activeOpacity={0.8}>
                <Ionicons name="close" size={25} color={colors.Grey} />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>Add Subtask</Text>
            </View>
            <TextInput
              style={[styles.input]}
              placeholder="Name"
              placeholderTextColor={colors.Grey}
              value={subtask.name}
              onChangeText={text => setSubtask({...subtask, name: text})}
              cursorColor={colors.black}
              caretHidden={false}
              mode="outlined"
              activeOutlineColor={colors.secondaryColor}
              outlineColor={colors.Grey}
              outlineStyle={{borderRadius: 12, borderWidth: 1}}
            />
            <TextInput
              style={[styles.input]}
              placeholder="Min Time"
              placeholderTextColor={colors.Grey}
              value={subtask.minTime}
              onChangeText={text => setSubtask({...subtask, minTime: text})}
              cursorColor={colors.black}
              caretHidden={false}
              mode="outlined"
              activeOutlineColor={colors.secondaryColor}
              outlineColor={colors.Grey}
              outlineStyle={{borderRadius: 12, borderWidth: 1}}
            />
            <TextInput
              style={[styles.input]}
              placeholder="Max Time"
              placeholderTextColor={colors.Grey}
              value={subtask.maxTime}
              onChangeText={text => setSubtask({...subtask, maxTime: text})}
              cursorColor={colors.black}
              caretHidden={false}
              mode="outlined"
              activeOutlineColor={colors.secondaryColor}
              outlineColor={colors.Grey}
              outlineStyle={{borderRadius: 12, borderWidth: 1}}
            />

            <AppButton title="Save" onPress={handleSave} />
          </View>
        </View>
      </Modal>
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

  placeholderstyle: {
    color: colors.Grey,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
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

export default SubtaskModal;
