import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import UserReducer from './User/UserReducer';
import onboardReducer from './Onboarding/OnboardingReducer';


const reducers = combineReducers({
  userData: UserReducer,
  onboardData: onboardReducer,

});

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
};

const appReducer = persistReducer(persistConfig, reducers);

export default appReducer;
