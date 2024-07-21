import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
const windowWidth = Dimensions.get('window').width;

const Loader = props => {
  const {navigation} = props;
  return (
    <View style={styles.overlayView}>
      <ActivityIndicator
        style={{fontSize: 100}}
        size="large"
        color={colors.textColor}
      />
      <Text style={styles.textColor}>Please Wait...!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayView: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  textColor: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.black,
  },
});

function mapStateToProps(state) {
  return {
    userInfo: state.userData,
  };
}

export default connect(mapStateToProps)(Loader);
