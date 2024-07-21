import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import AppContainer from './src/navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {configStore} from './src/reduxManager';

function App() {
  const {store, persistor} = configStore();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <AppContainer />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#1E1E1E',
    fontSize: 30,
    textTransform: 'uppercase',
  },
});

export default App;
